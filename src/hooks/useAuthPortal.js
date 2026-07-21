import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

/**
 * Custom hook for managing portal authentication state and protected actions
 * Handles passcode verification via Supabase RPC, session storage, and access control
 */
export const useAuthPortal = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState(null);
  const [lockoutSecondsRemaining, setLockoutSecondsRemaining] = useState(0);
  const [pendingAction, setPendingAction] = useState(null);

  const MAX_FAILED_ATTEMPTS = 5;
  const LOCKOUT_DURATION_MS = 30_000;

  // Hydrate lock state from browser session on mount
  useEffect(() => {
    try {
      const sessionAuth = sessionStorage.getItem('undone_portal_unlocked');
      if (sessionAuth === 'true') {
        setIsUnlocked(true);
      }

      const storedFailedAttempts = Number(
        sessionStorage.getItem('undone_portal_failed_attempts') || '0'
      );
      setFailedAttempts(storedFailedAttempts);

      const storedLockoutUntil = Number(
        sessionStorage.getItem('undone_portal_lockout_until') || '0'
      );
      if (storedLockoutUntil && storedLockoutUntil > Date.now()) {
        setLockoutUntil(storedLockoutUntil);
        setLockoutSecondsRemaining(
          Math.ceil((storedLockoutUntil - Date.now()) / 1000)
        );
      }
    } catch (err) {
      console.error('[AuthPortal] Session storage read failed:', err);
      // Fail-closed: if session storage is unavailable, stay locked
      setIsUnlocked(false);
    }
  }, []);

  useEffect(() => {
    if (!lockoutUntil || lockoutUntil <= Date.now()) {
      return undefined;
    }

    const interval = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.ceil((lockoutUntil - Date.now()) / 1000)
      );
      setLockoutSecondsRemaining(remaining);

      if (remaining <= 0) {
        setLockoutUntil(null);
        setFailedAttempts(0);
        try {
          sessionStorage.removeItem('undone_portal_lockout_until');
          sessionStorage.removeItem('undone_portal_failed_attempts');
        } catch (storageErr) {
          console.warn('[AuthPortal] Failed to clear lockout state:', storageErr);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lockoutUntil]);

  /**
   * Intercept protected actions and route through authentication gate if needed
   * @param {string} type - Action type: 'document' | 'video'
   * @param {string} target - The specific resource identifier
   * @param {Function} executeAction - Callback to execute after auth verification
   */
  const handleProtectedAction = (type, target, executeAction) => {
    if (isUnlocked) {
      // Execute action immediately if already unlocked
      executeAction();
    } else {
      // Save the action and prompt for password
      setPendingAction({ type, target, executeAction });
      setShowPasswordModal(true);
      setPasswordError('');
      setInputPassword('');
    }
  };

  const persistFailedAttempts = (count) => {
    setFailedAttempts(count);
    try {
      sessionStorage.setItem('undone_portal_failed_attempts', String(count));
    } catch (storageErr) {
      console.warn('[AuthPortal] Failed to persist failed attempts:', storageErr);
    }
  };

  const activateLockout = () => {
    const nextLockoutUntil = Date.now() + LOCKOUT_DURATION_MS;
    setLockoutUntil(nextLockoutUntil);
    setLockoutSecondsRemaining(Math.ceil(LOCKOUT_DURATION_MS / 1000));

    try {
      sessionStorage.setItem('undone_portal_lockout_until', String(nextLockoutUntil));
      sessionStorage.setItem('undone_portal_failed_attempts', String(MAX_FAILED_ATTEMPTS));
    } catch (storageErr) {
      console.warn('[AuthPortal] Failed to persist lockout state:', storageErr);
    }

    setPasswordError(
      `Too many failed attempts. Try again in ${Math.ceil(
        LOCKOUT_DURATION_MS / 1000,
      )} seconds.`
    );
  };

  /**
   * Verify entered passcode against Supabase RPC.
   * Defensive: fails-closed on any error.
   */
  const handlePasswordSubmit = async (e) => {
    e?.preventDefault?.();

    if (lockoutUntil && Date.now() < lockoutUntil) {
      setPasswordError(
        `Too many failed attempts. Try again in ${Math.ceil(
          (lockoutUntil - Date.now()) / 1000,
        )} seconds.`,
      );
      return;
    }

    if (typeof inputPassword !== 'string' || !inputPassword.trim()) {
      setPasswordError('Please enter the shared passcode.');
      return;
    }

    const passcode = inputPassword.trim();

    try {
      const { data, error } = await supabase.rpc('verify_passcode', {
        passcode_input: passcode,
      });

      if (error) {
        console.error('[AuthPortal] Supabase passcode verification error:', error);
        const nextFailedAttempts = failedAttempts + 1;

        if (nextFailedAttempts >= MAX_FAILED_ATTEMPTS) {
          activateLockout();
        } else {
          persistFailedAttempts(nextFailedAttempts);
          setPasswordError(
            `Invalid passcode. ${MAX_FAILED_ATTEMPTS - nextFailedAttempts} attempts remaining.`,
          );
        }

        return;
      }

      const isValid = Array.isArray(data)
        ? Boolean(data?.[0]?.is_valid)
        : Boolean(data?.is_valid);

      if (isValid) {
        setIsUnlocked(true);
        try {
          sessionStorage.setItem('undone_portal_unlocked', 'true');
        } catch (storageErr) {
          console.warn('[AuthPortal] Session storage write failed:', storageErr);
        }

        try {
          sessionStorage.removeItem('undone_portal_failed_attempts');
          sessionStorage.removeItem('undone_portal_lockout_until');
        } catch (storageErr) {
          console.warn('[AuthPortal] Failed to clear auth state:', storageErr);
        }

        setFailedAttempts(0);
        setLockoutUntil(null);
        setLockoutSecondsRemaining(0);
        setShowPasswordModal(false);
        setPasswordError('');

        if (pendingAction?.executeAction) {
          pendingAction.executeAction();
        }

        setPendingAction(null);
      } else {
        const nextFailedAttempts = failedAttempts + 1;

        if (nextFailedAttempts >= MAX_FAILED_ATTEMPTS) {
          activateLockout();
        } else {
          persistFailedAttempts(nextFailedAttempts);
          setPasswordError(
            `Invalid passcode. ${MAX_FAILED_ATTEMPTS - nextFailedAttempts} attempts remaining.`,
          );
        }
      }
    } catch (err) {
      console.error('[AuthPortal] Password verification error:', err);
      setPasswordError('Passcode verification failed. Please try again later.');
    }
  };

  /**
   * Close password modal and discard pending action
   */
  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
    setPendingAction(null);
    setInputPassword('');
    setPasswordError('');
  };

  /**
   * Unlock the portal (no password required, for dev/explicit unlock only)
   */
  const unlockPortal = () => {
    try {
      setIsUnlocked(true);
      sessionStorage.setItem('undone_portal_unlocked', 'true');
    } catch (err) {
      console.warn('[AuthPortal] Failed to unlock and persist:', err);
    }
  };

  /**
   * Lock the portal and clear session storage
   */
  const lockPortal = () => {
    try {
      setIsUnlocked(false);
      sessionStorage.removeItem('undone_portal_unlocked');
    } catch (err) {
      console.warn('[AuthPortal] Failed to lock and clear session:', err);
    }
  };

  return {
    // State
    isUnlocked,
    showPasswordModal,
    inputPassword,
    passwordError,
    pendingAction,
    lockoutSecondsRemaining,

    // Setters for controlled inputs
    setInputPassword,

    // Handlers
    handleProtectedAction,
    handlePasswordSubmit,
    handleClosePasswordModal,
    unlockPortal,
    lockPortal,
  };
};
