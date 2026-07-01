UNDONE — Executive TV Pitch Portal

An elegant, secure, and executive-facing single-page pitch portal designed for UNDONE, a premium Romantic Drama television series created by BearTiger Productions. This portal offers network executives, stakeholders, and festival coordinators instant, passcode-protected access to proprietary creative assets, screener cuts, visual decks, and production outlines.

🎨 Creative Overview

Title: UNDONE

Genre: Romantic Drama

Setting: Modern-day Hollywood, CA / Los Angeles, CA

Tone Reference: The intimate realism of Netflix’s Love + the emotional excavation of Hulu’s Normal People + the cultural sharpness of HBO’s Insecure.

Logline: An All-American boy falls fast in La La Land but can their spark bridge their worlds?

🔐 Security & Access Control

To protect proprietary materials, selected high-value assets are locked behind an inline gatekeeper modal.

Session Persistence: Sessions remain unlocked for the duration of the browser tab's life using sessionStorage tracking.

Locked Materials: Teaser Trailer, Series Bible, Pitch Deck, Screenplay Pilot Script, and Episode 1A/1B Screener Cuts.

Public Materials: Behind-the-Scenes (BTS) Trailer, Project One-sheet, and Creator Biography.

📁 Repository Directory Checklist

To ensure all live links, inline viewers, and document download pathways function correctly, your deployment directory must maintain the following file structures:

undone-pitch-portal/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   ├── key_artwork.jpg            <-- Cinematic homepage art card background
│   ├── kai_paynter_v2.jpg         <-- Creator headshot (used in Biography modal)
│   ├── undone_creator_bio.pdf     <-- Downloadable creator CV
│   ├── undone_series_bible.pdf    <-- Full series bible PDF package
│   └── undone_one_sheet.pdf       <-- Official logline & synopsis overview PDF
└── src/
    ├── main.jsx
    ├── App.jsx                    <-- Main React code (pitch_website.jsx)
    └── index.css                  <-- Tailwind directive file with noise textures


🚀 Local Development Setup

This application is built as a single-file React component using Vite, Tailwind CSS, and Lucide React icons.

1. Installation

Clone the repository and install the development dependencies:

# Clone the repository
git clone [https://github.com/your-username/undone-pitch-portal.git](https://github.com/your-username/undone-pitch-portal.git)
cd undone-pitch-portal

# Install dependencies
npm install


2. Run the Development Server

Boot up Vite's local hot-reloading server:

npm run dev


Open http://localhost:5173 in your browser to test.

3. Production Build

Prepare a fully optimized production package for server hosting:

npm run build


🌐 Deployment (Vercel, Netlify, or GH Pages)

This portal is fully optimized for Vercel serverless environments:

Connect your GitHub repository to Vercel.

Select Vite as the framework preset.

Ensure that your static assets in /public are pushed to your remote origin branch.

Click Deploy, and Vercel will have your secure executive gateway live in seconds.

📄 Legal & Rights Reserved

All content, conceptual structures, logs, screenplays, and audio-visual previews contained within this portal are the sole creative property of BearTiger Productions.

WGA West Registration Number: 2342916

Inquiries: contact@beartigerproductions.com