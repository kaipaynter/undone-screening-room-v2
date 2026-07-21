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

To ensure all live links, inline viewers, and document download pathways function correctly, maintain the following file structure for this repository:

```text
undone-screening-room-v2/
├── public/
│   ├── key_artwork.jpg
│   ├── kai_paynter_v3.jpg
│   ├── undone_creator_bio.pdf
│   ├── undone_one_sheet.pdf
│   └── undone_series_bible.pdf
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── components/
│   ├── constants/
│   └── hooks/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```


# 🚀 Local Development Setup

This application is built as a single-page React application using Vite, Tailwind CSS, and Lucide React icons.

## 1. Installation

Clone the repository and install the development dependencies:

### Clone the repository
git clone [https://github.com/your-username/undone-pitch-portal.git](https://github.com/your-username/undone-pitch-portal.git)

cd undone-pitch-portal

### Install dependencies
npm install


## 2. Configure Supabase Environment Variables

Create a local `.env` file in the repository root with your Supabase application values:

```env
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

## 3. Run the Development Server

Boot up Vite's local hot-reloading server:

npm run dev


Open http://localhost:5173 in your browser to test.

## 3. Production Build

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