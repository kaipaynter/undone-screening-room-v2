import React from 'react';
import { X } from 'lucide-react';
import { getVideoSource } from '../../constants/contentConfig';

/**
 * VideoPlayer Modal
 * Displays video content with secure playback controls
 * Handles both HTML5 video and Google Drive iframes
 */
export const VideoPlayer = ({ activeVideo, onClose }) => {
  if (!activeVideo) return null;

  const getVideoLabel = (videoKey) => {
    const labels = {
      teaser: 'Teaser Trailer Preview',
      bts: 'Behind-The-Scenes Cut',
      ep1: 'Episode 1A \'The Party\' Stakeholder Review',
      ep1b: 'Episode 1B \'The Party\' Festival Cut',
    };
    return labels[videoKey] || 'Video Preview';
  };

  const videoSource = getVideoSource(activeVideo);

  // Helper: convert common watch/short youtube links into an embed URL
  const normalizeYouTubeEmbed = (src) => {
    if (!src || typeof src !== 'string') return null;
    try {
      const url = new URL(src);
      const host = url.host.toLowerCase();
      // youtu.be short link
      if (host.includes('youtu.be')) {
        const id = url.pathname.replace(/^\//, '').split('/')[0];
        if (id) return { embed: `https://www.youtube.com/embed/${id}${url.search || ''}`, watch: `https://www.youtube.com/watch?v=${id}${url.search || ''}` };
      }
      // youtube.com watch or embed
      if (host.includes('youtube.com')) {
        // If it's already an embed URL, use it
        if (url.pathname.includes('/embed/')) return { embed: src, watch: `https://www.youtube.com/watch?v=${(url.pathname.split('/embed/')[1] || '').split('?')[0]}` };
        const v = url.searchParams.get('v');
        if (v) return { embed: `https://www.youtube.com/embed/${v}${url.search || ''}`, watch: `https://www.youtube.com/watch?v=${v}${url.search || ''}` };
      }
    } catch (e) {
      return null;
    }
    return null;
  };

  const yt = normalizeYouTubeEmbed(videoSource);

  // Determine whether to render an iframe (for YouTube, GDrive, Vimeo, etc.)
  const isIframeVideo = (() => {
    if (!videoSource || typeof videoSource !== 'string') return false;
    try {
      const url = new URL(videoSource);
      const host = url.host.toLowerCase();
      if (host.includes('youtube.com') || host.includes('youtu.be') || host.includes('drive.google.com') || host.includes('vimeo.com')) return true;
    } catch (e) {
      // Not a valid absolute URL — fallthrough to extension check
    }
    return !/\.(mp4|webm|ogg)$/i.test(videoSource);
  })();

  const isDrive = videoSource && videoSource.includes('drive.google.com');
  const embedSrc = yt?.embed || videoSource;
  const externalWatchUrl = yt?.watch || videoSource;

  return (
    <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
      <div className="max-w-3xl w-full space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-amber-400 font-bold uppercase">
            {getVideoLabel(activeVideo)}
          </span>
          <button
            onClick={onClose}
            className="flex items-center space-x-1 px-3 py-1 bg-neutral-900 hover:bg-neutral-850 text-xs text-neutral-400 rounded-full border border-neutral-800 transition-colors"
          >
            <X size={12} />
            <span>Close screener</span>
          </button>
        </div>

        {/* Secure Player Frame with dynamic direct media streaming */}
        <div className="secure-video-wrapper relative aspect-video bg-neutral-950 rounded-xl border border-neutral-800 overflow-hidden flex flex-col justify-center items-center shadow-2xl select-none">
          {isIframeVideo ? (
            <div className="w-full h-full relative">
              {/* Embedded Iframe for YouTube/GDrive/Vimeo or other embedable sources */}
                <iframe
                  src={embedSrc}
                  className="w-full h-full border-0 rounded-xl"
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                  title="Video player"
                />
                {/* Fallback button to open the source externally (useful if embedding is blocked) */}
                {externalWatchUrl && (
                  <div className="absolute left-4 bottom-4 z-30">
                    <button
                      onClick={() => window.open(externalWatchUrl, '_blank', 'noopener')}
                      className="px-3 py-1 text-xs rounded-full bg-amber-500 text-black font-semibold"
                    >
                      Open on YouTube
                    </button>
                  </div>
                )}
              {/* Invisible Shield Layer placed to mask GDrive default download actions when applicable */}
              {isDrive && (
                <div
                  className="absolute top-0 right-0 w-32 h-14 bg-transparent pointer-events-auto z-30 cursor-not-allowed"
                  title="Actions restricted on screener copy"
                />
              )}
            </div>
          ) : (
            <video
              key={activeVideo}
              src={videoSource}
              controls
              autoPlay
              controlsList="nodownload noremoteplayback"
              disablePictureInPicture
              onContextMenu={(e) => e.preventDefault()}
              className="w-full h-full object-contain"
              title="Video player"
            />
          )}

          {/* Floating watermark */}
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 text-neutral-500/20 font-mono text-[9px] sm:text-xs z-10">
            <div className="flex justify-between">
              <span>PREVIEW SCREENS</span>
              <span>CONFIDENTIAL</span>
            </div>
            <div className="text-center uppercase font-bold tracking-[0.2em] transform rotate-[-8deg] text-amber-500/5">
              BEARTIGER PROPERTIES • CONFIDENTIAL PREVIEW ONLY
            </div>
            <div className="flex justify-between">
              <span>WGAW REGISTERED</span>
              <span>PREVIEW CUT</span>
            </div>
          </div>
        </div>

        <div className="text-center text-[10px] text-neutral-600 font-mono">
          PORTAL SOURCE SCREENS V.1 • PRESS ESC TO EXIT PREVIEW
        </div>
      </div>
    </div>
  );
};
