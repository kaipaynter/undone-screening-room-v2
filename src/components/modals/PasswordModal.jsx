import React from 'react';
import { X, KeyRound, AlertCircle } from 'lucide-react';

/**
 * PasswordModal
 * Secure password verification gate for protected portal content
 */
export const PasswordModal = ({
  isVisible,
  inputPassword,
  passwordError,
  lockoutSecondsRemaining = 0,
  onPasswordChange,
  onSubmit,
  onClose,
}) => {
  if (!isVisible) return null;

  const isLockedOut = lockoutSecondsRemaining > 0;
  const submitLabel = isLockedOut
    ? `Locked for ${lockoutSecondsRemaining}s`
    : 'Verify Key';

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 p-6 md:p-8 rounded-2xl space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-neutral-500 hover:text-white hover:bg-neutral-850 transition-all"
        >
          <X size={16} />
        </button>

        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-amber-400/10 text-amber-400 mb-2">
            <KeyRound size={24} />
          </div>
          <h3 className="text-lg font-bold text-white uppercase tracking-wide">
            Executive Access Key Required
          </h3>
          <p className="text-xs text-neutral-400 max-w-xs mx-auto leading-relaxed">
            You are trying to access a secure asset. Please enter the
            shared passcode to verify credentials.
          </p>
          <p className="text-[10px] text-amber-300/80 max-w-xs mx-auto leading-relaxed tracking-wide uppercase">
            Passcode verification is performed securely.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1">
            <input
              type="password"
              required
              disabled={isLockedOut}
              placeholder="Enter Passcode"
              value={inputPassword}
              onChange={(e) => {
                onPasswordChange(e.target.value);
              }}
              className="w-full bg-neutral-950 px-4 py-3 rounded-xl border border-neutral-800 text-sm focus:outline-none focus:border-amber-400/40 text-center tracking-widest font-mono text-white placeholder:tracking-normal placeholder:font-sans disabled:cursor-not-allowed disabled:opacity-50"
              autoFocus
            />
          </div>

          {passwordError && (
            <div className="flex items-center space-x-2 text-xs text-red-400 bg-red-500/10 p-2.5 rounded-lg border border-red-500/20">
              <AlertCircle size={14} />
              <span>{passwordError}</span>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-neutral-800 hover:bg-neutral-750 text-neutral-400 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLockedOut}
              className="flex-1 py-2.5 bg-amber-400 hover:bg-amber-300 text-black rounded-xl text-xs font-bold uppercase tracking-wider transition-all disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
