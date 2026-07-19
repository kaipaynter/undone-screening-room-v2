/**
 * Content Configuration
 * Centralized static content, mapping, and asset data
 */

/**
 * Video source mapping
 * Maps video keys to their streaming sources
 * (Handles 403 blocks with secure preview frames for Google Drive content)
 */
export const VIDEO_SOURCES = {
  ep1: 'https://drive.google.com/file/d/1Hj2uYR08gOQC0pzD354RNvhe08OpNxZf/preview',
  ep1b: 'https://drive.google.com/file/d/11eS4xg933pewfrXYwRc0gvOo1rQ6g_79/preview',
  teaser: 'https://assets.mixkit.co/videos/preview/mixkit-city-lights-at-night-with-neon-signs-and-traffic-42999-large.mp4',
  bts: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-director-holding-a-movie-clapperboard-42993-large.mp4',
};

/**
 * Get video source by key
 * Safely returns video URL or empty string if key is invalid
 */
export const getVideoSource = (videoKey) => {
  if (!videoKey || typeof videoKey !== 'string') {
    console.warn('[ContentConfig] Invalid video key:', videoKey);
    return '';
  }

  const source = VIDEO_SOURCES[videoKey];
  if (!source) {
    console.warn('[ContentConfig] Unknown video key:', videoKey);
    return '';
  }

  return source;
};

/**
 * Pitch Deck slides data structure
 */
export const PITCH_DECK_SLIDES = [
  {
    title: 'UNDONE',
    subtitle: 'A Romantic Drama Series',
    content:
      'In modern-day Los Angeles, Kehlani, a guarded artist, and Jake, an aspiring musician, fall hard and fast. But when family expectations, cultural differences, and unresolved trauma begin to surface, they must decide whether their connection is strong enough to bridge the worlds that shaped them.',
    isItalic: true,
    meta: 'Slide 1: Title & Concept',
  },
  {
    title: 'Core Conflict',
    subtitle: 'Where Worlds Collide',
    content:
      'The characters are forced to confront inherited biases, family expectations, trauma, belonging, career and identity.',
    meta: 'Slide 2: Dynamic',
  },
  {
    title: 'Tone & Style',
    subtitle: 'Raw & Intimate',
    content:
      'Contrasting sweeping, warm and cool cinematography with hand-held close-ups. A sonic palette merging alternative R&B with rustic indie-folk music.',
    meta: 'Slide 3: Aesthetic',
  },
  {
    title: 'Production Strategy',
    subtitle: 'High Value, Low Footprint',
    content:
      'Leveraging authentic, visually rich Los Angeles locations (Los Feliz, Franklin Village) to capture high-production value efficiently.',
    meta: 'Slide 4: Logistical Blueprint',
  },
];

/**
 * Portal asset metadata and descriptions
 */
export const PORTAL_ASSETS = {
  // Videos
  teaser: {
    type: 'video',
    title: 'Watch Teaser Trailer',
    description: '2:30 minute promotional trailer',
    isLocked: true,
    icon: 'Play',
  },
  bts: {
    type: 'video',
    title: 'Watch BTS Trailer',
    description: 'Interviews, concepts, and prep',
    isLocked: false,
    accessLabel: 'Public Access',
    icon: 'Film',
  },
  ep1: {
    type: 'video',
    title: 'Episode 1A "The Party"',
    description: '45 minute stakeholder review cut',
    isLocked: true,
    icon: 'Tv',
  },
  ep1b: {
    type: 'video',
    title: 'Episode 1B "The Party"',
    description: '45 minute festival premier cut',
    isLocked: true,
    icon: 'Tv',
  },

  // Documents
  bible: {
    type: 'document',
    title: 'View Series Bible',
    description: 'Multi-season design & episode summaries',
    isLocked: true,
    icon: 'BookOpen',
  },
  onesheet: {
    type: 'document',
    title: 'View One-sheet',
    description: 'Logistical index & summary snapshot',
    isLocked: false,
    accessLabel: 'Public Access',
    icon: 'FileText',
  },
  deck: {
    type: 'document',
    title: 'View Pitch Deck',
    description: 'Aesthetic presentation & project overview',
    isLocked: true,
    icon: 'BookOpen',
  },
  colorMockups: {
    type: 'document',
    title: 'Miscellaneous',
    description: 'Additional content and information',
    isLocked: true,
    pdfPath: '/undone_mockups.pdf',
    icon: 'BookOpen',
  },
  script: {
    type: 'document',
    title: 'Read Pilot Script',
    description: 'Standard 60-page network outline',
    isLocked: true,
    icon: 'FileText',
  },
  bio: {
    type: 'document',
    title: 'Creator Biography',
    description: 'Professional background and credentials',
    isLocked: false,
    accessLabel: 'Public Access',
    icon: 'FileText',
  },
};

/**
 * Asset order for rendering the link tree
 */
export const ASSET_ORDER = [
  'teaser',
  'bts',
  'bible',
  'onesheet',
  'deck',
  'ep1',
  'ep1b',
  'script',
  'bio',
  'colorMockups',
];
