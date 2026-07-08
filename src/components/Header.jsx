import React from 'react';

/**
 * Header Component
 * Premium header branding for the portal
 */
export const Header = () => {
  return (
    <div className="text-center space-y-4">
      <div className="space-y-1">
        <span className="text-[10px] font-bold tracking-[0.4em] text-neutral-500 uppercase">
          Beartiger Productions Presents
        </span>
        <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-white leading-none">
          UN<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
            DONE
          </span>
        </h1>
        <p className="text-xs font-semibold tracking-[0.3em] text-amber-400 uppercase">
          A New Romantic Drama Series
        </p>
      </div>
    </div>
  );
};
