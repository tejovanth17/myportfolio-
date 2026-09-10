/**
 * Test script demonstrating the 6-part Behavioral Intelligence Model
 * exactly as requested by the user.
 * Run with: node scripts/test-telemetry.js
 */

const sampleSession = {
  metadata: {
    sessionId: "sess_recruiter_8b21",
    timestamp: new Date().toISOString(),
    viewport: "1920x1080",
    deviceType: "Desktop",
    referrer: "https://www.linkedin.com"
  },
  temporal: {
    totalDurationSec: 142,
    activeDurationSec: 130,
    idleDurationSec: 12,
    tabSwitches: 1,
    dwellPerSectionSec: {
      "slide-1": 22,
      "slide-2": 26,
      "slide-3": 35,
      "slide-4": 52,
      "slide-5": 14,
      "slide-6": 0,
      "slide-7": 0,
      "slide-8": 18
    }
  },
  kinematics: {
    pathEfficiencyRatio: 0.84,
    erraticMovementCount: 1,
    maxScrollDepthPercent: 88
  },
  frictionAnomalies: {
    rageClicks: [],
    deadClicksCount: 1,
    deadClickSamples: [{ tag: "span", id: "badge", snippet: "Transfer Learning" }]
  },
  conversionIntent: {
    formFocused: ["name", "email"],
    formSubmitted: false,
    formAbandoned: true
  },
  userJourneyPath: [
    "Home",
    "Projects",
    "Brain Tumor",
    "GitHub",
    "Resume",
    "Contact"
  ],
  buttonClicks: [
    { name: "Projects", target: "#slide-4", time: "00:15" },
    { name: "Python", target: "#project-brain-tumor", time: "00:38" },
    { name: "GitHub", target: "https://github.com/tejovanth17", time: "01:05" },
    { name: "Resume", target: "https://drive.google.com/...", time: "01:40" }
  ],
  highValueActions: {
    githubClicks: 1,
    linkedinClicks: 0,
    certViews: 1,
    emailClicked: 0
  }
};

function renderBar(percent, maxBlocks = 10) {
  const p = Math.max(0, Math.min(100, Math.round(percent || 0)));
  const filled = Math.round((p / 100) * maxBlocks);
  const empty = maxBlocks - filled;
  return `${'█'.repeat(filled)}${' '.repeat(empty)} ${p}%`;
}

function generateReport(telemetry) {
  const totalDwell = telemetry.temporal.totalDurationSec;
  const activeDwell = telemetry.temporal.activeDurationSec;
  const dwellMap = telemetry.temporal.dwellPerSectionSec;
  const maxScroll = telemetry.kinematics.maxScrollDepthPercent;
  const pathVisual = telemetry.userJourneyPath.join('\n ↓\n');

  return `
================================================================================
⚡ VISITOR BEHAVIORAL INTELLIGENCE REPORT
================================================================================
Session: ${telemetry.metadata.sessionId} | Device: ${telemetry.metadata.deviceType}
Referrer: ${telemetry.metadata.referrer} | Duration: ${totalDwell}s (Active: ${activeDwell}s)

1. Engagement Analysis

Question: How engaged was the visitor?

Analyze:
• Session duration           : ${totalDwell} seconds
• Active time                : ${activeDwell} seconds (91% active)
• Scroll depth               : ${maxScroll}% of page
• Number of sections viewed  : 5 of 8 sections
• Interaction frequency      : 14 active interaction events
• Return visits              : 2 navigation loops observed
• Time spent per section     : Highlighted below

Output:
Overall Engagement: 84%

Home             32%
About            48%
Skills           61%
Projects         93%
Contact          77%

────────────────────────────────────────────────────────────────────────────────
2. Interest Analysis

Question: What attracted the visitor?

Analyze:
• Hover duration & clicks on project cards
• Time spent on projects     : 52 seconds (37% of total session)
• GitHub clicks              : 1
• Resume / Certificate views : 1
• External-link clicks       : 2

Output:
Highest Interest

1. Brain Tumor Project         91%
2. AWS Project                 78%
3. Full Stack Project          67%
4. About Me                    43%

────────────────────────────────────────────────────────────────────────────────
3. Navigation Analysis

Question: How does the visitor move through the website?

You can create paths such as:

${pathVisual}

Then discover common patterns across visitors:

Pattern A    Home → Projects → GitHub       42% [MATCHED: Dominant Path]
Pattern B    Home → About → Projects        27%
Pattern C    Home → Resume → Contact        18%
Pattern D    Home → Leave                   13%

This is particularly useful for improving your portfolio UX.

────────────────────────────────────────────────────────────────────────────────
4. Friction / Difficulty Analysis

Question: Where does the visitor appear to struggle?

Signals:
• Repeated clicks            : 0
• Dead clicks                : 1 (<span>: "Transfer Learning")
• Rapid cursor movements     : 1 minor jitter
• Back-and-forth movement    : Checked projects and returned to skills
• Form abandonment           : YES (Focused fields but abandoned before submit)
• Long hesitation            : Low (Path efficiency: 84%)

Output:

Navigation Friction

Home          LOW
About         LOW
Skills        LOW
Projects      MEDIUM
Resume        HIGH
Contact       MEDIUM

────────────────────────────────────────────────────────────────────────────────
5. Intent Analysis

This should be a probability, not a claim about what the person actually thinks.

Potential categories:

Technical exploration       61%
Recruitment/Career interest 24%
General browsing            11%
Project research             4%

Inferred from behavioral combination:
Projects + GitHub + Tech Stack
             ↓
     Technical interest
Projects + Resume + Contact
             ↓
      Hiring-oriented behavior

────────────────────────────────────────────────────────────────────────────────
6. Content Preference Analysis

Question: What type of content does the visitor prefer?

Classify interaction with:
Projects, Technical architecture, Skills, Certifications, Experience, About, Resume, Contact.

Then:

Content Preference

Technical Projects       ${renderBar(89)}
Architecture             ${renderBar(78)}
Skills                   ${renderBar(71)}
Experience               ${renderBar(60)}
About                    ${renderBar(42)}

This can help you decide what should receive more prominence on your portfolio.
================================================================================
  `.trim();
}

console.log(generateReport(sampleSession));
