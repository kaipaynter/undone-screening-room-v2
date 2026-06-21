import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  BookOpen, 
  Play, 
  Film, 
  Tv, 
  X, 
  Mail, 
  ExternalLink,
  Lock,
  Unlock,
  KeyRound,
  Eye,
  AlertCircle
} from 'lucide-react';

export default function App() {
  // Modal view states for opening materials
  const [activeDocument, setActiveDocument] = useState(null); // 'script', 'deck', 'onesheet', 'bible', 'bio'
  const [activeVideo, setActiveVideo] = useState(null); // 'teaser', 'bts', 'ep1', 'ep1b'
  const [deckPage, setDeckPage] = useState(0);

  // Fallback states
  const [portraitError, setPortraitError] = useState(false);

  // Password Verification States
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  
  // Track what the user clicked before being prompted for a password
  const [pendingAction, setPendingAction] = useState(null); // { type: 'document'|'video', target: string }

  // BASE64 CONFIG PASSWORD:
  // "VU5ET05FMjAyNg==" decodes to "UNDONE2026"
  const ENCODED_PASS = "VU5ET05FMjAyNg==";

  // Hydrate lock state from browser session on mount
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('undone_portal_unlocked');
    if (sessionAuth === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  // Intercept actions on locked items
  const handleProtectedAction = (type, target) => {
    if (isUnlocked) {
      // Execute action immediately if already unlocked
      if (type === 'document') {
        setActiveDocument(target);
        if (target === 'deck') setDeckPage(0);
      } else if (type === 'video') {
        setActiveVideo(target);
      }
    } else {
      // Otherwise, save the action they wanted to perform and prompt for password
      setPendingAction({ type, target });
      setShowPasswordModal(true);
      setPasswordError(false);
      setInputPassword('');
    }
  };

  // Verify entered password against the hash
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    try {
      const decodedPassword = atob(ENCODED_PASS);
      if (inputPassword === decodedPassword) {
        setIsUnlocked(true);
        sessionStorage.setItem('undone_portal_unlocked', 'true');
        setShowPasswordModal(false);
        setPasswordError(false);

        // Execute the action they were trying to do
        if (pendingAction) {
          if (pendingAction.type === 'document') {
            setActiveDocument(pendingAction.target);
            if (pendingAction.target === 'deck') setDeckPage(0);
          } else if (pendingAction.type === 'video') {
            setActiveVideo(pendingAction.target);
          }
          setPendingAction(null);
        }
      } else {
        setPasswordError(true);
      }
    } catch (err) {
      setPasswordError(true);
    }
  };

  // Close password gate and cancel pending navigation
  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
    setPendingAction(null);
    setInputPassword('');
    setPasswordError(false);
  };

  // Pitch Deck slides for the interactive inline PDF viewer
  const pitchDeckSlides = [
    {
      title: "UNDONE",
      subtitle: "LOVE. LUST. LA.",
      content: "A premium comedy-drama series exploring modern relationships, identity, and the quiet spaces between belonging and detachment in Southern California.",
      meta: "Slide 1: Title & Concept"
    },
    {
      title: "Core Conflict",
      subtitle: "Where Worlds Collide",
      content: "When a guarded city girl from Chicago and an idealistic Southern country boy fall fast in Los Angeles, they are forced to confront inherited biases, family expectations, and trauma.",
      meta: "Slide 2: Dynamic"
    },
    {
      title: "Tone & Style",
      subtitle: "Raw & Intimate",
      content: "Contrasting sweeping, neon-drenched cinematography with hand-held close-ups. A sonic palette merging alternative R&B with rustic indie-folk music.",
      meta: "Slide 3: Aesthetic"
    },
    {
      title: "Production Strategy",
      subtitle: "High Value, Low Footprint",
      content: "Leveraging authentic, visually rich Los Angeles locations (Los Feliz, Franklin Village) to capture high-production value efficiently.",
      meta: "Slide 4: Logistical Blueprint"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-amber-500 selection:text-black flex flex-col justify-between relative">
      
      {/* Background radial soft light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Main Content Container */}
      <main className="max-w-2xl w-full mx-auto px-6 py-16 md:py-24 space-y-12">
        
        {/* Simplified Premium Header */}
        <div className="text-center space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold tracking-[0.4em] text-neutral-500 uppercase">
              Beartiger Productions Presents
            </span>
            <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-white leading-none">
              UN<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">DONE</span>
            </h1>
            <p className="text-xs font-semibold tracking-[0.3em] text-amber-400 uppercase">
              A New Comedy Drama Series
            </p>
          </div>

          {/* Minimal Key Art Graphic Placeholder */}
          <div className="flex justify-center py-4">
            <div className="w-16 h-16 rounded-full border border-neutral-800/80 bg-neutral-900/50 flex items-center justify-center relative overflow-hidden group">
              <svg viewBox="0 0 100 100" className="w-8 h-8 text-neutral-500 group-hover:text-amber-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="2">
                {/* Cloud silhouette */}
                <path d="M30,65 C25,65 20,60 20,55 C20,50 25,45 30,45 C32,35 42,30 50,35 C58,30 68,35 70,45 C75,45 80,50 80,55 C80,60 75,65 70,65 Z" fill="currentColor" fillOpacity="0.15" />
              </svg>
            </div>
          </div>
        </div>

        {/* Executive Direct Link Tree Stack */}
        <div className="space-y-3">
          
          {/* Link 1: Watch Teaser Trailer (PUBLIC) */}
          <button 
            onClick={() => setActiveVideo('teaser')}
            className="w-full p-5 rounded-xl bg-neutral-900/40 border border-neutral-900 hover:border-amber-500/30 hover:bg-neutral-900/80 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-neutral-950 text-amber-400 group-hover:scale-105 transition-transform">
                <Play size={20} />
              </div>
              <div className="text-left">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-white text-sm tracking-tight uppercase">Watch Teaser Trailer</h3>
                  <span className="text-[9px] font-mono bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded uppercase tracking-wider">{"Public Access"}</span>
                </div>
                <p className="text-neutral-500 text-xs">2:30 minute promotional trailer</p>
              </div>
            </div>
            <Play size={14} fill="currentColor" className="text-neutral-600 group-hover:text-amber-400 transition-colors" />
          </button>

          {/* Link 2: Watch BTS Trailer (PUBLIC) */}
          <button 
            onClick={() => setActiveVideo('bts')}
            className="w-full p-5 rounded-xl bg-neutral-900/40 border border-neutral-900 hover:border-amber-500/30 hover:bg-neutral-900/80 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-neutral-950 text-amber-400 group-hover:scale-105 transition-transform">
                <Film size={20} />
              </div>
              <div className="text-left">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-white text-sm tracking-tight uppercase">Watch BTS Trailer</h3>
                  <span className="text-[9px] font-mono bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded uppercase tracking-wider">{"Public Access"}</span>
                </div>
                <p className="text-neutral-500 text-xs">Interviews, concepts, and prep</p>
              </div>
            </div>
            <Play size={14} fill="currentColor" className="text-neutral-600 group-hover:text-amber-400 transition-colors" />
          </button>

          {/* Link 3: View Series Bible (LOCKED) */}
          <button 
            onClick={() => handleProtectedAction('document', 'bible')}
            className="w-full p-5 rounded-xl bg-neutral-900/40 border border-neutral-900 hover:border-amber-500/30 hover:bg-neutral-900/80 transition-all flex items-center justify-between group relative overflow-hidden"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-neutral-950 text-amber-400 group-hover:scale-105 transition-transform">
                <BookOpen size={20} />
              </div>
              <div className="text-left">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-white text-sm tracking-tight uppercase">View Series Bible</h3>
                  {isUnlocked ? (
                    <Unlock size={12} className="text-emerald-500" />
                  ) : (
                    <Lock size={12} className="text-amber-400/80" />
                  )}
                </div>
                <p className="text-neutral-500 text-xs">Multi-season design & episode summaries</p>
              </div>
            </div>
            <ExternalLink size={14} className="text-neutral-600 group-hover:text-amber-400 transition-colors" />
          </button>

          {/* Link 4: View One-sheet (LOCKED) */}
          <button 
            onClick={() => handleProtectedAction('document', 'onesheet')}
            className="w-full p-5 rounded-xl bg-neutral-900/40 border border-neutral-900 hover:border-amber-500/30 hover:bg-neutral-900/80 transition-all flex items-center justify-between group relative overflow-hidden"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-neutral-950 text-amber-400 group-hover:scale-105 transition-transform">
                <FileText size={20} />
              </div>
              <div className="text-left">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-white text-sm tracking-tight uppercase">View One-sheet</h3>
                  {isUnlocked ? (
                    <Unlock size={12} className="text-emerald-500" />
                  ) : (
                    <Lock size={12} className="text-amber-400/80" />
                  )}
                </div>
                <p className="text-neutral-500 text-xs">Logistical index & summary snapshot</p>
              </div>
            </div>
            <ExternalLink size={14} className="text-neutral-600 group-hover:text-amber-400 transition-colors" />
          </button>

          {/* Link 5: View Pitch Deck (LOCKED) */}
          <button 
            onClick={() => handleProtectedAction('document', 'deck')}
            className="w-full p-5 rounded-xl bg-neutral-900/40 border border-neutral-900 hover:border-amber-500/30 hover:bg-neutral-900/80 transition-all flex items-center justify-between group relative overflow-hidden"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-neutral-950 text-amber-400 group-hover:scale-105 transition-transform">
                <BookOpen size={20} />
              </div>
              <div className="text-left">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-white text-sm tracking-tight uppercase">View Pitch Deck</h3>
                  {isUnlocked ? (
                    <Unlock size={12} className="text-emerald-500" />
                  ) : (
                    <Lock size={12} className="text-amber-400/80" />
                  )}
                </div>
                <p className="text-neutral-500 text-xs">Aesthetic presentation & project overview</p>
              </div>
            </div>
            <ExternalLink size={14} className="text-neutral-600 group-hover:text-amber-400 transition-colors" />
          </button>

          {/* Link 6: Episode 1A "The Party" (LOCKED) */}
          <button 
            onClick={() => handleProtectedAction('video', 'ep1')}
            className="w-full p-5 rounded-xl bg-neutral-900/40 border border-neutral-900 hover:border-amber-500/30 hover:bg-neutral-900/80 transition-all flex items-center justify-between group relative overflow-hidden"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-neutral-950 text-amber-400 group-hover:scale-105 transition-transform">
                <Tv size={20} />
              </div>
              <div className="text-left">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-white text-sm tracking-tight uppercase">Episode 1A "The Party"</h3>
                  {isUnlocked ? (
                    <Unlock size={12} className="text-emerald-500" />
                  ) : (
                    <Lock size={12} className="text-amber-400/80" />
                  )}
                </div>
                <p className="text-neutral-500 text-xs">45 minute stakeholder review cut</p>
              </div>
            </div>
            <Play size={14} fill="currentColor" className="text-neutral-600 group-hover:text-amber-400 transition-colors" />
          </button>

          {/* Link 7: Episode 1B "The Party" (LOCKED) */}
          <button 
            onClick={() => handleProtectedAction('video', 'ep1b')}
            className="w-full p-5 rounded-xl bg-neutral-900/40 border border-neutral-900 hover:border-amber-500/30 hover:bg-neutral-900/80 transition-all flex items-center justify-between group relative overflow-hidden"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-neutral-950 text-amber-400 group-hover:scale-105 transition-transform">
                <Tv size={20} />
              </div>
              <div className="text-left">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-white text-sm tracking-tight uppercase">Episode 1B "The Party"</h3>
                  {isUnlocked ? (
                    <Unlock size={12} className="text-emerald-500" />
                  ) : (
                    <Lock size={12} className="text-amber-400/80" />
                  )}
                </div>
                <p className="text-neutral-500 text-xs">45 minute festival premier cut</p>
              </div>
            </div>
            <Play size={14} fill="currentColor" className="text-neutral-600 group-hover:text-amber-400 transition-colors" />
          </button>

          {/* Link 8: Read Pilot Script (LOCKED) */}
          <button 
            onClick={() => handleProtectedAction('document', 'script')}
            className="w-full p-5 rounded-xl bg-neutral-900/40 border border-neutral-900 hover:border-amber-500/30 hover:bg-neutral-900/80 transition-all flex items-center justify-between group relative overflow-hidden"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-neutral-950 text-amber-400 group-hover:scale-105 transition-transform">
                <FileText size={20} />
              </div>
              <div className="text-left">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-white text-sm tracking-tight uppercase">Read Pilot Script</h3>
                  {isUnlocked ? (
                    <Unlock size={12} className="text-emerald-500" />
                  ) : (
                    <Lock size={12} className="text-amber-400/80" />
                  )}
                </div>
                <p className="text-neutral-500 text-xs">Standard 60-page network outline</p>
              </div>
            </div>
            <ExternalLink size={14} className="text-neutral-600 group-hover:text-amber-400 transition-colors" />
          </button>

          {/* Link 9: Creator Biography (PUBLIC) */}
          <button 
            onClick={() => setActiveDocument('bio')}
            className="w-full p-5 rounded-xl bg-neutral-900/40 border border-neutral-900 hover:border-amber-500/30 hover:bg-neutral-900/80 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-neutral-950 text-amber-400 group-hover:scale-105 transition-transform">
                <FileText size={20} />
              </div>
              <div className="text-left">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-white text-sm tracking-tight uppercase">Creator Biography</h3>
                  <span className="text-[9px] font-mono bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded uppercase tracking-wider">{"Public Access"}</span>
                </div>
                <p className="text-neutral-500 text-xs">Professional background and credentials</p>
              </div>
            </div>
            <ExternalLink size={14} className="text-neutral-600 group-hover:text-amber-400 transition-colors" />
          </button>

        </div>

        {/* Minimal Footer Direct Contact Details */}
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
                onClick={() => {
                  setIsUnlocked(false);
                  sessionStorage.removeItem('undone_portal_unlocked');
                }}
                className="text-[10px] uppercase font-mono tracking-wider text-neutral-600 hover:text-red-400 transition-colors underline"
              >
                Relock Staging Session
              </button>
            </div>
          )}
        </div>

      </main>

      {/* Elegant minimal Copyright */}
      <footer className="py-6 text-center text-[10px] text-neutral-600 font-mono tracking-widest uppercase">
        © 2026 BEARTIGER PRODUCTIONS. All Rights Reserved.
      </footer>

      {/* --- PASSWORD GATE LIGHTBOX POPUP --- */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 p-6 md:p-8 rounded-2xl space-y-6 shadow-2xl relative">
            <button 
              onClick={handleClosePasswordModal}
              className="absolute top-4 right-4 p-1 rounded-full text-neutral-500 hover:text-white hover:bg-neutral-850 transition-all"
            >
              <X size={16} />
            </button>

            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-amber-400/10 text-amber-400 mb-2">
                <KeyRound size={24} />
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wide">Executive Access Key Required</h3>
              <p className="text-xs text-neutral-400 max-w-xs mx-auto leading-relaxed">
                You are trying to access a secure production asset. Please enter the shared passcode to verify development credentials.
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-1">
                <input 
                  type="password"
                  required
                  placeholder="Enter Passcode"
                  value={inputPassword}
                  onChange={(e) => {
                    setInputPassword(e.target.value);
                    setPasswordError(false);
                  }}
                  className="w-full bg-neutral-950 px-4 py-3 rounded-xl border border-neutral-800 text-sm focus:outline-none focus:border-amber-400/40 text-center tracking-widest font-mono text-white placeholder:tracking-normal placeholder:font-sans"
                  autoFocus
                />
              </div>

              {passwordError && (
                <div className="flex items-center space-x-2 text-xs text-red-400 bg-red-500/10 p-2.5 rounded-lg border border-red-500/20">
                  <AlertCircle size={14} />
                  <span>Invalid credentials. Check configuration parameters.</span>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button 
                  type="button"
                  onClick={handleClosePasswordModal}
                  className="flex-1 py-2.5 bg-neutral-800 hover:bg-neutral-750 text-neutral-400 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2.5 bg-amber-400 hover:bg-amber-300 text-black rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Verify Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- INLINE LIGHTBOX POPUPS FOR INSTANT REVIEWING --- */}
      {activeDocument && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md overflow-y-auto flex justify-center items-start p-4 md:p-6">
          <div className="max-w-4xl w-full my-6 space-y-4">
            
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase bg-neutral-900 px-3 py-1 text-amber-400 rounded-full border border-neutral-800">
                {activeDocument === 'script' && "SCREENPLAY PROOF"}
                {activeDocument === 'deck' && "INTERACTIVE DECK"}
                {activeDocument === 'bible' && "SERIES BIBLE EXTRACT"}
                {activeDocument === 'onesheet' && "EXECUTIVE SUMMARY"}
                {activeDocument === 'bio' && "CREATOR BIO DOCUMENT"}
              </span>
              <button 
                onClick={() => setActiveDocument(null)}
                className="flex items-center space-x-1 px-3 py-1 bg-neutral-900 hover:bg-neutral-850 text-xs text-neutral-400 rounded-full border border-neutral-800 transition-colors"
              >
                <X size={12} />
                <span>Close Material</span>
              </button>
            </div>

            {/* Document page markup container */}
            <div className="bg-white text-black p-8 md:p-12 rounded-xl relative shadow-2xl min-h-[500px] flex flex-col justify-between font-serif overflow-hidden select-text">
              
              <div className="space-y-6 max-w-3xl mx-auto text-neutral-950 font-mono text-xs md:text-sm w-full">
                
                {/* Script Viewer View */}
                {activeDocument === 'script' && (
                  <div className="space-y-6 max-w-xl mx-auto">
                    <div className="text-center py-6 space-y-2">
                      <h2 className="text-2xl font-bold tracking-widest uppercase font-mono">U N D O N E</h2>
                      <p className="text-[10px]">Written by Beartiger Creative Group</p>
                    </div>

                    <div className="space-y-4 font-mono text-xs leading-relaxed">
                      <p className="font-bold">FADE IN:</p>
                      
                      <div className="space-y-1">
                        <p className="font-bold">EXT. HOLLYWOOD HILLS - TWILIGHT</p>
                        <p className="text-neutral-800">The sky is a bruised plum color. Humid twilight clings to the hills under the Hollywood Sign. Neon gradients bleed softly into the cracked gray sidewalks.</p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-neutral-800">KEHLANI (27), sharp, wearing a paint-spattered vintage denim jacket, sits on the edge of an old brick planter. She focuses her camera.</p>
                      </div>

                      <div className="pl-24 pr-12 space-y-1">
                        <p className="font-bold">KEHLANI</p>
                        <p className="italic">(to herself)</p>
                        <p>Just stay still. Don't look like a tourist.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Pitch Deck Slides View */}
                {activeDocument === 'deck' && (
                  <div className="space-y-6 py-6 font-sans max-w-xl mx-auto">
                    <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-200 min-h-[220px] flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-amber-600 font-bold">
                          {pitchDeckSlides[deckPage].meta}
                        </span>
                        <h3 className="text-xl font-bold text-neutral-900 uppercase">
                          {pitchDeckSlides[deckPage].title}
                        </h3>
                        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">
                          {pitchDeckSlides[deckPage].subtitle}
                        </p>
                        <p className="text-sm text-neutral-700 leading-relaxed pt-2">
                          {pitchDeckSlides[deckPage].content}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-xs text-neutral-500">
                        Page {deckPage + 1} of {pitchDeckSlides.length}
                      </span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setDeckPage(prev => Math.max(0, prev - 1))}
                          className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-xs font-bold rounded"
                        >
                          Prev
                        </button>
                        <button 
                          onClick={() => setDeckPage(prev => Math.min(pitchDeckSlides.length - 1, prev + 1))}
                          className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-xs font-bold rounded"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Series Bible View */}
                {activeDocument === 'bible' && (
                  <div className="space-y-4 font-sans text-xs text-neutral-800 max-w-xl mx-auto">
                    <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-tight">SERIES LOGISTICAL BIBLE</h2>
                    <p className="leading-relaxed">
                      <strong>Format:</strong> 10-Episode Limited Comedy-Drama Series (45-Minute Chapters)
                    </p>
                    <p className="leading-relaxed">
                      <strong>Tone Focus:</strong> Intimacy, character-driven dialogues, and authentic comedic beats contrasting with social commentaries about class divides in the modern age.
                    </p>
                    <p className="leading-relaxed">
                      <strong>Setting:</strong> Set in highly textured neighborhood spaces around Los Angeles (Los Feliz, Franklin Village, Griffith Park) to capture authentic production values efficiently.
                    </p>
                  </div>
                )}

                {/* One Sheet View */}
                {activeDocument === 'onesheet' && (
                  <div className="space-y-4 font-sans text-xs text-neutral-800 max-w-xl mx-auto">
                    <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-tight">PROJECT ONE-SHEET</h2>
                    <p className="leading-relaxed">
                      <strong>Logistical Summary:</strong> UNDONE is a ready-to-package premier comedy-drama with complete pilot drafts, multi-season bible summaries, visual pitches, and estimated pilot budgeting breakdowns.
                    </p>
                    <p className="leading-relaxed">
                      <strong>Target Audience:</strong> Core demographic adults 18-34; ideal fit for high-concept premium streaming, cable network options, or independent distribution partnerships.
                    </p>
                  </div>
                )}

                {/* Creator Bio Document View (Kai Paynter Actual Text + Side Image Layout) */}
                {activeDocument === 'bio' && (
                  <div className="space-y-4 font-sans text-xs text-neutral-800">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-tight">THE CREATOR</h2>
                        <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest leading-none mt-1">
                          KAI PAYNTER
                        </h3>
                      </div>
                      <a 
                        href="/undone_creator_bio.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-850 text-white rounded text-[10px] font-mono transition-colors border border-neutral-800"
                      >
                        <FileText size={10} />
                        <span>Open Official PDF</span>
                      </a>
                    </div>
                    
                    <div className="h-[1px] w-full bg-neutral-200 my-2" />
                    
                    {/* Balanced Columns: Left is Portrait, Right is Biography Content */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-2">
                      
                      {/* Left Column: Portrait */}
                      <div className="md:col-span-5 space-y-2">
                        <div className="relative aspect-[3/4] bg-neutral-100 border border-neutral-200 rounded-lg overflow-hidden flex items-center justify-center group shadow-sm">
                          {!portraitError ? (
                            <img 
                              src="/kai_paynter.jpg" 
                              alt="Kai Paynter Portrait"
                              className="w-full h-full object-cover"
                              onError={() => setPortraitError(true)}
                            />
                          ) : (
                            <div className="text-center p-6 space-y-2">
                              <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-400 mx-auto">
                                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                  <circle cx="12" cy="7" r="4" />
                                </svg>
                              </div>
                              <p className="text-[10px] font-mono text-neutral-400 leading-tight font-sans">
                                {"[ Place image inside public/kai_paynter.jpg ]"}
                              </p>
                            </div>
                          )}
                        </div>
                        <p className="text-[9px] text-center font-mono text-neutral-400 uppercase tracking-widest">
                          Kai Paynter
                        </p>
                      </div>

                      {/* Right Column: Biography Copy */}
                      <div className="md:col-span-7 space-y-3 leading-relaxed text-neutral-700 font-sans">
                        <p>
                          <strong>Kai Paynter</strong> is a New York-native, Los Angeles-based artist and creative working across the United States and Australia. She is the founder of <em>The Americas, A Theatre Company</em> and co-founder of <em>BearTiger Productions</em>.
                        </p>
                        <p>
                          An MFA graduate of the University of California, Irvine (summa cum laude) and BA (Honors) in Political Science from Purdue University, Kai trained under world-renowned theatre director Robert Cohen and began her career as a featured soloist with PMO, performing internationally and on PBS holiday specials, including at Neil Armstrong's Hall of Fame induction.
                        </p>
                        <p>
                          Her theatre work includes the world premiere of Neil LaBute’s <em>The Furies</em> and the Australian premiere of <em>If I Needed Someone</em>, a self-directed two-hander that received critical acclaim: <em>"Sydney will see If I Needed Someone again and again, but perhaps never as contained or personal, with such tight direction and intense acting."</em>
                        </p>
                        <p>
                          Her producing, writing, and directing slate spans original and classical work across stage, television, music videos, and actor showcases, including ongoing collaborations with Neil LaBute on projects such as <em>The Money Shot</em> and <em>All the Ways to Say I Love You</em>.
                        </p>
                        <p>
                          With on-screen credits in film and television, Kai has appeared on networks, including CBS's <em>Criminal Minds</em> opposite Joe Mantegna, and in campaigns for Apple, Honda, and Boost Mobile, among others. Her portrayal of Abigail in <em>The Crucible</em> was featured in US Airways Inflight Magazine, which highlighted UC Irvine as the "#1 training institution for young creative talent."
                        </p>
                        <p>
                          Kai remains a sought-after industry figure working with emerging and established talent from programs such as Australian Idol, supporting their transition into theatre and television. She has placed artists into programs at Yale School of Drama, Columbia University, and NYU's Tisch, and is regularly engaged by leading casting directors and talent management to prepare high-profile artists for the American film and television markets.
                        </p>
                        <p>
                          Kai remains active on the live scene. More recently, she received the Sydney S+S Festival Awards for Best Director and Best Play. Her work is defined by rigorous craft, elevated performances, and character-driven storytelling with global appeal.
                        </p>
                        <p className="font-semibold pt-1 text-neutral-900 border-t border-neutral-100">
                          Portfolio: www.BearTigerProductions.com
                        </p>
                      </div>

                    </div>
                  </div>
                )}

              </div>

              {/* Bottom Navigation and Return actions for tall pages */}
              <div className="mt-8 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-mono text-[9px] text-neutral-400 select-none">
                  WGA WEST REGISTERED PREVIEW • BEARTIGER PRODUCTIONS © 2026
                </span>
                <button 
                  onClick={() => setActiveDocument(null)}
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-850 text-white rounded text-xs font-mono transition-colors border border-neutral-800 flex items-center space-x-1.5"
                >
                  <X size={12} />
                  <span>Return to Portal</span>
                </button>
              </div>

            </div>

            <div className="text-center text-[10px] text-neutral-500 font-mono">
              CONFIDENTIAL PITCH PREVIEW VIEWING SYSTEM ONLY
            </div>

          </div>
        </div>
      )}

      {/* 2. VIDEO SCREENS VIEWER */}
      {activeVideo && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-3xl w-full space-y-4">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">
                {activeVideo === 'teaser' && "Teaser Trailer Preview"}
                {activeVideo === 'bts' && "Behind-The-Scenes Cut"}
                {activeVideo === 'ep1' && "Episode 1A 'The Party' Stakeholder Review"}
                {activeVideo === 'ep1b' && "Episode 1B 'The Party' Festival Cut"}
              </span>
              <button 
                onClick={() => setActiveVideo(null)}
                className="flex items-center space-x-1 px-3 py-1 bg-neutral-900 hover:bg-neutral-850 text-xs text-neutral-400 rounded-full border border-neutral-800 transition-colors"
              >
                <X size={12} />
                <span>Close screener</span>
              </button>
            </div>

            {/* Simulated protected viewport */}
            <div className="relative aspect-video bg-neutral-950 rounded-xl border border-neutral-800 overflow-hidden flex flex-col justify-center items-center text-center p-6 space-y-4 shadow-2xl select-none">
              
              {/* Floating watermark */}
              <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 text-neutral-500/20 font-mono text-[9px] sm:text-xs">
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

              <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center text-amber-400 border border-neutral-800">
                <Film size={20} />
              </div>

              <div className="space-y-1 max-w-sm">
                <h4 className="text-white text-sm font-bold uppercase">SECURED VIDEO OUTLET</h4>
                <p className="text-neutral-500 text-xs leading-relaxed">
                  Confidential media playback configured for preview screening slots. Direct recording is disabled.
                </p>
              </div>

            </div>

            <div className="text-center text-[10px] text-neutral-600 font-mono">
              PORTAL SOURCE SCREENS V.1 • PRESS ESC TO EXIT PREVIEW
            </div>

          </div>
        </div>
      )}

    </div>
  );
}