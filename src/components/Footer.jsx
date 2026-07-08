import React from 'react';
import { Mail } from 'lucide-react';

/**
 * Footer Component
 * Contact information and session control
 */
export const Footer = ({ isUnlocked, onRelock }) => {
  return (
    <div className="pt-8 border-t border-neutral-900 text-center space-y-4">
      <p className="text-xs text-neutral-500">
        For options, packaging files, or distribution inquiry:
      </p>
      <a
        href="mailto:contact@beartigerproductions.com"
        className="inline-flex items-center space-x-1.5 text-xs text-amber-400 hover:underline hover:text-amber-300 transition-colors"
      >
        <Mail size={12} />
        <span>contact@beartigerproductions.com</span>
      </a>

      {isUnlocked && (
        <div className="pt-2">
          <button
            onClick={onRelock}
            className="text-[10px] uppercase font-mono tracking-wider text-neutral-600 hover:text-red-400 transition-colors underline"
          >
            Relock Staging Session
          </button>
        </div>
      )}
    </div>
  );
};
