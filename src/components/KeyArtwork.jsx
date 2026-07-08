import React from 'react';

/**
 * KeyArtwork Component
 * Displays the cinematic key art poster card with gradient overlays
 */
export const KeyArtwork = () => {
  return (
    <div className="w-full relative rounded-2xl border border-neutral-900 bg-neutral-950 overflow-hidden shadow-2xl group aspect-[16/10] md:aspect-[21/10] transition-all duration-500 hover:border-neutral-800">
      {/* Key Art Background Image */}
      <img
        src="/key_artwork.jpg"
        alt="UNDONE Official Key Art"
        className="absolute inset-0 w-full h-full object-cover object-center select-none group-hover:scale-[1.01] transition-transform duration-700 ease-out"
      />
      {/* Subtle overlay gradients over key art for design uniformity and high typography legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/40 to-transparent z-10" />
      <div className="absolute inset-0 bg-noise opacity-[0.06] mix-blend-overlay pointer-events-none" />

      {/* Ambient radial glows */}
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px]" />
      <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]" />
    </div>
  );
};
