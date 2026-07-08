import { useState, useEffect } from 'react';

/**
 * Custom hook for managing portal authentication state and protected actions
 * Handles password verification, session storage, and access control
 */
export const useAuthPortal = (correctPassword) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  // Hydrate lock state from browser session on mount
  useEffect(() => {
    try {
      const sessionAuth = sessionStorage.getItem('undone_portal_unlocked');
      if (sessionAuth === 'true') {
        setIsUnlocked(true);
      }
    } catch (err) {
      console.error('[AuthPortal] Session storage read failed:', err);
      // Fail-closed: if session storage is unavailable, stay locked
      setIsUnlocked(false);
    }
  }, []);

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
      setPasswordError(false);
      setInputPassword('');
    }
  };

  /**
   * Verify entered password against the correct password (pre-decoded)
   * Defensive: fails-closed on any error
   */
  const handlePasswordSubmit = (e) => {
    e?.preventDefault?.();
    try {
      // Strict validation: ensure inputs are non-empty strings
      if (typeof inputPassword !== 'string' || !inputPassword.trim()) {
        setPasswordError(true);
        return;
      }

      if (typeof correctPassword !== 'string' || !correctPassword) {
        setPasswordError(true);
        return;
      }

      // Constant-time comparison would be ideal, but for client-side purposes, strict equality is sufficient
      if (inputPassword === correctPassword) {
        setIsUnlocked(true);
        try {
          sessionStorage.setItem('undone_portal_unlocked', 'true');
        } catch (storageErr) {
          console.warn('[AuthPortal] Session storage write failed:', storageErr);
          // Continue anyway; unlock state stays in memory
        }
        setShowPasswordModal(false);
        setPasswordError(false);

        // Execute the pending action if one exists
        if (pendingAction?.executeAction) {
          pendingAction.executeAction();
        }

        setPendingAction(null);
      } else {
        setPasswordError(true);
      }
    } catch (err) {
      console.error('[AuthPortal] Password verification error:', err);
      setPasswordError(true);
    }
  };

  /**
   * Close password modal and discard pending action
   */
  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
    setPendingAction(null);
    setInputPassword('');
    setPasswordError(false);
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
