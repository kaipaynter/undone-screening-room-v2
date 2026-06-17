import React, { useState } from 'react';
import { 
  FileText, 
  BookOpen, 
  Play, 
  Film, 
  Tv, 
  X, 
  Mail, 
  FileDown, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export default function App() {
  // Modal view states for opening materials immediately
  const [activeDocument, setActiveDocument] = useState(null); // 'script', 'deck', 'onesheet', 'bible'
  const [activeVideo, setActiveVideo] = useState(null); // 'teaser', 'bts', 'ep1'
  const [deckPage, setDeckPage] = useState(0);

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
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-amber-500 selection:text-black flex flex-col justify-between">
      
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
          
          {/* Link: Pilot Script */}
          <button 
            onClick={() => setActiveDocument('script')}
            className="w-full p-5 rounded-xl bg-neutral-900/40 border border-neutral-900 hover:border-amber-500/30 hover:bg-neutral-900/80 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-neutral-950 text-amber-400 group-hover:scale-105 transition-transform">
                <FileText size={20} />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white text-sm tracking-tight uppercase">Read Pilot Script</h3>
                <p className="text-neutral-500 text-xs">Standard 60-page network outline</p>
              </div>
            </div>
            <ExternalLink size={14} className="text-neutral-600 group-hover:text-amber-400 transition-colors" />
          </button>

          {/* Link: Pitch Deck */}
          <button 
            onClick={() => {
              setActiveDocument('deck');
              setDeckPage(0);
            }}
            className="w-full p-5 rounded-xl bg-neutral-900/40 border border-neutral-900 hover:border-amber-500/30 hover:bg-neutral-900/80 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-neutral-950 text-amber-400 group-hover:scale-105 transition-transform">
                <BookOpen size={20} />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white text-sm tracking-tight uppercase">View Pitch Deck</h3>
                <p className="text-neutral-500 text-xs">Aesthetic presentation & project overview</p>
              </div>
            </div>
            <ExternalLink size={14} className="text-neutral-600 group-hover:text-amber-400 transition-colors" />
          </button>

          {/* Link: Series Bible */}
          <button 
            onClick={() => setActiveDocument('bible')}
            className="w-full p-5 rounded-xl bg-neutral-900/40 border border-neutral-900 hover:border-amber-500/30 hover:bg-neutral-900/80 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-neutral-950 text-amber-400 group-hover:scale-105 transition-transform">
                <BookOpen size={20} />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white text-sm tracking-tight uppercase">View Series Bible</h3>
                <p className="text-neutral-500 text-xs">Multi-season design & episode summaries</p>
              </div>
            </div>
            <ExternalLink size={14} className="text-neutral-600 group-hover:text-amber-400 transition-colors" />
          </button>

          {/* Link: One-Sheet */}
          <button 
            onClick={() => setActiveDocument('onesheet')}
            className="w-full p-5 rounded-xl bg-neutral-900/40 border border-neutral-900 hover:border-amber-500/30 hover:bg-neutral-900/80 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-neutral-950 text-amber-400 group-hover:scale-105 transition-transform">
                <FileText size={20} />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white text-sm tracking-tight uppercase">View Series One-Sheet</h3>
                <p className="text-neutral-500 text-xs">Logistical index & summary snapshot</p>
              </div>
            </div>
            <ExternalLink size={14} className="text-neutral-600 group-hover:text-amber-400 transition-colors" />
          </button>

          {/* Link: Ep 1 Pilot Screener */}
          <button 
            onClick={() => setActiveVideo('ep1')}
            className="w-full p-5 rounded-xl bg-neutral-900/40 border border-neutral-900 hover:border-amber-500/30 hover:bg-neutral-900/80 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-neutral-950 text-amber-400 group-hover:scale-105 transition-transform">
                <Tv size={20} />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white text-sm tracking-tight uppercase">Watch Episode 1 "The Party"</h3>
                <p className="text-neutral-500 text-xs">Produced 45-minute festival premier cut</p>
              </div>
            </div>
            <Play size={14} fill="currentColor" className="text-neutral-600 group-hover:text-amber-400 transition-colors" />
          </button>

          {/* Link: Teaser Trailer */}
          <button 
            onClick={() => setActiveVideo('teaser')}
            className="w-full p-5 rounded-xl bg-neutral-900/40 border border-neutral-900 hover:border-amber-500/30 hover:bg-neutral-900/80 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-neutral-950 text-amber-400 group-hover:scale-105 transition-transform">
                <Play size={20} />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white text-sm tracking-tight uppercase">Watch Teaser Trailer</h3>
                <p className="text-neutral-500 text-xs">Short dynamic mood conceptual piece</p>
              </div>
            </div>
            <Play size={14} fill="currentColor" className="text-neutral-600 group-hover:text-amber-400 transition-colors" />
          </button>

          {/* Link: BTS Trailer */}
          <button 
            onClick={() => setActiveVideo('bts')}
            className="w-full p-5 rounded-xl bg-neutral-900/40 border border-neutral-900 hover:border-amber-500/30 hover:bg-neutral-900/80 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-neutral-950 text-amber-400 group-hover:scale-105 transition-transform">
                <Film size={20} />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white text-sm tracking-tight uppercase">Watch Behind-The-Scenes</h3>
                <p className="text-neutral-500 text-xs">Interviews, table reads, & concept prep reels</p>
              </div>
            </div>
            <Play size={14} fill="currentColor" className="text-neutral-600 group-hover:text-amber-400 transition-colors" />
          </button>

        </div>

        {/* Minimal Footer Direct Contact Details */}
        <div className="pt-8 border-t border-neutral-900 text-center space-y-2">
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
        </div>

      </main>

      {/* Elegant minimal Copyright */}
      <footer className="py-6 text-center text-[10px] text-neutral-600 font-mono tracking-widest uppercase">
        © 2026 BEARTIGER PRODUCTIONS. All Rights Reserved.
      </footer>

      {/* --- INLINE LIGHTBOX POPUPS FOR INSTANT REVIEWING --- */}

      {/* 1. SCREENPLAY & DOCUMENT VIEWER */}
      {activeDocument && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-2xl w-full my-6 space-y-4">
            
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase bg-neutral-900 px-3 py-1 text-amber-400 rounded-full border border-neutral-800">
                {activeDocument === 'script' && "SCREENPLAY PROOF"}
                {activeDocument === 'deck' && "INTERACTIVE DECK"}
                {activeDocument === 'bible' && "SERIES BIBLE EXTRACT"}
                {activeDocument === 'onesheet' && "EXECUTIVE SUMMARY"}
              </span>
              <button 
                onClick={() => setActiveDocument(null)}
                className="flex items-center space-x-1 px-3 py-1 bg-neutral-900 hover:bg-neutral-800 text-xs text-neutral-400 rounded-full border border-neutral-800 transition-colors"
              >
                <X size={12} />
                <span>Close Material</span>
              </button>
            </div>

            {/* Document page markup container */}
            <div className="bg-white text-black p-8 md:p-12 rounded-xl relative shadow-2xl min-h-[500px] flex flex-col justify-between font-serif relative overflow-hidden select-text">
              
              <div className="space-y-6 max-w-xl mx-auto text-neutral-950 font-mono text-xs md:text-sm">
                
                {/* Script Viewer View */}
                {activeDocument === 'script' && (
                  <div className="space-y-6">
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
                  <div className="space-y-6 py-6 font-sans">
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
                  <div className="space-y-4 font-sans text-xs text-neutral-800">
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
                  <div className="space-y-4 font-sans text-xs text-neutral-800">
                    <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-tight">PROJECT ONE-SHEET</h2>
                    <p className="leading-relaxed">
                      <strong>Logistical Summary:</strong> UNDONE is a ready-to-package premier comedy-drama with complete pilot drafts, multi-season bible summaries, visual pitches, and estimated pilot budgeting breakdowns.
                    </p>
                    <p className="leading-relaxed">
                      <strong>Target Audience:</strong> Core demographic adults 18-34; ideal fit for high-concept premium streaming, cable network options, or independent distribution partnerships.
                    </p>
                  </div>
                )}

              </div>

              {/* Secure footer info block */}
              <div className="pt-8 border-t border-neutral-200 text-center font-mono text-[9px] text-neutral-400 select-none">
                WGA WEST REGISTERED PREVIEW • BEARTIGER PRODUCTIONS © 2026
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
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-3xl w-full space-y-4">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">
                {activeVideo === 'teaser' && "Teaser Trailer Preview"}
                {activeVideo === 'bts' && "Behind-The-Scenes Cut"}
                {activeVideo === 'ep1' && "Episode 1 'The Party' screener"}
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