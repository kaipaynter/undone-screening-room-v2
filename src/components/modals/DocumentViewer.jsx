import React, { useState } from 'react';
import { X, Download, FileText } from 'lucide-react';
import { PITCH_DECK_SLIDES } from '../../constants/contentConfig';

/**
 * DocumentViewer Modal
 * Displays different document types: script, deck, bible, onesheet, bio
 */
export const DocumentViewer = ({ activeDocument, onClose }) => {
  const [deckPage, setDeckPage] = useState(0);
  const [portraitError, setPortraitError] = useState(false);

  if (!activeDocument) return null;

  const getDocumentLabel = (docType) => {
    const labels = {
      script: 'SCREENPLAY PROOF',
      deck: 'INTERACTIVE DECK',
      colorMockups: 'COLOR PALETTE & MOCKUPS | VISUAL TREATMENT',
      bible: 'SERIES BIBLE EXTRACT | UNDONE • ROMANTIC DRAMA',
      onesheet: 'EXECUTIVE SUMMARY',
      bio: 'CREATOR BIO DOCUMENT',
    };
    return labels[docType] || 'DOCUMENT';
  };

  return (
    <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md overflow-y-auto flex justify-center items-start p-4 md:p-6">
      <div className="max-w-4xl w-full my-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase bg-neutral-900 px-3 py-1 text-amber-400 rounded-full border border-neutral-800">
            {getDocumentLabel(activeDocument)}
          </span>
          <button
            onClick={onClose}
            className="flex items-center space-x-1 px-3 py-1 bg-neutral-900 hover:bg-neutral-850 text-xs text-neutral-400 rounded-full border border-neutral-800 transition-colors"
          >
            <X size={12} />
            <span>Close Material</span>
          </button>
        </div>

        {/* Document content container */}
        <div className="bg-white text-black p-8 md:p-12 rounded-xl relative shadow-2xl min-h-[500px] flex flex-col justify-between font-serif overflow-hidden select-text">
          <div className="space-y-6 max-w-3xl mx-auto text-neutral-950 font-mono text-xs md:text-sm w-full">
            {/* Script Viewer */}
            {activeDocument === 'script' && (
              <ScriptViewer />
            )}

            {/* Pitch Deck Slides */}
            {activeDocument === 'deck' && (
              <PitchDeckViewer
                deckPage={deckPage}
                setDeckPage={setDeckPage}
                slides={PITCH_DECK_SLIDES}
              />
            )}

            {/* Color Mockups - Google Drive PDF */}
            {activeDocument === 'colorMockups' && (
              <ColorMockupsViewer />
            )}

            {/* Series Bible */}
            {activeDocument === 'bible' && (
              <SeriesBibleViewer />
            )}

            {/* One-Sheet */}
            {activeDocument === 'onesheet' && (
              <OneSheetViewer />
            )}

            {/* Creator Bio */}
            {activeDocument === 'bio' && (
              <CreatorBioViewer
                portraitError={portraitError}
                onPortraitError={() => setPortraitError(true)}
              />
            )}
          </div>

          {/* Bottom navigation */}
          <div className="mt-8 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-mono text-[9px] text-neutral-400 select-none">
              WGA WEST REGISTERED PREVIEW • BEARTIGER PRODUCTIONS © 2026
            </span>
            <button
              onClick={onClose}
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
  );
};

/**
 * Script Viewer Component
 */
function ScriptViewer() {
  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div className="text-center py-6 space-y-2">
        <h2 className="text-2xl font-bold tracking-widest uppercase font-mono">
          U N D O N E
        </h2>
        <p className="text-[10px]">Written by Kai Paynter & Ella Sullivan</p>
      </div>

      <div className="space-y-4 font-mono text-xs leading-relaxed">
        <p className="font-bold">FADE IN:</p>

        <div className="space-y-1">
          <p className="font-bold">EXT. HOLLYWOOD HILLS - TWILIGHT</p>
          <p className="text-neutral-800">
            The sky is a bruised plum color. Humid twilight clings to the hills
            under the Hollywood Sign. Neon gradients bleed softly into the
            cracked gray sidewalks.
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-neutral-800">
            KEHLANI (27), sharp, wearing a paint-spattered vintage denim jacket,
            sits on the edge of an old brick planter. She focuses her camera.
          </p>
        </div>

        <div className="pl-24 pr-12 space-y-1">
          <p className="font-bold">KEHLANI</p>
          <p className="italic">(to herself)</p>
          <p>Just stay still. Don't look like a tourist.</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Pitch Deck Viewer Component
 */
function PitchDeckViewer({ deckPage, setDeckPage, slides }) {
  return (
    <div className="space-y-6 py-6 font-sans max-w-xl mx-auto">
      <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-200 min-h-[220px] flex flex-col justify-between">
        <div className="space-y-2">
          <span className="text-[9px] font-mono uppercase tracking-wider text-amber-600 font-bold">
            {slides[deckPage].meta}
          </span>
          <h3 className="text-xl font-bold text-neutral-900 uppercase">
            {slides[deckPage].title}
          </h3>
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">
            {slides[deckPage].subtitle}
          </p>
          <p
            className={`text-sm text-neutral-700 leading-relaxed pt-2 ${
              slides[deckPage].isItalic
                ? 'italic font-serif text-neutral-950 text-[15px]'
                : ''
            }`}
          >
            {slides[deckPage].content}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center pt-2">
        <span className="text-xs text-neutral-500">
          Page {deckPage + 1} of {slides.length}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setDeckPage((prev) => Math.max(0, prev - 1))}
            className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-xs font-bold rounded"
          >
            Prev
          </button>
          <button
            onClick={() => setDeckPage((prev) => Math.min(slides.length - 1, prev + 1))}
            className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-xs font-bold rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Series Bible Viewer Component
 */
function SeriesBibleViewer() {
  return (
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-b border-neutral-200 py-4 font-mono text-[11px] text-neutral-600">
        <div className="space-y-3">
          <div>
            <strong className="text-neutral-900 font-sans block text-xs uppercase tracking-wider font-bold">
              GENRE
            </strong>
            <span>Romantic Drama</span>
          </div>
          <div>
            <strong className="text-neutral-900 font-sans block text-xs uppercase tracking-wider font-bold">
              FORMAT
            </strong>
            <span>Season 1: 10, 50-minute episodes</span>
          </div>
          <div>
            <strong className="text-neutral-900 font-sans block text-xs uppercase tracking-wider font-bold">
              SETTING
            </strong>
            <span>Modern-day Hollywood, CA / Los Angeles, CA</span>
          </div>
        </div>

        <div className="bg-neutral-50 p-4 rounded border border-neutral-200 h-full flex flex-col justify-center">
          <strong className="text-neutral-900 font-sans block text-xs uppercase tracking-wider font-bold mb-2">
            TONE REFERENCES
          </strong>
          <p className="italic text-neutral-700 leading-relaxed text-xs font-serif">
            "The intimate realism of Netflix's{' '}
            <strong className="font-semibold text-neutral-900 font-sans">Love</strong> +
            the emotional excavation of Hulu's{' '}
            <strong className="font-semibold text-neutral-900 font-sans">
              Normal People
            </strong>{' '}
            + the cultural sharpness of HBO's{' '}
            <strong className="font-semibold text-neutral-900 font-sans">Insecure</strong>
            ."
          </p>
        </div>
      </div>

      <div className="space-y-3 leading-relaxed text-neutral-700">
        <h5 className="font-bold text-neutral-900 text-sm uppercase tracking-wider font-sans border-b border-neutral-100 pb-1">
          VISION STATEMENT
        </h5>
        <p>
          <strong className="text-neutral-900">Undone</strong> is a story about
          the spaces we occupy—physical, emotional, and cultural—and the ways love
          demands we traverse them. Attraction can be electric but insufficient when
          unexamined histories collide. Hollywood offers glamour, but also
          intimacy: shared coffee, late-night music, small victories, and unspoken
          tension.
        </p>
        <p>
          This series explores how trauma, race, family expectation, inherited and
          societal bias shape love. Kehlani and Jake are both right and both wrong.
          Their story isn't about fantasy. It's about real love in real life:
          messy, awkward, fragile, and occasionally devastatingly beautiful.
        </p>
        <p className="bg-amber-500/5 border-l-2 border-amber-500 p-3 my-2 text-xs text-neutral-950 font-medium">
          This is not a "can interracial couples survive?" story. It is about
          emotional readiness vs emotional intensity, trauma, and how bias survives
          inside "good" people.
        </p>
      </div>

      <p className="text-[9px] text-neutral-400 italic pt-6 leading-relaxed border-t border-neutral-100">
        The Undone Series Bible is the original work of BearTiger Productions. No
        part of it may be reproduced, distributed, transmitted, displayed, or
        performed in any form or by any means, electronic or mechanical, including
        photocopying, recording, or by any information storage and retrieval
        system, without the prior written permission of the copyright holder.
        ©2026 BearTiger Productions. All Rights Reserved.
      </p>
    </div>
  );
}

/**
 * One-Sheet Viewer Component
 */
function OneSheetViewer() {
  return (
    <div className="space-y-6 font-sans text-xs text-neutral-800 max-w-xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-200 pb-4">
        <div>
          <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-tight">
            PROJECT ONE-SHEET
          </h2>
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
          <strong>Logistical Summary:</strong> UNDONE is a ready-to-package
          premier romantic drama with a completed pilot episode, multi-season
          bible summaries, visual pitches, and estimated pilot budgeting
          breakdowns.
        </p>
        <p>
          <strong>Target Audience:</strong> Core demographic adults 21-45; ideal
          fit for high-concept premium streaming, cable network options, or
          independent distribution partnerships.
        </p>
      </div>

      <p className="text-[9px] text-neutral-400 italic border-t border-neutral-100 pt-4 leading-relaxed">
        Copyright 2026 Registered WGA, 2342916 All rights reserved. No part of
        the material protected by this copyright may be reproduced or utilized in
        any form, electronic or mechanical, including photocopying, recording, or
        by any information storage and retrieval system, without written
        permission from the copyright owner.
      </p>
    </div>
  );
}

/**
 * Creator Bio Viewer Component
 */
function CreatorBioViewer({ portraitError, onPortraitError }) {
  return (
    <div className="space-y-4 font-sans text-xs text-neutral-800">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-tight">
            THE CREATOR
          </h2>
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
                src="/kai_paynter_v2.jpg"
                alt="Kai Paynter Portrait"
                className="w-full h-full object-cover"
                onError={onPortraitError}
              />
            ) : (
              <div className="text-center p-6 space-y-2">
                <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-400 mx-auto">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <p className="text-[10px] font-mono text-neutral-400 leading-tight">
                  {"[ Place image inside public/kai_paynter_v2.jpg ]"}
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
            <strong>KAI PAYNTER</strong> is a New York-native, Los
            Angeles-based artist and creative working across the United States
            and Australia. She is the founder of <em>The Americas, A Theatre Company</em> and co-founder of{' '}
            <em>BearTiger Productions</em>.
          </p>
          <p>
            An MFA graduate of the University of California, Irvine (summa cum
            laude) and BA (Honors) in Political Science from Purdue University,
            Kai trained under world-renowned theatre director Robert Cohen and
            began her career as a featured soloist with PMO, performing
            internationally and on PBS holiday specials, including at{' '}
            <em>Neil Armstrong's Hall of Fame</em> induction.
          </p>
          <p>
            Her theatre credits reflect a diverse body of work, including the
            world premiere of Neil LaBute's <em>THE FURIES</em> and the
            Australian premiere of <em>IF I NEEDED SOMEONE</em>, a self-directed
            two-hander that received critical acclaim: "Sydney will see If I
            Needed Someone again and again, but perhaps never as contained or
            personal, with such tight direction and intense acting."
          </p>
          <p>
            Her producing and writing/directing slate spans original and
            classical work across stage and screen, including ongoing
            collaborations with Neil LaBute on projects such as{' '}
            <em>THE MONEY SHOT</em> and <em>ALL THE WAYS TO SAY I LOVE YOU</em>.
          </p>
          <p>
            With on-screen credits in film and television, Kai has appeared on
            networks, including CBS's <em>Criminal Minds</em> opposite Joe
            Mantegna, and in campaigns for APPLE, HONDA, and BOOST MOBILE,
            among others. Her portrayal of Abigail in <em>THE CRUCIBLE</em> was
            featured in <em>US Airways Inflight Magazine</em>, which highlighted
            UC Irvine as the "#1 training institution for young creative
            talent."
          </p>
          <p>
            Kai remains a sought-after industry figure working with emerging
            and established talent from programs such as <em>Australian Idol</em>,
            supporting their transition into theatre and television. She has
            placed artists into programs at Yale School of Drama, Columbia
            University, and NYU's Tisch, and is regularly engaged by leading
            casting directors and talent management to prepare high-profile
            artists for the American film and television market.
          </p>
          <p>
            More recently, Kai received the <em>Sydney S+S Festival Awards</em>{' '}
            for BEST DIRECTOR and BEST PLAY. Her work is defined by rigorous
            craft, elevated performances, and character-driven storytelling with
            global appeal.
          </p>
          <p className="font-semibold pt-1 text-neutral-900 border-t border-neutral-100">
            She's at{' '}
            <a
              href="https://www.BearTigerProductions.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-amber-600"
            >
              www.BearTigerProductions.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Color Mockups Viewer Component
 * Embeds Google Drive PDF viewer for visual treatment materials
 */
function ColorMockupsViewer() {
  return (
    <div className="space-y-6 font-sans text-xs text-neutral-800 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-200 pb-4">
        <div>
          <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-tight">
            Visual Treatment & Color Palette
          </h2>
          <p className="text-[10px] text-neutral-400 tracking-wider font-mono mt-1">
            DESIGN REFERENCE • AESTHETIC DIRECTION
          </p>
        </div>
        <a
          href="https://drive.google.com/file/d/1J9RQpGJHkzfaEd2Ul4Ms5XhTomoU8Ioe/view"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-850 text-white rounded text-[10px] font-mono transition-colors border border-neutral-800"
        >
          <FileText size={10} />
          <span>Open in Drive</span>
        </a>
      </div>

      {/* Google Drive PDF Embed */}
      <div className="aspect-[4/5] bg-neutral-100 border border-neutral-200 rounded-lg overflow-hidden shadow-md">
        <iframe
          src="https://drive.google.com/file/d/1J9RQpGJHkzfaEd2Ul4Ms5XhTomoU8Ioe/preview"
          className="w-full h-full border-0"
          title="Color Mockups PDF"
          allow="autoplay"
        />
      </div>

      <p className="text-[9px] text-neutral-400 italic border-t border-neutral-100 pt-4 leading-relaxed">
        Visual treatment and color palette mockups are proprietary BearTiger Productions materials. © 2026 All rights reserved. No reproduction without written permission.
      </p>
    </div>
  );
}
