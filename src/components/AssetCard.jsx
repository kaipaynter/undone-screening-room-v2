import React from 'react';
import { Lock, Unlock, ExternalLink, Play } from 'lucide-react';

/**
 * Map icon names to lucide-react components
 */
const ICON_MAP = {
  FileText: () => <i className="lucide lucide-file-text" />,
  BookOpen: () => <i className="lucide lucide-book-open" />,
  Play: () => <Play size={20} />,
  Film: () => <i className="lucide lucide-film" />,
  Tv: () => <i className="lucide lucide-tv" />,
};

/**
 * AssetCard Component
 * Represents a single portal asset (document or video) with lock state
 */
export const AssetCard = ({
  assetId,
  assetData,
  isUnlocked,
  onClick,
  icon: Icon,
}) => {
  const showPlayIcon = assetData.type === 'video';
  const showExternalLinkIcon = assetData.type === 'document';

  return (
    <button
      onClick={onClick}
      className="w-full p-5 rounded-xl bg-neutral-900/40 border border-neutral-900 hover:border-amber-500/30 hover:bg-neutral-900/80 transition-all flex items-center justify-between group relative overflow-hidden"
    >
      <div className="flex items-center space-x-4">
        <div className="p-3 rounded-lg bg-neutral-950 text-amber-400 group-hover:scale-105 transition-transform">
          {Icon && <Icon size={20} />}
        </div>
        <div className="text-left">
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-white text-sm tracking-tight uppercase">
              {assetData.title}
            </h3>
            {assetData.isLocked ? (
              isUnlocked ? (
                <Unlock size={12} className="text-emerald-500" />
              ) : (
                <Lock size={12} className="text-amber-400/80" />
              )
            ) : (
              <span className="text-[9px] font-mono bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded uppercase tracking-wider">
                {assetData.accessLabel || 'Public'}
              </span>
            )}
          </div>
          <p className="text-neutral-500 text-xs">{assetData.description}</p>
        </div>
      </div>
      {showPlayIcon && (
        <Play
          size={14}
          fill="currentColor"
          className="text-neutral-600 group-hover:text-amber-400 transition-colors"
        />
      )}
      {showExternalLinkIcon && (
        <ExternalLink
          size={14}
          className="text-neutral-600 group-hover:text-amber-400 transition-colors"
        />
      )}
    </button>
  );
};
