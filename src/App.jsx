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
  AlertCircle,
  Download
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

  // Video streaming mapping source (Handles 403 blocks with secure preview frames)
  const getVideoSource = (videoKey) => {
    switch (videoKey) {
      case 'ep1':
        return 'https://drive.google.com/file/d/1Hj2uYR08gOQC0pzD354RNvhe08OpNxZf/preview';
      case 'ep1b':
        return 'https://drive.google.com/file/d/11eS4xg933pewfrXYwRc0gvOo1rQ6g_79/preview';
      case 'teaser':
        return 'https://assets.mixkit.co/videos/preview/mixkit-city-lights-at-night-with-neon-signs-and-traffic-42999-large.mp4';
      case 'bts':
        return 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-director-holding-a-movie-clapperboard-42993-large.mp4';
      default:
        return '';
    }
  };

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
      subtitle: "A Romantic Drama Series",
      content: "In modern-day Los Angeles, Kehlani, a guarded artist, and Jake, an aspiring musician, fall hard and fast. But when family expectations, cultural differences, and unresolved trauma begin to surface, they must decide whether their connection is strong enough to bridge the worlds that shaped them.",
      isItalic: true,
      meta: "Slide 1: Title & Concept"
    },
    {
      title: "Core Conflict",
      subtitle: "Where Worlds Collide",
      content: "The characters are forced to confront inherited biases, family expectations, trauma, belonging, career and identity.",
      meta: "Slide 2: Dynamic"
    },
    {
      title: "Tone & Style",
      subtitle: "Raw & Intimate",
      content: "Contrasting sweeping, warm and cool cinematography with hand-held close-ups. A sonic palette merging alternative R&B with rustic indie-folk music.",
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
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-amber-500 selection:text-black flex flex-col justify-between relative animate-fade-in">
      
      {/* Background radial soft light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Main Content Container */}
      <main className="max-w-2xl w-full mx-auto px-6 py-16 md:py-24 space-y-8">
        
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
              A New Romantic Drama Series
            </p>
          </div>
        </div>

        {/* Cinematic Key Art Poster Card */}
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

        {/* Executive Direct Link Tree Stack */}
        <div className="space-y-3 pt-4">
          
          {/* Link 1: Watch Teaser Trailer (LOCKED) */}
          <button 
            onClick={() => handleProtectedAction('video', 'teaser')}
            className="w-full p-5 rounded-xl bg-neutral-900/40 border border-neutral-900 hover:border-amber-500/30 hover:bg-neutral-900/80 transition-all flex items-center justify-between group relative overflow-hidden"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-neutral-950 text-amber-400 group-hover:scale-105 transition-transform">
                <Play size={20} />
              </div>
              <div className="text-left">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-white text-sm tracking-tight uppercase">Watch Teaser Trailer</h3>
                  {isUnlocked ? (
                    <Unlock size={12} className="text-emerald-500" />
                  ) : (
                    <Lock size={12} className="text-amber-400/80" />
                  )}
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
                  <span className="text-[9px] font-mono bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded uppercase tracking-wider">Public Access</span>
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

          {/* Link 4: View One-sheet (PUBLIC) */}
          <button 
            onClick={() => setActiveDocument('onesheet')}
            className="w-full p-5 rounded-xl bg-neutral-900/40 border border-neutral-900 hover:border-amber-500/30 hover:bg-neutral-900/80 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-neutral-950 text-amber-400 group-hover:scale-105 transition-transform">
                <FileText size={20} />
              </div>
              <div className="text-left">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-white text-sm tracking-tight uppercase">View One-sheet</h3>
                  <span className="text-[9px] font-mono bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded uppercase tracking-wider">Public Access</span>
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
                  <span className="text-[9px] font-mono bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded uppercase tracking-wider font-semibold">Public Access</span>
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
                {activeDocument === 'bible' && "SERIES BIBLE EXTRACT | UNDONE • ROMANTIC DRAMA"}
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
                      <p className="text-[10px]">Written by Kai Paynter & Ella Sullivan</p>
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
                        <p className={`text-sm text-neutral-700 leading-relaxed pt-2 ${pitchDeckSlides[deckPage].isItalic ? 'italic font-serif text-neutral-950 text-[15px]' : ''}`}>
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

                {/* Simplified Series Bible Single-Page Scrollable View */}
                {activeDocument === 'bible' && (
                  <div className="space-y-6 py-4 font-sans max-w-2xl mx-auto text-neutral-800">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-200 pb-4">
                      <div>
                        <span className="text-[9px] font-mono uppercase tracking-widest text-amber-600 font-bold">
                          SERIES BIBLE EXTRACT
                        </span>
                        <h3 className="text-2xl font-black text-neutral-900 tracking-tight leading-none uppercase">
                          UNDONE
                        </h3>
                        <p className="text-[10px] text-neutral-400 tracking-wider font-mono mt-1">
                          UNDONE • ROMANTIC DRAMA
                        </p>
                      </div>
                      
                      <a 
                        href="/undone_series_bible.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-850 text-white rounded text-[10px] font-mono transition-colors border border-neutral-800"
                      >
                        <Download size={10} />
                        <span>Open Bible PDF</span>
                      </a>
                    </div>

                    {/* Metadata, Formats & Tone References Combined Sheet Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-b border-neutral-200 py-4 font-mono text-[11px] text-neutral-600">
                      <div className="space-y-3">
                        <div>
                          <strong className="text-neutral-900 font-sans block text-xs uppercase tracking-wider font-bold">GENRE</strong>
                          <span>Romantic Drama</span>
                        </div>
                        <div>
                          <strong className="text-neutral-900 font-sans block text-xs uppercase tracking-wider font-bold">FORMAT</strong>
                          <span>Season 1: 10, 50-minute episodes</span>
                        </div>
                        <div>
                          <strong className="text-neutral-900 font-sans block text-xs uppercase tracking-wider font-bold">SETTING</strong>
                          <span>Modern-day Hollywood, CA / Los Angeles, CA</span>
                        </div>
                      </div>
                      
                      <div className="bg-neutral-50 p-4 rounded border border-neutral-200 h-full flex flex-col justify-center">
                        <strong className="text-neutral-900 font-sans block text-xs uppercase tracking-wider font-bold mb-2">TONE REFERENCES</strong>
                        <p className="italic text-neutral-700 leading-relaxed text-xs font-serif">
                          "The intimate realism of Netflix’s <strong className="font-semibold text-neutral-900 font-sans">Love</strong> + the emotional excavation of Hulu’s <strong className="font-semibold text-neutral-900 font-sans">Normal People</strong> + the cultural sharpness of HBO’s <strong className="font-semibold text-neutral-900 font-sans">Insecure</strong>."
                        </p>
                      </div>
                    </div>

                    {/* Vision Statement block */}
                    <div className="space-y-3 leading-relaxed text-neutral-700">
                      <h5 className="font-bold text-neutral-900 text-sm uppercase tracking-wider font-sans border-b border-neutral-100 pb-1">VISION STATEMENT</h5>
                      <p>
                        <strong className="text-neutral-900">Undone</strong> is a story about the spaces we occupy—physical, emotional, and cultural—and the ways love demands we traverse them. Attraction can be electric but insufficient when unexamined histories collide. Hollywood offers glamour, but also intimacy: shared coffee, late-night music, small victories, and unspoken tension.
                      </p>
                      <p>
                        This series explores how trauma, race, family expectation, inherited and societal bias shape love. Kehlani and Jake are both right and both wrong. Their story isn't about fantasy. It's about real love in real life: messy, awkward, fragile, and occasionally devastatingly beautiful.
                      </p>
                      <p className="bg-amber-500/5 border-l-2 border-amber-500 p-3 my-2 text-xs text-neutral-950 font-medium">
                        This is not a "can interracial couples survive?" story. It is about emotional readiness vs emotional intensity, trauma, and how bias survives inside "good" people.
                      </p>
                    </div>

                    {/* Copyright footer notice */}
                    <p className="text-[9px] text-neutral-400 italic pt-6 leading-relaxed border-t border-neutral-100">
                      The Undone Series Bible is the original work of BearTiger Productions. No part of it may be reproduced, distributed, transmitted, displayed, or performed in any form or by any means, electronic or mechanical, including photocopying, recording, or by any information storage and retrieval system, without the prior written permission of the copyright holder. ©2026 BearTiger Productions. All Rights Reserved.
                    </p>
                  </div>
                )}

                {/* One Sheet View */}
                {activeDocument === 'onesheet' && (
                  <div className="space-y-6 font-sans text-xs text-neutral-800 max-w-xl mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-200 pb-4">
                      <div>
                        <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-tight">PROJECT ONE-SHEET</h2>
                        <p className="text-[10px] text-neutral-400 tracking-wider font-mono mt-1">
                          UNDONE • ROMANTIC DRAMA
                        </p>
                      </div>
                      
                      <a 
                        href="/undone_one_sheet.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-850 text-white rounded text-[10px] font-mono transition-colors border border-neutral-800 animate-pulse"
                      >
                        <Download size={10} />
                        <span>Open One-sheet PDF</span>
                      </a>
                    </div>
                    
                    <div className="space-y-4 text-neutral-700 leading-relaxed text-sm">
                      <p>
                        <strong>Logistical Summary:</strong> UNDONE is a ready-to-package premier romantic drama with a completed pilot episode, multi-season bible summaries, visual pitches, and estimated pilot budgeting breakdowns.
                      </p>
                      <p>
                        <strong>Target Audience:</strong> Core demographic adults 21-45; ideal fit for high-concept premium streaming, cable network options, or independent distribution partnerships.
                      </p>
                    </div>

                    <p className="text-[9px] text-neutral-400 italic border-t border-neutral-100 pt-4 leading-relaxed">
                      Copyright 2026 Registered WGA, 2342916 All rights reserved. No part of the material protected by this copyright may be reproduced or utilized in any form, electronic or mechanical, including photocopying, recording, or by any information storage and retrieval system, without written permission from the copyright owner.
                    </p>
                  </div>
                )}

                {/* Creator Bio Document View */}
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
                              src="/kai_paynter_v3.jpg" 
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
                              <p className="text-[10px] font-mono text-neutral-400 leading-tight">
                                {"[ Place image inside public/kai_paynter_v3.jpg ]"}
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
                          <strong>KAI PAYNTER</strong> is a New York-native, Los Angeles-based artist and creative working across the United States and Australia. She is the founder of <em>The Americas, A Theatre Company</em> and co-founder of <em>BearTiger Productions</em>.
                        </p>
                        <p>
                          An MFA graduate of the University of California, Irvine (summa cum laude) and BA (Honors) in Political Science from Purdue University, Kai trained under world-renowned theatre director Robert Cohen and began her career as a featured soloist with PMO, performing internationally and on PBS holiday specials, including at <em>Neil Armstrong’s Hall of Fame</em> induction.
                        </p>
                        <p>
                          Her theatre credits reflect a diverse body of work, including the world premiere of Neil LaBute's <em>THE FURIES</em> and the Australian premiere of <em>IF I NEEDED SOMEONE</em>, a self-directed two-hander that received critical acclaim: “Sydney will see If I Needed Someone again and again, but perhaps never as contained or personal, with such tight direction and intense acting.”
                        </p>
                        <p>
                          Her producing and writing/directing slate spans original and classical work across stage and screen, including ongoing collaborations with Neil LaBute on projects such as <em>THE MONEY SHOT</em> and <em>ALL THE WAYS TO SAY I LOVE YOU</em>.
                        </p>
                        <p>
                          With on-screen credits in film and television, Kai has appeared on networks, including CBS’s <em>Criminal Minds</em> opposite Joe Mantegna, and in campaigns for APPLE, HONDA, and BOOST MOBILE, among others. Her portrayal of Abigail in <em>THE CRUCIBLE</em> was featured in <em>US Airways Inflight Magazine</em>, which highlighted UC Irvine as the “#1 training institution for young creative talent.”
                        </p>
                        <p>
                          Kai remains a sought-after industry figure working with emerging and established talent from programs such as <em>Australian Idol</em>, supporting their transition into theatre and television. She has placed artists into programs at Yale School of Drama, Columbia University, and NYU’s Tisch, and is regularly engaged by leading casting directors and talent management to prepare high-profile artists for the American film and television market.
                        </p>
                        <p>
                          More recently, Kai received the <em>Sydney S+S Festival Awards</em> for BEST DIRECTOR and BEST PLAY. Her work is defined by rigorous craft, elevated performances, and character-driven storytelling with global appeal.
                        </p>
                        <p className="font-semibold pt-1 text-neutral-900 border-t border-neutral-100">
                          She’s at <a href="https://www.BearTigerProductions.com" target="_blank" rel="noopener noreferrer" className="hover:underline text-amber-600">www.BearTigerProductions.com</a>
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

      {/* 2. VIDEO SCREEN VIEWER */}
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

            {/* Secure Player Frame with dynamic direct media streaming */}
            <div className="secure-video-wrapper relative aspect-video bg-neutral-950 rounded-xl border border-neutral-800 overflow-hidden flex flex-col justify-center items-center shadow-2xl select-none">
              
              {/* HTML5 Native Stream Player for direct files, or Secure Iframe for Google Drive */}
              {(activeVideo === 'ep1' || activeVideo === 'ep1b') ? (
                <div className="w-full h-full relative">
                  {/* Embedded Iframe bypassing GDrive 403 blocks */}
                  <iframe 
                    src={getVideoSource(activeVideo)}
                    className="w-full h-full border-0 rounded-xl"
                    allow="autoplay"
                    allowFullScreen
                  />
                  {/* Invisible Shield Layer placed to mask GDrive default download actions */}
                  <div className="absolute top-0 right-0 w-32 h-14 bg-transparent pointer-events-auto z-30 cursor-not-allowed" title="Actions restricted on screener copy" />
                </div>
              ) : (
                <video 
                  key={activeVideo}
                  src={getVideoSource(activeVideo)}
                  controls
                  autoPlay
                  controlsList="nodownload noremoteplayback"
                  disablePictureInPicture
                  onContextMenu={(e) => e.preventDefault()}
                  className="w-full h-full object-contain"
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
      )}

    </div>
  );
}
