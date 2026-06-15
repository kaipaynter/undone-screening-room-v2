import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithCustomToken,
  signInAnonymously,
  onAuthStateChanged
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  getDoc,
  onSnapshot,
  query
} from 'firebase/firestore';
import {
  Play,
  Lock,
  Unlock,
  Download,
  FileText,
  Music,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Users,
  MapPin,
  Mail,
  Phone,
  ShieldAlert,
  FileDown,
  X,
  CheckCircle,
  Eye,
  BookOpen,
  Film,
  Camera,
  Heart,
  Database,
  Terminal,
  Clock,
  Briefcase,
  Layers,
  Send,
  AlertCircle
} from 'lucide-react';

// --- FIREBASE CONFIG & INITIALIZATION ---
const firebaseConfig = {
  apiKey: "AIzaSyOfflineMockKey_ToBypassLocalStartupVerification",
  authDomain: "mock-project.firebaseapp.com",
  projectId: "mock-project",
  storageBucket: "mock-project.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

export default function App() {
  // Global User States
  const [user, setUser] = useState(null);
  const [executiveProfile, setExecutiveProfile] = useState({
    name: '',
    company: '',
    title: '',
    email: ''
  });

  // Admin states
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState('');
  const [adminError, setAdminError] = useState('');
  const [activityLogs, setActivityLogs] = useState([]);
  const [inquiriesList, setInquiriesList] = useState([]);

  // Authentication & Access Control States
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [requestAccessEmail, setRequestAccessEmail] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState('');
  const [regForm, setRegForm] = useState({ name: '', title: '', company: '', email: '' });
  const [showRegForm, setShowRegForm] = useState(false);

  // Media & Interaction States
  const [activeVideo, setActiveVideo] = useState(null); // 'teaser', 'bts', 'ep1'
  const [activeDocument, setActiveDocument] = useState(null); // 'script', 'bible', 'deck', 'onesheet'
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCast, setActiveCast] = useState(null);
  const [activeMoodTrack, setActiveMoodTrack] = useState(0);

  // Form States
  const [contactForm, setContactForm] = useState({ name: '', company: '', email: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simulated Passcode (standard for hollywood pitch sites)
  const VIP_PASSCODE = "UNDONELA";
  const SECRET_ADMIN_PASSCODE = "ADMINUNDONE";

  // Pitch Deck Carousel Slides
  const pitchSlides = [
    {
      title: "Title & Key Art",
      subtitle: "UNDONE - A Bold New Comedy Drama Series",
      bg: "linear-gradient(135deg, #111 0%, #000 100%)",
      content: "A premium series exploring Love, Lust, and LA. The visual centerpiece showcases a man in a crisp white shirt with his mind literally lost in a sprawling, textured cloud—symbolizing the intoxicating noise, confusion, and romantic idealism of modern Los Angeles."
    },
    {
      title: "The Logline",
      subtitle: "Where Worlds Collide",
      bg: "linear-gradient(135deg, #0f1c24 0%, #050b10 100%)",
      content: "A guarded city girl and an all-American country boy fall fast in La-La Land, but can their spark bridge their worlds? A deep-dive romantic journey about learning to trust while fighting to find yourself."
    },
    {
      title: "Vision & Tone",
      subtitle: "Raw, Intimate, & Nuanced",
      bg: "linear-gradient(135deg, #1f1510 0%, #0a0705 100%)",
      content: "An emotionally honest portrait of a Black/biracial woman navigating belonging in modern America. Set against the seductive backdrop of Hollywood, exploring what happens when instant chemistry collides with past trauma, inherited bias, and deep-seated cultural expectations."
    },
    {
      title: "The Sonic Universe",
      subtitle: "Alternative R&B meets Rustic Bluegrass",
      bg: "linear-gradient(135deg, #241c0f 0%, #0b0804 100%)",
      content: "The audio pulse of the show merges raw, sultry Hip-Hop and R&B (think Brent Fiyaz, SZA, and Alina Baraz) with rustic, organic folk-country storytelling (reminiscent of Stevie Nicks, Joni Mitchell, and Fleetwood Mac) to mirror the cultural collision of our two leads."
    }
  ];

  // Character Data with Archetypes and Descriptions
  const castList = [
    {
      id: "kehlani",
      name: "Kehlani Brooks",
      age: "25-30",
      origin: "Chicago Native",
      identity: "Black, Female",
      castType: "Zoe Kravitz Type",
      traits: "Hyper-independent, heady, honest.",
      description: "Kehlani is a Museum cleaner by day, and artist by night. Raised in an unstable environment, she learned early on not to rely on anyone and uses detachment as protection. She's trendy, effortless, and mysterious, fiercely protecting her inner creative world.",
      quote: "My walls aren't there to keep you out. They're to keep me together.",
      accentColor: "from-amber-400/20 to-neutral-900"
    },
    {
      id: "jake",
      name: "Jake Kozlowicz",
      age: "25-30",
      origin: "Southern US",
      identity: "Caucasian, Male",
      castType: "Liam Hemsworth Type",
      traits: "Aspiring musician, grounded, unassuming.",
      description: "Pursuing a music career in Hollywood, Jake is handsome in a quiet, rugged way. He falls for Kehlani fast and means it. However, coming from a tight-knit small town, he's initially unfamiliar with trauma at her depth and holds highly idealistic views about race and systemic realities in LA.",
      quote: "I didn't come to California to become someone else. I came to find a space big enough for my songs.",
      accentColor: "from-blue-500/10 to-neutral-900"
    },
    {
      id: "kaylee",
      name: "Kaylee Nichols",
      age: "20-25",
      origin: "California Native",
      identity: "Female",
      castType: "Anna Faris Type",
      traits: "Closet coke addict, aspiring influencer, loyalty-driven.",
      description: "Kehlani's co-worker. Born into extreme privilege as the daughter of a successful venture capitalist, Kaylee hides her dependencies behind a bubbly screen presence. She is surprisingly insightful and serves as an accidental comic relief with a deeply loyal golden-retriever heart.",
      quote: "It's not an addiction if you only do it to feel normal on Instagram, right?",
      accentColor: "from-yellow-500/10 to-neutral-900"
    },
    {
      id: "matt",
      name: "Matt Rhodes",
      age: "30-40",
      origin: "Indiana Native",
      identity: "Caucasian, Male",
      castType: "Justin Wheeler Type",
      traits: "Coked-up real estate giant, image-conscious.",
      description: "Jake's older cousin and self-proclaimed guide to Los Angeles. Matt has built a high-flying career in high-end LA real estate. Driven by sex, money, status, and vanity, he offers unsolicited advice shaped by massive, unexamined social and racial biases.",
      quote: "In LA, you are not what you make. You are what people think you spend.",
      accentColor: "from-slate-600/20 to-neutral-900"
    },
    {
      id: "jackie",
      name: "Jackie Brown",
      age: "45-65",
      origin: "LA Resident",
      identity: "Black, Female",
      castType: "Pam Grier Type",
      traits: "Maternal anchor, seasoned hair braider.",
      description: "A grounded, nurturing figure who runs a local braiding shop. Jackie is Kehlani's reliable source of wisdom. In her styling chair, Kehlani lets her guard down. Jackie offers warmth, maternal care, and a sharp, no-nonsense edge that cuts through superficial Hollywood noise.",
      quote: "Braid by braid, child. That's how you fix a crown. You don't rush the roots.",
      accentColor: "from-red-600/15 to-neutral-900"
    },
    {
      id: "darnell",
      name: "Darnell Meyers",
      age: "27-37",
      origin: "BIPOC, Male",
      identity: "Los Angeles Native",
      castType: "Trevante Rhodes Type",
      traits: "Devastatingly handsome, graphic designer, deeply romantic.",
      description: "Kehlani's ex-boyfriend. Darnell is introverted, magnetic, and fiercely protective of those he loves. He is a 'blast from the past' who represents security and shared history, providing a stark contrast to Jake's foreign world.",
      quote: "You keep running away hoping someone will chase you. But I'm still right here.",
      accentColor: "from-teal-600/15 to-neutral-900"
    }
  ];

  // Soundtrack Moodboard Tracks
  const soundtrackTracks = [
    { title: "Screaming Silences", genre: "Alt R&B", artist: "Inspired by Brent Fiyaz & SZA", dur: "3:42" },
    { title: "Dust & Neon", genre: "Indie Folk/Bluegrass", artist: "Inspired by Fleetwood Mac & Joni Mitchell", dur: "4:15" },
    { title: "La Brea Twilight", genre: "Lofi R&B/Jazz", artist: "Inspired by Alina Baraz & Galimatias", dur: "3:10" },
    { title: "Interstate Heartache", genre: "Americana/Folk Rock", artist: "Inspired by Hall & Oates / John Denver", dur: "5:02" }
  ];

  // --- PERSISTENCE & SECURITY HOOKS (RULES 1, 2, 3) ---

  // Auth initialization (Rule 3 priority order)
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) {
        console.error("Critical Authentication failed:", err);
      }
    };
    initAuth();

    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        // Hydrate executive profile from session storage if available
        const savedProfile = sessionStorage.getItem(`undone_exec_profile_${u.uid}`);
        if (savedProfile) {
          try {
            const parsed = JSON.parse(savedProfile);
            setExecutiveProfile(parsed);
            setIsAuthorized(true);
          } catch(e){}
        } else {
          // If simply unlocked using passcode previously
          const passcodeUnlocked = sessionStorage.getItem(`undone_unlocked_pass_${u.uid}`);
          if (passcodeUnlocked === 'true') {
            setIsAuthorized(true);
          }
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Real-time Firestore Sync (Rule 1 paths, Rule 2 queries, Rule 3 guards)
  useEffect(() => {
    if (!user) return;

    // Stream activity logs public path (Rule 1)
    const logsCol = collection(db, 'artifacts', appId, 'public', 'data', 'activity_logs');
    const unsubscribeLogs = onSnapshot(logsCol, (snapshot) => {
      const logs = [];
      snapshot.forEach((doc) => {
        logs.push({ id: doc.id, ...doc.data() });
      });
      // Sort client-side to prevent missing index crashes (Rule 2)
      logs.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      setActivityLogs(logs);
    }, (error) => {
      console.error("Activity stream subscription failure:", error);
    });

    // Stream inquiries public path (Rule 1)
    const inquiriesCol = collection(db, 'artifacts', appId, 'public', 'data', 'inquiries');
    const unsubscribeInquiries = onSnapshot(inquiriesCol, (snapshot) => {
      const inqs = [];
      snapshot.forEach((doc) => {
        inqs.push({ id: doc.id, ...doc.data() });
      });
      inqs.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      setInquiriesList(inqs);
    }, (error) => {
      console.error("Inquiries stream subscription failure:", error);
    });

    return () => {
      unsubscribeLogs();
      unsubscribeInquiries();
    };
  }, [user]);

  // Helper function to commit logs safely
  const logInteraction = async (actionType, details = {}) => {
    if (!user) return;
    try {
      const logsCol = collection(db, 'artifacts', appId, 'public', 'data', 'activity_logs');
      await addDoc(logsCol, {
        userId: user.uid,
        action: actionType,
        viewerName: executiveProfile.name || "Anonymous Executive",
        viewerCompany: executiveProfile.company || "Guest / Agency Partner",
        timestamp: Date.now(),
        ...details
      });
    } catch (err) {
      console.error("Failed to commit interaction to database:", err);
    }
  };

  // Custom passcode or credential handler
  const handlePasscodeSubmit = async (e) => {
    e.preventDefault();
    const formattedCode = accessCode.trim().toUpperCase();

    if (formattedCode === VIP_PASSCODE) {
      setIsAuthorized(true);
      setAuthSuccess('Access Granted. Welcome to the UNDONE Creative Portal.');
      setAuthError('');
      if (user) {
        sessionStorage.setItem(`undone_unlocked_pass_${user.uid}`, 'true');
        await logInteraction("Unlocked with VIP Passcode");
      }
    } else if (formattedCode === SECRET_ADMIN_PASSCODE) {
      setIsAdmin(true);
      setIsAuthorized(true);
      setAuthSuccess('Administrative Terminal Active.');
      setAuthError('');
      setAccessCode('');
      if (user) {
        await logInteraction("Authorized Admin Terminal Session");
      }
    } else {
      setAuthError('Invalid passcode. If you are an industry partner, investor, or distributor, please submit an access request below.');
      setAuthSuccess('');
    }
  };

  // Dynamic Executive Registration
  const handleExecutiveRegistration = async (e) => {
    e.preventDefault();
    if (!regForm.name || !regForm.email || !regForm.company) {
      setAuthError("All credentials are required to issue an executive view token.");
      return;
    }

    setIsSubmitting(true);
    try {
      setExecutiveProfile({
        name: regForm.name,
        company: regForm.company,
        title: regForm.title || "Industry Analyst",
        email: regForm.email
      });

      if (user) {
        // Store in local browser storage to keep active session
        sessionStorage.setItem(`undone_exec_profile_${user.uid}`, JSON.stringify({
          name: regForm.name,
          company: regForm.company,
          title: regForm.title || "Industry Analyst",
          email: regForm.email
        }));

        const registryCol = collection(db, 'artifacts', appId, 'public', 'data', 'authorized_viewers');
        await addDoc(registryCol, {
          userId: user.uid,
          name: regForm.name,
          company: regForm.company,
          title: regForm.title,
          email: regForm.email,
          timestamp: Date.now()
        });
      }

      setIsAuthorized(true);
      setAuthSuccess(`Executive badge successfully configured for ${regForm.name}. Welcome.`);
      setAuthError('');
      setShowRegForm(false);

      // Initial Login Action Logged
      await logInteraction("Registered Executive Portal Pass", {
        executiveTitle: regForm.title,
        executiveEmail: regForm.email
      });
    } catch (err) {
      console.error(err);
      setAuthError("Configuration failed. Database issue encountered.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Simulated code request form
  const handleRequestAccess = (e) => {
    e.preventDefault();
    if (requestAccessEmail) {
      setRequestSubmitted(`Thank you! An invitation containing authorization keys will be dispatched to ${requestAccessEmail} upon validation of credentials.`);
      setRequestAccessEmail('');
    }
  };

  // Triggered when reading screenplay drafts or viewing bibles
  const triggerDocumentView = async (docType) => {
    setActiveDocument(docType);
    let docTitle = "";
    if (docType === 'script') docTitle = "Pilot Draft Screenplay";
    if (docType === 'bible') docTitle = "Pitch Treatment & Series Bible";
    if (docType === 'onesheet') docTitle = "Executive Summary";

    await logInteraction("Read Document", {
      documentName: docTitle,
      documentId: docType
    });
  };

  // Triggered when playing premium streams
  const triggerStreamVideo = async (videoType) => {
    setActiveVideo(videoType);
    let vidTitle = "";
    if (videoType === 'teaser') vidTitle = "Teaser Trailer";
    if (videoType === 'bts') vidTitle = "Behind-The-Scenes Cut";
    if (videoType === 'ep1') vidTitle = "Episode 1 'The Party' Premier Cut";

    await logInteraction("Played Secure Video Stream", {
      videoName: vidTitle,
      videoId: videoType
    });
  };

  // Submits form directly to database
  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email) return;

    setIsSubmitting(true);
    try {
      if (user) {
        const inquiriesCol = collection(db, 'artifacts', appId, 'public', 'data', 'inquiries');
        await addDoc(inquiriesCol, {
          userId: user.uid,
          name: contactForm.name,
          company: contactForm.company || "Private Entity",
          email: contactForm.email,
          message: contactForm.message || "",
          timestamp: Date.now()
        });

        await logInteraction("Sent Dynamic Pitch Inquiry", {
          inquirySender: contactForm.name,
          inquiryEmail: contactForm.email
        });
      }
      setContactSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggles admin manually
  const toggleAdminAuth = (e) => {
    e.preventDefault();
    if (adminPasscode.trim().toUpperCase() === SECRET_ADMIN_PASSCODE) {
      setIsAdmin(true);
      setAdminError('');
      setAdminPasscode('');
    } else {
      setAdminError('Unregistered management token.');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-500 selection:text-black">

      {/* Dynamic Gold Radial Glow Backdrop */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-[1200px] right-10 w-[400px] h-[400px] bg-yellow-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* STICKY NAVIGATION BAR */}
      <nav className="sticky top-0 z-40 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-900 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-black tracking-widest text-white">
              UN<span className="text-amber-400">DONE</span>
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 text-[9px] font-bold bg-amber-500/20 text-amber-300 rounded tracking-wider uppercase">
              Database Sync Enabled
            </span>
          </div>

          <div className="flex items-center space-x-6 text-sm">
            <a href="#concept" className="hover:text-amber-400 transition-colors hidden md:block">The Vision</a>
            <a href="#cast" className="hover:text-amber-400 transition-colors hidden md:block">Cast Dossier</a>
            <a href="#media" className="hover:text-amber-400 transition-colors hidden md:block">Pitch Media</a>

            {isAdmin && (
              <span className="hidden lg:flex items-center space-x-1.5 px-3 py-1 bg-amber-500/10 text-amber-400 text-xs border border-amber-500/30 rounded font-mono">
                <Terminal size={12} />
                <span>ROOT ADMIN</span>
              </span>
            )}

            {isAuthorized ? (
              <span className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs border border-emerald-500/20 font-medium">
                <Unlock size={12} />
                <span>VIP Session Active</span>
              </span>
            ) : (
              <a
                href="#gate"
                className="flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-amber-400 hover:bg-amber-300 text-black text-xs font-semibold tracking-wider transition-all shadow-lg shadow-amber-500/10"
              >
                <Lock size={12} />
                <span>ENTER VIP CORE</span>
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* HERO SECTION / LANDING KEY ART (Image 1 Interpretation) */}
      <header className="relative py-20 px-6 overflow-hidden border-b border-neutral-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-7 space-y-6">
            <p className="text-xs font-bold tracking-[0.3em] text-amber-400 uppercase">
              A Bold New Comedy Drama Series
            </p>

            <h1 className="text-7xl md:text-8xl font-extrabold tracking-tighter text-white leading-none relative">
              UN<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-white glow-gold">DONE</span>
            </h1>

            <p className="text-lg md:text-xl font-medium tracking-[0.25em] text-neutral-300 uppercase">
              LOVE. LUST. LA.
            </p>

            <div className="h-[2px] w-24 bg-gradient-to-r from-amber-400 to-transparent" />

            <p className="text-neutral-400 text-base md:text-lg max-w-xl leading-relaxed">
              A guarded, artistic city girl from Chicago and an all-American Southern country boy fall fast and hard under the beautiful, neon-tinged fog of Los Angeles.
              As they struggle to find their own voices, their chemical spark challenges their traumas, family expectations, inherited biases, and deep-seated cultural divisions.
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => triggerStreamVideo('teaser')}
                className="flex items-center space-x-2 px-6 py-3 bg-white text-black font-semibold rounded hover:bg-neutral-200 transition-all shadow-md"
              >
                <Play size={16} fill="currentColor" />
                <span>Watch Teaser Trailer</span>
              </button>

              <button
                onClick={() => triggerStreamVideo('bts')}
                className="flex items-center space-x-2 px-6 py-3 bg-neutral-900 text-neutral-200 font-semibold rounded hover:bg-neutral-800 transition-all border border-neutral-800"
              >
                <Film size={16} />
                <span>Watch Behind-The-Scenes</span>
              </button>
            </div>
          </div>

          {/* Interactive Cloud Key Art Mockup (Inspired by Image 1) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-80 h-96 bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden flex flex-col justify-end p-6 group hover:border-amber-500/30 transition-all duration-500">

              {/* Cloud head vector graphic representing the protagonist */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <svg viewBox="0 0 200 200" className="w-full h-full opacity-80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Subtle Human Outline */}
                  <path d="M70,160 C70,140 80,120 100,120 C120,120 130,140 130,160" stroke="#444" strokeWidth="2" strokeLinecap="round" />
                  <line x1="100" y1="120" x2="100" y2="160" stroke="#333" strokeWidth="2" />

                  {/* Massive textured Cloud on top of head */}
                  <g className="animate-pulse" style={{ animationDuration: '6s' }}>
                    <path d="M50,90 C40,90 30,100 30,110 C30,120 40,130 50,130 L150,130 C160,130 170,120 170,110 C170,100 160,90 150,90 C155,80 150,65 135,65 C135,50 115,45 100,55 C85,45 65,50 65,65 C50,65 45,80 50,90 Z" fill="#fff" fillOpacity="0.85" />
                    {/* Inner texture lines */}
                    <path d="M60,85 C65,75 80,75 85,82" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M110,75 C120,70 135,78 130,90" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M80,105 C90,100 110,100 120,105" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" />
                  </g>
                </svg>
              </div>

              {/* Overlapping Film Grain overlay */}
              <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

              {/* Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />

              <div className="relative z-20 text-center space-y-1">
                <span className="text-[10px] font-bold tracking-[0.4em] text-amber-400 uppercase">Beartiger Productions</span>
                <h4 className="text-xl font-bold tracking-tight text-white uppercase">Mind in the Cloud</h4>
                <p className="text-neutral-500 text-xs font-mono">2026 Pitch Cover Study 01</p>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* REAL-TIME EXECUTIVE COMMAND ANALYTICS CONSOLE (ADMIN ONLY VIEW) */}
      {isAdmin && (
        <section className="bg-neutral-900 border-y border-amber-500/40 p-6 md:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-amber-400 font-mono text-sm font-bold">
                  <Database size={16} className="animate-pulse" />
                  <span>BEARTIGER DATABASE SYNC TERMINAL</span>
                </div>
                <h2 className="text-2xl font-black text-white uppercase">Real-Time Executive Activity Ledger</h2>
              </div>
              <button
                onClick={() => {
                  setIsAdmin(false);
                  sessionStorage.removeItem('undone_admin_active');
                }}
                className="px-4 py-1.5 bg-neutral-950 border border-neutral-800 hover:border-red-500/50 hover:text-red-400 text-xs font-mono text-neutral-400 rounded transition-all"
              >
                Disconnect Terminal
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Log Table Container */}
              <div className="lg:col-span-2 bg-neutral-950 p-4 rounded-xl border border-neutral-800 max-h-96 overflow-y-auto space-y-3">
                <div className="flex justify-between items-center text-xs font-mono text-neutral-500 border-b border-neutral-900 pb-2">
                  <span>LIVE BEHAVIOR LOGS</span>
                  <span>{activityLogs.length} LOGS IN FLUID MEMORY</span>
                </div>

                {activityLogs.length === 0 ? (
                  <p className="text-neutral-600 text-xs py-12 text-center font-mono">No executive logins recorded in current sync session.</p>
                ) : (
                  <div className="space-y-2 text-xs font-mono">
                    {activityLogs.map((log) => (
                      <div key={log.id} className="p-2 bg-neutral-900/60 rounded border border-neutral-850/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                        <div className="space-y-1">
                          <span className="text-amber-400 font-bold">
                            {log.viewerName} ({log.viewerCompany || "Industry Partner"})
                          </span>
                          <span className="text-neutral-500 text-[11px] block md:inline md:ml-2">
                            → {log.action} {log.documentName || log.videoName ? `(${log.documentName || log.videoName})` : ''}
                          </span>
                        </div>
                        <span className="text-neutral-600 text-[10px] whitespace-nowrap self-end md:self-auto">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Inbound Inquiries Panel */}
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 max-h-96 overflow-y-auto space-y-3">
                <div className="flex justify-between items-center text-xs font-mono text-neutral-500 border-b border-neutral-900 pb-2">
                  <span>INBOUND PITCH INQUIRIES</span>
                  <span>{inquiriesList.length} OFFERS</span>
                </div>

                {inquiriesList.length === 0 ? (
                  <p className="text-neutral-600 text-xs py-12 text-center font-mono">No network offers received yet.</p>
                ) : (
                  <div className="space-y-3 text-xs">
                    {inquiriesList.map((inq) => (
                      <div key={inq.id} className="p-3 bg-neutral-900 rounded-lg border border-neutral-850 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-white uppercase">{inq.name}</h4>
                            <p className="text-neutral-500 text-[10px] font-mono">{inq.company}</p>
                          </div>
                          <a
                            href={`mailto:${inq.email}`}
                            className="p-1 rounded bg-amber-400/10 text-amber-300 hover:bg-amber-400 hover:text-black transition-all"
                          >
                            <Mail size={12} />
                          </a>
                        </div>
                        <p className="text-neutral-400 italic bg-neutral-950/40 p-2 rounded text-[11px] leading-relaxed border border-neutral-900">
                          "{inq.message}"
                        </p>
                        <span className="text-[10px] font-mono text-neutral-600 block text-right">
                          {new Date(inq.timestamp).toLocaleDateString()} at {new Date(inq.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>
      )}

      {/* DETAILED PITCH CONCEPT / STORY ARCH (Images 2, 3, 5, 6) */}
      <section id="concept" className="py-20 px-6 max-w-7xl mx-auto space-y-24">

        {/* LOGLINE & SERIES SUMMARY CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-neutral-900/50 p-8 md:p-12 rounded-2xl border border-neutral-900 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono text-amber-500 tracking-wider font-semibold uppercase">The Premise</span>
            <h2 className="text-4xl font-extrabold text-white">THE LOGLINE</h2>
            <p className="text-neutral-400 leading-relaxed text-sm">
              Exploring what happens when true intimacy challenges personal armor, "UNDONE" isn't a simple fairytale—it's a raw dive into how two disparate social backgrounds survive alongside one another in Southern California.
            </p>
          </div>
          <div className="lg:col-span-7 bg-neutral-950 p-6 md:p-8 rounded-xl border border-neutral-800 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 text-xs font-bold text-amber-500/20 font-mono select-none">PAGE 2 // LOGLINE</div>
            <p className="text-xl md:text-2xl font-semibold text-neutral-100 italic tracking-wide leading-relaxed">
              "A guarded city girl and an all-American country boy fall fast in LA-LA land but can their spark bridge their worlds?"
            </p>
          </div>
        </div>

        {/* 4 WORLDS COLLIDE GRID */}
        <div className="space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-mono text-amber-500 tracking-wider font-semibold uppercase">Structural Design</span>
            <h2 className="text-3xl font-bold tracking-tight text-white">FOUR WORLDS COLLIDE</h2>
            <p className="text-neutral-400 text-sm">Our narratives thrive on the friction that occurs across these distinct social dimensions:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-neutral-900/40 p-6 rounded-xl border border-neutral-900 space-y-3 hover:border-amber-500/20 transition-all">
              <div className="w-10 h-10 rounded bg-amber-500/10 flex items-center justify-center text-amber-400 font-bold font-mono">01</div>
              <h3 className="text-lg font-bold text-white uppercase">Music Highlights</h3>
              <p className="text-neutral-400 text-xs leading-relaxed">
                The pulse of the show is a soulful Hip-Hop and R&B influence combined with a rustic Folk/Bluegrass vibe, seamlessly illustrating the acoustic meeting of two worlds.
              </p>
            </div>

            <div className="bg-neutral-900/40 p-6 rounded-xl border border-neutral-900 space-y-3 hover:border-amber-500/20 transition-all">
              <div className="w-10 h-10 rounded bg-amber-500/10 flex items-center justify-center text-amber-400 font-bold font-mono">02</div>
              <h3 className="text-lg font-bold text-white uppercase">Racial Tension</h3>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Unspoken boundaries, institutional microaggressions, and the heavy weight of navigating identity in a metropolis that proudly promises belonging but delivers quiet exclusion.
              </p>
            </div>

            <div className="bg-neutral-900/40 p-6 rounded-xl border border-neutral-900 space-y-3 hover:border-amber-500/20 transition-all">
              <div className="w-10 h-10 rounded bg-amber-500/10 flex items-center justify-center text-amber-400 font-bold font-mono">03</div>
              <h3 className="text-lg font-bold text-white uppercase">Social Spheres</h3>
              <p className="text-neutral-400 text-xs leading-relaxed">
                The stark overlap between Hollywood elites, struggling creatives, and highly curated online influencer personas creates a complex social chess board that shapes every exchange.
              </p>
            </div>

            <div className="bg-neutral-900/40 p-6 rounded-xl border border-neutral-900 space-y-3 hover:border-amber-500/20 transition-all">
              <div className="w-10 h-10 rounded bg-amber-500/10 flex items-center justify-center text-amber-400 font-bold font-mono">04</div>
              <h3 className="text-lg font-bold text-white uppercase">Small Towns, Big Dreams</h3>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Meeting judgmental parents, traveling state-to-state, and navigating unaccustomed rural vs urban settings. Characters are forced to unpack pieces of their history they believed were left behind.
              </p>
            </div>

          </div>
        </div>

        {/* BONDS THAT BREAK & BIND (Image 5 Content Integration) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <span className="h-[1px] w-6 bg-amber-400" />
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">Sisterhood & Friendship</span>
            </div>
            <h2 className="text-4xl font-black text-white leading-none uppercase">
              Bonds That <br />Break & Bind
            </h2>
            <p className="text-neutral-300 leading-relaxed text-sm">
              Beneath the heat of the romance is a deeply human portrait of the safe harbors women create for one another when Hollywood threatens to dismantle them.
            </p>

            <div className="space-y-4">
              <div className="border-l-2 border-amber-500/40 pl-4 space-y-1">
                <h4 className="font-bold text-white text-sm">Kehlani & Kaylee</h4>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  As co-workers in a demanding environment, they share an authentic and lived-in friendship. It is a protective, private space where vulnerability can exist completely raw and without social media performance.
                </p>
              </div>

              <div className="border-l-2 border-amber-500/40 pl-4 space-y-1">
                <h4 className="font-bold text-white text-sm">Jackie (The Maternal Anchor)</h4>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  Jackie is Kehlani's hair braider. She embodies the rich history of Black womanhood: offering ritualized healing, shared generational wisdom, and steady, unspoken care while crafting elaborate styles.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive World Atmosphere (Creative Graphic Representation) */}
          <div className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-amber-950/20 p-8 rounded-2xl border border-neutral-800 space-y-6 relative overflow-hidden">
            <span className="absolute top-0 right-0 px-3 py-1 bg-amber-500/20 text-amber-400 font-mono text-[10px] rounded-bl">PAGE 4 // THE WORLD</span>
            <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">TONE & SETTING</h4>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-white">
                <MapPin size={14} className="text-amber-400" />
                <span className="font-bold text-sm">Los Angeles / Franklin Village / Los Feliz</span>
              </div>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Our world breathes with intimate but sweeping, cinematic energy: long structural silences, cozy hand-held closeness, and conversations that comfortably linger long after the immediate punchline.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-800">
              <div className="space-y-1">
                <span className="text-[10px] text-amber-400 uppercase tracking-widest font-mono">Day Look</span>
                <p className="text-neutral-400 text-[11px] leading-relaxed">Humid twilight hanging low, golden dust reflecting off cracked sidewalks under the Hollywood sign.</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-amber-400 uppercase tracking-widest font-mono">Night Vibe</span>
                <p className="text-neutral-400 text-[11px] leading-relaxed">Neon bleeding into concrete, apartments with thin walls and open windows... music drifting out from a basement set.</p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* CHARACTERS DOSSIER SECTION (Images 8, 9, 10 Combined) */}
      <section id="cast" className="py-20 bg-neutral-900/20 border-t border-b border-neutral-900 px-6">
        <div className="max-w-7xl mx-auto space-y-12">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-mono text-amber-500 tracking-wider font-semibold uppercase">The Ensemble</span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase">Central Characters</h2>
            </div>
            <p className="text-neutral-400 text-sm max-w-md">
              A collection of rich, contrasting, and authentic voices fighting to be heard over the noise of their own expectations.
            </p>
          </div>

          {/* Interactive Cast Selector Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {castList.map((char) => (
              <div
                key={char.id}
                onClick={async () => {
                  setActiveCast(char);
                  await logInteraction("Reviewed Cast Profile", { CharacterName: char.name });
                }}
                className="group bg-neutral-900/60 rounded-xl border border-neutral-800 hover:border-amber-500/40 p-6 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between h-80"
              >
                {/* Background Accent glow */}
                <div className={`absolute inset-0 bg-gradient-to-t ${char.accentColor} opacity-20 group-hover:opacity-35 transition-all duration-300 pointer-events-none`} />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 text-[10px] font-bold bg-neutral-950 text-neutral-400 rounded-full border border-neutral-800">
                      {char.castType}
                    </span>
                    <span className="text-xs font-mono text-amber-400 font-bold uppercase">{char.age}</span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">{char.name}</h3>
                    <p className="text-[11px] text-neutral-500 tracking-wider font-mono uppercase">{char.origin} • {char.identity}</p>
                  </div>

                  <p className="text-neutral-400 text-xs line-clamp-3 leading-relaxed">
                    {char.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-800/60 flex items-center justify-between relative z-10">
                  <span className="text-xs text-neutral-500 italic font-medium">"{char.traits}"</span>
                  <span className="text-[11px] text-amber-500 font-bold tracking-wider group-hover:translate-x-1 transition-transform uppercase flex items-center space-x-1">
                    <span>View Dossier</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* VIP GATE / PASSCODE DECK DOWNLOAD PORTAL */}
      <section id="gate" className="py-24 px-6 max-w-4xl mx-auto">
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden space-y-8">

          {/* Decorative Corner Locks */}
          <div className="absolute top-4 left-4 text-neutral-800"><Lock size={16} /></div>
          <div className="absolute top-4 right-4 text-neutral-800"><Lock size={16} /></div>
          <div className="absolute bottom-4 left-4 text-neutral-800"><Lock size={16} /></div>
          <div className="absolute bottom-4 right-4 text-neutral-800"><Lock size={16} /></div>

          <div className="max-w-xl mx-auto space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 mb-2">
              {isAuthorized ? <Unlock size={24} /> : <Lock size={24} />}
            </div>

            <h2 className="text-3xl font-extrabold text-white uppercase tracking-tight">
              {isAuthorized ? "You are inside the VIP Vault" : "VIP Creative Portal Access"}
            </h2>

            <p className="text-neutral-400 text-sm leading-relaxed">
              {isAuthorized
                ? `Welcome, authorized portal session is registered. We have established secure syncing links to track review statuses.`
                : "To protect the creative intellectual property, full screenplay drafts, character metrics, and premium premiere episodes are locked behind a production passcode."}
            </p>
          </div>

          {!isAuthorized ? (
            <div className="max-w-md mx-auto space-y-6">

              {!showRegForm ? (
                <div className="space-y-4">
                  {/* Password Entry */}
                  <form onSubmit={handlePasscodeSubmit} className="space-y-2">
                    <div className="flex gap-2 bg-neutral-950 p-1.5 rounded-lg border border-neutral-800 focus-within:border-amber-500/40">
                      <input
                        type="password"
                        placeholder="Enter Passcode (e.g. UNDONELA)"
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value)}
                        className="flex-1 bg-transparent px-3 py-2 text-sm text-white focus:outline-none placeholder:text-neutral-600 font-mono tracking-widest text-center"
                      />
                      <button
                        type="submit"
                        className="bg-amber-400 hover:bg-amber-300 text-black px-6 py-2 rounded text-xs font-bold uppercase transition-all"
                      >
                        Unlock
                      </button>
                    </div>
                  </form>

                  <div className="text-xs text-neutral-500">
                    Or configure a temporary{' '}
                    <button
                      onClick={() => setShowRegForm(true)}
                      className="text-amber-400 hover:underline font-bold"
                    >
                      Executive View Pass
                    </button>
                  </div>
                </div>
              ) : (
                /* Dynamic Registration Form */
                <form onSubmit={handleExecutiveRegistration} className="space-y-3 text-left bg-neutral-950 p-6 rounded-xl border border-neutral-850">
                  <h3 className="text-xs font-mono font-bold uppercase text-amber-400 tracking-wider">Configure Executive badge</h3>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-neutral-500 uppercase">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Amanda Sterling"
                      value={regForm.name}
                      onChange={(e) => setRegForm({...regForm, name: e.target.value})}
                      className="w-full bg-neutral-900 px-3 py-2 rounded border border-neutral-800 text-xs focus:outline-none focus:border-amber-500/40 placeholder:text-neutral-700"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-neutral-500 uppercase">Title</label>
                      <input
                        type="text"
                        placeholder="e.g. VP Creative Development"
                        value={regForm.title}
                        onChange={(e) => setRegForm({...regForm, title: e.target.value})}
                        className="w-full bg-neutral-900 px-3 py-2 rounded border border-neutral-800 text-xs focus:outline-none focus:border-amber-500/40 placeholder:text-neutral-700"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-neutral-500 uppercase">Company/Agency</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Netflix"
                        value={regForm.company}
                        onChange={(e) => setRegForm({...regForm, company: e.target.value})}
                        className="w-full bg-neutral-900 px-3 py-2 rounded border border-neutral-800 text-xs focus:outline-none focus:border-amber-500/40 placeholder:text-neutral-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 pb-2">
                    <label className="text-[10px] font-mono text-neutral-500 uppercase">Corporate Email</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. amanda.sterling@netflix.com"
                      value={regForm.email}
                      onChange={(e) => setRegForm({...regForm, email: e.target.value})}
                      className="w-full bg-neutral-900 px-3 py-2 rounded border border-neutral-800 text-xs focus:outline-none focus:border-amber-500/40 placeholder:text-neutral-700"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-amber-400 hover:bg-amber-300 text-black py-2 rounded font-bold text-xs uppercase tracking-wider transition-all"
                    >
                      {isSubmitting ? "Generating..." : "Generate Pass"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowRegForm(false)}
                      className="px-4 py-2 bg-neutral-900 hover:bg-neutral-850 text-neutral-400 border border-neutral-800 rounded text-xs uppercase"
                    >
                      Back
                    </button>
                  </div>
                </form>
              )}

              {authError && (
                <p className="text-red-400 text-xs font-semibold bg-red-500/10 p-2.5 rounded border border-red-500/20">
                  {authError}
                </p>
              )}

              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-neutral-800"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-neutral-900 px-3 text-neutral-500 font-bold">Request General Access</span>
                </div>
              </div>

              {/* Request form */}
              <form onSubmit={handleRequestAccess} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Enter professional email address"
                    required
                    value={requestAccessEmail}
                    onChange={(e) => setRequestAccessEmail(e.target.value)}
                    className="flex-1 bg-neutral-950 px-4 py-2.5 rounded-lg border border-neutral-800 text-sm focus:outline-none focus:border-amber-500/40"
                  />
                  <button
                    type="submit"
                    className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-5 py-2.5 rounded-lg text-xs font-bold uppercase transition-all"
                  >
                    Request Credentials
                  </button>
                </div>
                {requestSubmitted && (
                  <p className="text-emerald-400 text-xs font-semibold bg-emerald-500/10 p-2.5 rounded border border-emerald-500/20 text-left">
                    {requestSubmitted}
                  </p>
                )}
              </form>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-6 text-left">

              {executiveProfile.name && (
                <div className="p-4 bg-amber-400/10 border border-amber-400/20 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-amber-400 tracking-widest font-bold">VIP ASSIGNED CREDENTIAL</span>
                    <h4 className="text-sm font-bold text-white uppercase">{executiveProfile.name}</h4>
                    <p className="text-xs text-neutral-400">{executiveProfile.title} at {executiveProfile.company}</p>
                  </div>
                  <span className="px-2.5 py-1 bg-neutral-950 text-emerald-400 rounded-md border border-emerald-500/20 font-mono text-[10px] uppercase font-bold tracking-wider">
                    DATABASE SYNCED
                  </span>
                </div>
              )}

              {authSuccess && (
                <p className="text-emerald-400 text-xs font-semibold bg-emerald-500/10 p-2.5 rounded border border-emerald-500/20 inline-block">
                  {authSuccess}
                </p>
              )}

              {/* VIP PITCH DOWNLOADS CONTAINER */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">

                <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800 flex flex-col justify-between h-44">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-semibold">Ready for review</span>
                    <h4 className="text-sm font-bold text-white uppercase">One-Sheet Handout</h4>
                    <p className="text-neutral-500 text-xs line-clamp-2">High-level sales presentation with contact information.</p>
                  </div>
                  <button
                    onClick={() => triggerDocumentView('onesheet')}
                    className="w-full mt-4 flex items-center justify-center space-x-1.5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-white py-2 rounded text-xs font-bold transition-all"
                  >
                    <BookOpen size={12} />
                    <span>View Handout</span>
                  </button>
                </div>

                <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800 flex flex-col justify-between h-44">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-semibold">Series Core</span>
                    <h4 className="text-sm font-bold text-white uppercase">Series bible</h4>
                    <p className="text-neutral-500 text-xs line-clamp-2">Complete multi-season arc, pilot summary, and structural bible.</p>
                  </div>
                  <button
                    onClick={() => triggerDocumentView('bible')}
                    className="w-full mt-4 flex items-center justify-center space-x-1.5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-white py-2 rounded text-xs font-bold transition-all"
                  >
                    <BookOpen size={12} />
                    <span>View Bible</span>
                  </button>
                </div>

                <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800 flex flex-col justify-between h-44">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-semibold">Full Screenplay</span>
                    <h4 className="text-sm font-bold text-white uppercase">Pilot Script (PDF)</h4>
                    <p className="text-neutral-500 text-xs line-clamp-2">The complete 60-page network draft of the pilot episode.</p>
                  </div>
                  <button
                    onClick={() => triggerDocumentView('script')}
                    className="w-full mt-4 flex items-center justify-center space-x-1.5 bg-amber-400 hover:bg-amber-300 text-black py-2 rounded text-xs font-bold transition-all"
                  >
                    <FileText size={12} />
                    <span>Read Script</span>
                  </button>
                </div>

              </div>

              {/* PREMIUM EPISODE 1 LINK */}
              <div className="bg-neutral-950 p-6 rounded-xl border border-amber-500/20 text-left flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">Premium Premiere</span>
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase">Watch Episode 1 “The Party”</h3>
                  <p className="text-neutral-400 text-xs max-w-xl">
                    View the fully produced 45-minute festival cut of the pilot episode. Encrypted with secure player credentials to avoid unauthorized copies.
                  </p>
                </div>

                <button
                  onClick={() => triggerStreamVideo('ep1')}
                  className="bg-white text-black hover:bg-neutral-200 px-6 py-3 rounded font-bold text-xs uppercase transition-all whitespace-nowrap self-start md:self-auto flex items-center space-x-1.5"
                >
                  <Play size={12} fill="currentColor" />
                  <span>Stream Cut</span>
                </button>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <button
                  onClick={() => {
                    setIsAuthorized(false);
                    setIsAdmin(false);
                    setExecutiveProfile({ name: '', company: '', title: '', email: '' });
                    if (user) {
                      sessionStorage.removeItem(`undone_exec_profile_${user.uid}`);
                      sessionStorage.removeItem(`undone_unlocked_pass_${user.uid}`);
                    }
                  }}
                  className="text-xs text-neutral-500 hover:text-red-400 underline transition-colors"
                >
                  Logout / Relock Vault Session
                </button>

                {!isAdmin && (
                  <form onSubmit={toggleAdminAuth} className="flex gap-2 items-center">
                    <input
                      type="password"
                      placeholder="Admin Code"
                      value={adminPasscode}
                      onChange={(e) => setAdminPasscode(e.target.value)}
                      className="bg-neutral-950 px-2.5 py-1 text-[11px] font-mono text-center rounded border border-neutral-850 focus:outline-none focus:border-amber-500/40 text-neutral-400"
                    />
                    <button type="submit" className="px-2.5 py-1 bg-neutral-900 text-[10px] font-bold uppercase hover:bg-neutral-800 text-neutral-300 rounded border border-neutral-800">
                      Sync Console
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* SONIC UNIVERSE MOODBOARD & AUDIO LAYER (Image 7 LOOK & FEEL) */}
      <section id="media" className="py-20 bg-neutral-950 border-t border-neutral-900 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono text-amber-500 tracking-wider font-semibold uppercase">The Soundscape</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase">THE LOOK & FEEL</h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Contrasting worlds aren’t just written; they are heard. The audio direction mirrors our leads' internal states. Experience the tension and emotional depth through these simulated soundtrack movements.
            </p>

            {/* Audio Track List Simulation */}
            <div className="space-y-3">
              {soundtrackTracks.map((track, idx) => (
                <div
                  key={idx}
                  onClick={async () => {
                    setActiveMoodTrack(idx);
                    await logInteraction("Played Music Track", { trackTitle: track.title });
                  }}
                  className={`p-3.5 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${activeMoodTrack === idx ? 'bg-amber-400/10 border-amber-400/40' : 'bg-neutral-900/40 border-neutral-900 hover:border-neutral-800'}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeMoodTrack === idx ? 'bg-amber-400 text-black' : 'bg-neutral-950 text-neutral-500'}`}>
                      {activeMoodTrack === idx ? <Volume2 size={14} /> : <Music size={14} />}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase">{track.title}</h4>
                      <p className="text-[10px] text-neutral-500 font-mono">{track.genre} • {track.artist}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-neutral-500">{track.dur}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 bg-neutral-900/40 p-8 rounded-2xl border border-neutral-900">
            <h3 className="text-xs font-mono text-amber-500 uppercase tracking-widest font-semibold">Visual Influence Notes</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
                <span className="text-[10px] font-bold text-amber-400 tracking-wider font-mono uppercase">SWARM & EUPHORIA</span>
                <p className="text-neutral-400 text-[11px] leading-relaxed">
                  Deep, striking neon gradients, bold film grain, slow close-up tracking shots, and fluid, dreamlike camera transitions that evoke intimacy.
                </p>
              </div>

              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
                <span className="text-[10px] font-bold text-amber-400 tracking-wider font-mono uppercase">INSECURE & ATLANTA</span>
                <p className="text-neutral-400 text-[11px] leading-relaxed">
                  Grounded comedy-drama atmosphere, highly specific urban subcultures, and sharp, witty banter that feels exceptionally natural.
                </p>
              </div>
            </div>

            {/* Simulated Pitch Deck Card Flip Slider */}
            <div className="pt-4 border-t border-neutral-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-neutral-500 uppercase">Pitch Deck Slide Preview</span>
                <span className="text-xs font-mono text-amber-400 font-bold">{currentSlide + 1} / {pitchSlides.length}</span>
              </div>

              <div
                style={{ background: pitchSlides[currentSlide].bg }}
                className="p-6 rounded-xl border border-neutral-800 space-y-3 transition-all duration-300 h-44 flex flex-col justify-center"
              >
                <span className="text-[10px] uppercase tracking-widest font-bold text-amber-400 font-mono">{pitchSlides[currentSlide].subtitle}</span>
                <h4 className="text-lg font-bold text-white uppercase tracking-tight">{pitchSlides[currentSlide].title}</h4>
                <p className="text-neutral-400 text-xs leading-relaxed line-clamp-3">{pitchSlides[currentSlide].content}</p>
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={async () => {
                    const next = currentSlide > 0 ? currentSlide - 1 : pitchSlides.length - 1;
                    setCurrentSlide(next);
                    await logInteraction("Flipped Slide", { slideName: pitchSlides[next].title });
                  }}
                  className="p-1.5 rounded bg-neutral-950 hover:bg-neutral-850 text-neutral-400 border border-neutral-800"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={async () => {
                    const next = currentSlide < pitchSlides.length - 1 ? currentSlide + 1 : 0;
                    setCurrentSlide(next);
                    await logInteraction("Flipped Slide", { slideName: pitchSlides[next].title });
                  }}
                  className="p-1.5 rounded bg-neutral-950 hover:bg-neutral-850 text-neutral-400 border border-neutral-800"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* CREATOR BIO & CONTACT FORM */}
      <section className="py-20 bg-neutral-950 px-6 border-t border-neutral-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono text-amber-500 tracking-wider font-semibold uppercase">The Team</span>
            <h2 className="text-3xl font-extrabold text-white uppercase tracking-tight">CREATOR BIO</h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              UNDONE is spearheaded by a passionate collective of LA-based female creatives dedicated to delivering bold, unapologetic narratives with comedic relief and profound emotional authenticity. Built in association with Beartiger Productions, the project highlights representation, complexity, and intersectionality.
            </p>

            <div className="bg-neutral-900/40 p-5 rounded-xl border border-neutral-900 space-y-3">
              <span className="text-[10px] font-bold text-amber-400 font-mono tracking-widest uppercase">Rights & Development</span>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                © 2026 Beartiger Productions. All rights reserved. Registered with WGA West. Fully packaged pilot script, treatment deck, and budget outline ready upon request.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-neutral-900/20 p-8 rounded-2xl border border-neutral-900 space-y-6">
            <h3 className="text-lg font-bold text-white uppercase tracking-tight">Inquire or Schedule Call</h3>

            {contactSubmitted ? (
              <div className="bg-emerald-500/10 p-6 rounded-xl border border-emerald-500/20 text-center space-y-3 animate-fadeIn">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle size={20} />
                </div>
                <h4 className="font-bold text-white text-sm">Offer Received & Synced</h4>
                <p className="text-neutral-400 text-xs">
                  Your pitch query has been safely written to our secure partner database. A coordinator will reach back to establish a call.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      className="w-full bg-neutral-950 px-4 py-2.5 rounded-lg border border-neutral-800 text-sm focus:outline-none focus:border-amber-500/40 placeholder:text-neutral-700"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Company / Agency</label>
                    <input
                      type="text"
                      placeholder="e.g. Netflix / CAA / Independent"
                      value={contactForm.company}
                      onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
                      className="w-full bg-neutral-950 px-4 py-2.5 rounded-lg border border-neutral-800 text-sm focus:outline-none focus:border-amber-500/40 placeholder:text-neutral-700"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. sarah@agency.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className="w-full bg-neutral-950 px-4 py-2.5 rounded-lg border border-neutral-800 text-sm focus:outline-none focus:border-amber-500/40 placeholder:text-neutral-700"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Inquire about distribution, script options, meeting dates..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    className="w-full bg-neutral-950 px-4 py-2.5 rounded-lg border border-neutral-800 text-sm focus:outline-none focus:border-amber-500/40 placeholder:text-neutral-700"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-amber-400 hover:bg-amber-300 text-black py-3 rounded text-xs font-bold uppercase tracking-wider transition-all"
                >
                  {isSubmitting ? "Syncing Offer..." : "Send & Sync Offer"}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-neutral-950 border-t border-neutral-900 px-6 text-center text-neutral-500 text-xs space-y-3">
        <p className="font-mono">© 2026 BEARTIGER PRODUCTIONS. ALL RIGHTS RESERVED.</p>
        <p className="text-[11px] max-w-md mx-auto leading-relaxed mb-4">
          For physical screening copies or agency calls, contact our production representative directly. Registered with WGA West.
        </p>

        {/* hidden admin gate link */}
        <div className="pt-4 flex justify-center">
          <button
            onClick={() => {
              const code = prompt("Enter Administrative Console Key:");
              if (code && code.trim().toUpperCase() === SECRET_ADMIN_PASSCODE) {
                setIsAdmin(true);
              } else if (code) {
                alert("Unauthorized Access Attempt Blocked.");
              }
            }}
            className="text-[10px] text-neutral-800 hover:text-amber-500/30 transition-all font-mono uppercase tracking-widest"
          >
            Terminal Portal
          </button>
        </div>
      </footer>

      {/* --- POPUP / MODALS SYSTEM --- */}

      {/* 1. CAST PROFILE DOSSIER POPUP */}
      {activeCast && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 max-w-2xl w-full rounded-2xl overflow-hidden relative shadow-2xl">
            <button
              onClick={() => setActiveCast(null)}
              className="absolute top-4 right-4 p-2 bg-neutral-950/60 hover:bg-neutral-850 rounded-full text-neutral-400 transition-colors z-20"
            >
              <X size={16} />
            </button>

            {/* Accent Banner */}
            <div className={`h-3 w-full bg-gradient-to-r ${activeCast.accentColor}`} />

            <div className="p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-neutral-800 pb-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest font-bold">{activeCast.origin}</span>
                  <h3 className="text-3xl font-extrabold text-white uppercase">{activeCast.name}</h3>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 bg-neutral-950 border border-neutral-800 rounded-full text-xs text-neutral-400 font-semibold inline-block">
                    {activeCast.castType}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-neutral-500 uppercase">Core Persona</span>
                    <p className="text-white font-semibold">{activeCast.traits}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-neutral-500 uppercase">Demographics</span>
                    <p className="text-neutral-300">{activeCast.identity} • Age {activeCast.age}</p>
                  </div>
                </div>

                <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
                  <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest font-bold">Key Statement</span>
                  <p className="text-neutral-300 italic text-xs leading-relaxed">
                    {activeCast.quote}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono text-neutral-500 uppercase">Series Role & Narrative Arc</span>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  {activeCast.description}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800 text-center">
                <button
                  onClick={() => setActiveCast(null)}
                  className="px-6 py-2 bg-neutral-950 hover:bg-neutral-850 text-neutral-400 border border-neutral-850 rounded text-xs uppercase transition-colors"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. VIDEO STREAM PLAYER BOX (WITH DRM-LIKE WATERMARKING & CONTEXT LOCKS) */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-4xl w-full space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                <h3 className="text-sm font-bold tracking-wider text-white uppercase">
                  {activeVideo === 'teaser' && "Teaser Trailer"}
                  {activeVideo === 'bts' && "Behind-The-Scenes Cut"}
                  {activeVideo === 'ep1' && "Episode 1 'The Party' (Confidential Stream)"}
                </h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="flex items-center space-x-1 px-3 py-1 bg-neutral-900 hover:bg-neutral-800 text-xs text-neutral-400 rounded-full border border-neutral-800 transition-colors"
              >
                <X size={12} />
                <span>Close Player</span>
              </button>
            </div>

            {/* Secure Player Frame */}
            <div className="secure-video-wrapper relative aspect-video bg-neutral-950 rounded-2xl border border-neutral-800 overflow-hidden flex items-center justify-center group shadow-2xl">

              {/* Floating translucent watermark overlay over screen block to mimic professional pitch vaults */}
              <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-8 text-neutral-500/25 select-none font-mono text-[10px] sm:text-xs">
                <div className="flex justify-between">
                  <span>PITCH PREVIEW ONLY</span>
                  <span>CONFIDENTIAL</span>
                </div>
                <div className="text-center text-xs tracking-[0.2em] transform rotate-[-12deg] text-amber-500/10 font-bold uppercase py-24">
                  BEARTIGER PRODUCTIONS PROPERTY • DO NOT DISTRIBUTE OR DOWNLOAD
                </div>
                <div className="flex justify-between">
                  <span>WGAW REGISTERED</span>
                  <span>PREVIEW ID: UND-2026-X</span>
                </div>
              </div>

              {/* Video Simulated Element */}
              <div className="absolute inset-0 bg-gradient-to-tr from-neutral-950 to-neutral-900 flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-amber-400 border border-white/10 animate-pulse">
                  <Film size={28} />
                </div>

                <div className="space-y-2 max-w-md">
                  <h4 className="text-white font-bold text-sm">SECURED STREAM SCREENER</h4>
                  <p className="text-neutral-500 text-xs leading-relaxed">
                    Industry standard screen protection active. Right-click, picture-in-picture, and network extraction modules have been disabled for security.
                  </p>
                </div>

                <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-850 text-neutral-400 font-mono text-[11px] max-w-md flex items-center space-x-2">
                  <ShieldAlert size={14} className="text-amber-500" />
                  <span>Playback stream logs with your credential signature.</span>
                </div>
              </div>

            </div>

            <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 text-neutral-400 text-xs flex items-center justify-between">
              <span>Press ESC to exit stream sandbox.</span>
              <span className="font-mono text-[10px] text-amber-500">SECURE SOURCE V.1</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. SCREENPLAY & DOCUMENT PREVIEW SANDBOX MODAL */}
      {activeDocument && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-3xl w-full my-8 space-y-4">

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText size={16} className="text-amber-400" />
                <h3 className="text-sm font-bold text-white uppercase">
                  {activeDocument === 'script' && "UNDONE - Pilot Draft Screenplay"}
                  {activeDocument === 'bible' && "UNDONE - Pitch Treatment & Series Bible"}
                  {activeDocument === 'onesheet' && "UNDONE - Executive Summary"}
                </h3>
              </div>
              <button
                onClick={() => setActiveDocument(null)}
                className="flex items-center space-x-1 px-3 py-1 bg-neutral-900 hover:bg-neutral-800 text-xs text-neutral-400 rounded-full border border-neutral-800 transition-colors"
              >
                <X size={12} />
                <span>Close Document</span>
              </button>
            </div>

            {/* Document page look-alike sandbox */}
            <div className="bg-white text-black p-8 md:p-12 rounded-2xl border border-neutral-800 relative shadow-2xl min-h-[600px] flex flex-col justify-between font-serif overflow-hidden">

              {/* diagonal subtle watermark */}
              <div className="absolute inset-0 z-10 pointer-events-none select-none flex items-center justify-center opacity-[0.05] text-neutral-900 text-4xl font-mono uppercase tracking-[0.3em] font-black rotate-[-30deg]">
                CONFIDENTIAL • PITCH PREVIEW
              </div>

              {/* Screenplay Courier layout container */}
              <div className="space-y-6 relative z-20 font-mono text-sm leading-relaxed text-neutral-900 max-w-xl mx-auto">

                {activeDocument === 'script' && (
                  <>
                    <div className="text-center pt-12 space-y-4">
                      <h1 className="text-3xl font-bold tracking-widest uppercase">U N D O N E</h1>
                      <p className="text-xs">Written by</p>
                      <p className="font-semibold text-xs">Beartiger Creative Group</p>
                      <div className="h-[1px] w-20 bg-neutral-300 mx-auto" />
                      <p className="text-xs">Based on "LOVE. LUST. LA."</p>
                    </div>

                    <div className="pt-12 space-y-4 text-xs">
                      <p className="font-bold">FADE IN:</p>

                      <div className="space-y-2">
                        <p className="font-bold">EXT. HOLLYWOOD HILLS - TWILIGHT</p>
                        <p>The sky is an bruised plum color. Humid twilight clings to the hills under the Hollywood Sign. Neon gradients bleed softly into the cracked gray sidewalks.</p>
                      </div>

                      <div className="space-y-2">
                        <p>KEHLANI (27), sharp, wearing a paint-spattered vintage denim jacket, sits on the edge of an old brick planter. She focuses her camera.</p>
                      </div>

                      <div className="pl-24 pr-12 space-y-1">
                        <p className="font-bold">KEHLANI</p>
                        <p className="italic">(to herself)</p>
                        <p>Just stay still. Don't try to look like a tourist.</p>
                      </div>

                      <p className="text-neutral-400 italic text-center text-[11px] pt-8">[ Document sandbox preview active. Request full PDF download to read the complete draft. ]</p>
                    </div>
                  </>
                )}

                {activeDocument === 'bible' && (
                  <div className="space-y-4 font-sans text-xs text-neutral-855">
                    <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-tight">SERIES LOGISTICAL BLUEPRINT</h2>
                    <p className="text-neutral-700 leading-relaxed">
                      <strong>Format:</strong> 10-Episode Limited Comedy-Drama Series (45-Minute Chapters)
                    </p>
                    <p className="text-neutral-700 leading-relaxed">
                      <strong>Tone Focus:</strong> Intimacy, character-driven dialogues, and authentic comedic beats contrasting with social commentaries about class divides in the modern age.
                    </p>
                    <p className="text-neutral-700 leading-relaxed">
                      <strong>Production Outline:</strong> Crafted to leverage gorgeous, natural LA environments (Los Feliz, Franklin Village, Griffith Park) to maximize premium production value while maintaining highly cost-efficient footprint.
                    </p>
                  </div>
                )}

                {activeDocument === 'onesheet' && (
                  <div className="space-y-4 font-sans text-xs text-neutral-855">
                    <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-tight">EXECUTIVE BRIEF</h2>
                    <p className="text-neutral-700 leading-relaxed">
                      "UNDONE" represents a highly commercial but critically competitive project ready for development. It features a complete pilot draft, comprehensive series arc bible, and complete aesthetic packaging.
                    </p>
                    <p className="text-neutral-700 leading-relaxed">
                      <strong>Target Demographics:</strong> Adults 18-34, fans of emotional, visually expressive, and culturally diverse premium drama.
                    </p>
                  </div>
                )}

              </div>

              {/* Watermarked footer info */}
              <div className="pt-8 border-t border-neutral-200 text-center font-mono text-[9px] text-neutral-400 relative z-20">
                WGA WEST REGISTERED PREVIEW • PROPERTY OF BEARTIGER PRODUCTIONS © 2026
              </div>

            </div>

            {/* Simulated Watermark info alert */}
            <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 text-neutral-400 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-amber-400">
                <ShieldAlert size={16} />
                <span>Watermark Protection Overlay is active.</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] bg-neutral-950 px-2 py-1 rounded text-neutral-500 font-mono">SECURE READER v1.4</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
