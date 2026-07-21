import React, { useState } from 'react';

// Hooks
import { useAuthPortal } from './hooks/useAuthPortal';

// Constants
import { PORTAL_ASSETS, ASSET_ORDER } from './constants/contentConfig';

// Components
import { Header } from './components/Header';
import { KeyArtwork } from './components/KeyArtwork';
import { AssetCard } from './components/AssetCard';
import { Footer } from './components/Footer';
import { CopyrightFooter } from './components/CopyrightFooter';

// Modals
import { PasswordModal } from './components/modals/PasswordModal';
import { DocumentViewer } from './components/modals/DocumentViewer';
import { VideoPlayer } from './components/modals/VideoPlayer';

// Icon imports
import {
  FileText,
  BookOpen,
  Play,
  Film,
  Tv,
} from 'lucide-react';

/**
 * Safely map icon names to components
 */
const getIconComponent = (iconName) => {
  const iconMap = {
    FileText,
    BookOpen,
    Play,
    Film,
    Tv,
  };
  return iconMap[iconName] || FileText;
};

/**
 * App Component
 * Clean orchestrator entry point for the UNDONE screening portal
 * 
 * Responsibility:
 * - Manage modal view states (activeDocument, activeVideo)
 * - Route protected/public actions to auth hook
 * - Render modular components and modals
 * - Maintain single source of truth for portal state
 */
export default function App() {
  // Modal view states
  const [activeDocument, setActiveDocument] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  const authPortal = useAuthPortal();

  /**
   * Handle actions on protected (locked) assets
   * Routes through auth portal for verification
   */
  const handleProtectedAction = (type, target) => {
    if (type === 'document') {
      authPortal.handleProtectedAction(type, target, () => {
        setActiveDocument(target);
      });
    } else if (type === 'video') {
      authPortal.handleProtectedAction(type, target, () => {
        setActiveVideo(target);
      });
    }
  };

  /**
   * Handle actions on public (unlocked) assets
   * Execute immediately without verification
   */
  const handlePublicAction = (type, target) => {
    if (type === 'document') {
      setActiveDocument(target);
    } else if (type === 'video') {
      setActiveVideo(target);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-amber-500 selection:text-black flex flex-col justify-between relative animate-fade-in">
      {/* Background radial soft light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Main Content Container */}
      <main className="max-w-2xl w-full mx-auto px-6 py-16 md:py-24 space-y-8">
        {/* Header */}
        <Header />

        {/* Key Artwork */}
        <KeyArtwork />

        {/* Asset Cards - Portal Link Tree */}
        <div className="space-y-3 pt-4">
          {ASSET_ORDER.map((assetId) => {
            const assetData = PORTAL_ASSETS[assetId];
            const Icon = getIconComponent(assetData.icon);

            if (!assetData) return null;

            return (
              <AssetCard
                key={assetId}
                assetId={assetId}
                assetData={assetData}
                isUnlocked={authPortal.isUnlocked}
                onClick={() => {
                  if (assetData.isLocked) {
                    handleProtectedAction(assetData.type, assetId);
                  } else {
                    handlePublicAction(assetData.type, assetId);
                  }
                }}
                icon={Icon}
              />
            );
          })}
        </div>

        {/* Footer */}
        <Footer
          isUnlocked={authPortal.isUnlocked}
          onRelock={authPortal.lockPortal}
        />
      </main>

      {/* Copyright Footer */}
      <CopyrightFooter />

      {/* PASSWORD GATE MODAL */}
      <PasswordModal
        isVisible={authPortal.showPasswordModal}
        inputPassword={authPortal.inputPassword}
        passwordError={authPortal.passwordError}
        onPasswordChange={authPortal.setInputPassword}
        onSubmit={authPortal.handlePasswordSubmit}
        onClose={authPortal.handleClosePasswordModal}
      />

      {/* DOCUMENT VIEWER MODAL */}
      <DocumentViewer
        activeDocument={activeDocument}
        onClose={() => setActiveDocument(null)}
      />

      {/* VIDEO PLAYER MODAL */}
      <VideoPlayer
        activeVideo={activeVideo}
        onClose={() => setActiveVideo(null)}
      />
    </div>
  );
}
