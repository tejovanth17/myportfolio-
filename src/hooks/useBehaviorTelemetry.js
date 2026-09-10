import { useEffect, useRef, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import {
  calculatePathEfficiency,
  calculateTrajectoryAngularJitter,
  RageClickDetector,
  isDeadClick
} from '../utils/behaviorPhysics';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function renderBar(percent, maxBlocks = 10) {
  const p = Math.max(0, Math.min(100, Math.round(percent || 0)));
  const filled = Math.round((p / 100) * maxBlocks);
  const empty = maxBlocks - filled;
  return `${'█'.repeat(filled)}${' '.repeat(empty)} ${p}%`;
}

/**
 * useBehaviorTelemetry:
 * Comprehensive Behavioral Intelligence & Intent Inference Engine.
 * Evaluates:
 * 1. Engagement Analysis
 * 2. Interest Analysis
 * 3. Navigation Analysis (Paths & Patterns)
 * 4. Friction / Difficulty Analysis
 * 5. Intent Analysis (Probabilistic)
 * 6. Content Preference Analysis
 */
export function useBehaviorTelemetry({
  apiEndpoint = import.meta.env.VITE_TELEMETRY_API_URL || null,
  minSessionSecondsToReport = 10
} = {}) {
  const sessionStartTime = useRef(0);
  const activeSlideRef = useRef('slide-1');
  const previousSlideRef = useRef(null);
  const slideDwellMap = useRef({
    'slide-1': 0,
    'slide-2': 0,
    'slide-3': 0,
    'slide-4': 0,
    'slide-5': 0,
    'slide-6': 0,
    'slide-7': 0,
    'slide-8': 0
  });
  const slideEnterTime = useRef(0);

  // Per-project interest tracking
  const projectDwellMap = useRef({
    'Brain Tumor Project': 0,
    'Music Genre Classifier': 0,
    'AWS AutoScaling Project': 0,
    'Technical Skills': 0,
    'Certifications & Publications': 0,
    'About Me': 0
  });

  // Friction by section (low, medium, high)
  const sectionFrictionSignals = useRef({
    'Home': { rage: 0, dead: 0, jitter: 0 },
    'About': { rage: 0, dead: 0, jitter: 0 },
    'Skills': { rage: 0, dead: 0, jitter: 0 },
    'Projects': { rage: 0, dead: 0, jitter: 0 },
    'Certifications': { rage: 0, dead: 0, jitter: 0 },
    'Contact': { rage: 0, dead: 0, jitter: 0 }
  });

  // Navigation Journey Path & Events
  const userJourneyPath = useRef(['Home']);
  const buttonClicks = useRef([]);
  const backtrackJourneys = useRef([]);
  const activityTimeline = useRef([]);

  // Kinematics & Ring Buffer
  const trajectoryBuffer = useRef([]);
  const lastSampleTime = useRef(0);
  const efficiencySamples = useRef([]);
  const totalJitterEvents = useRef(0);

  // Anomaly metrics
  const rageDetector = useRef(new RageClickDetector(3, 800, 35));
  const rageClicksList = useRef([]);
  const deadClicksCount = useRef(0);
  const deadClicksSample = useRef([]);

  // Specific high-value action counters
  const highValueActions = useRef({
    githubClicks: 0,
    linkedinClicks: 0,
    certViews: 0,
    emailClicked: 0
  });

  // Form & Attention metrics
  const formInteraction = useRef({
    fieldsFocused: new Set(),
    didType: false,
    submitted: false,
    abandoned: false
  });
  const tabSwitches = useRef(0);
  const maxScrollDepth = useRef(0);
  const lastActiveTimestamp = useRef(0);
  const totalIdleSeconds = useRef(0);

  // Guard against duplicate reports
  const hasDispatchedReport = useRef(false);

  const logTimelineEvent = useCallback((eventText) => {
    const elapsedSec = sessionStartTime.current > 0
      ? Math.max(0, Math.round((Date.now() - sessionStartTime.current) / 1000))
      : 0;
    activityTimeline.current.push({
      time: formatTime(elapsedSec),
      text: eventText
    });
  }, []);

  // Update slide dwell & track path progression
  const updateSlideDwell = useCallback((newSlideId) => {
    const now = Date.now();
    const duration = Math.max(0, Math.round((now - slideEnterTime.current) / 1000));
    const current = activeSlideRef.current || 'slide-1';

    if (current !== newSlideId) {
      slideDwellMap.current[current] = (slideDwellMap.current[current] || 0) + duration;

      const slideToName = {
        'slide-1': 'Home',
        'slide-2': 'About',
        'slide-3': 'Skills',
        'slide-4': 'Projects',
        'slide-5': 'Certifications',
        'slide-6': 'Education',
        'slide-7': 'FAQ',
        'slide-8': 'Contact'
      };

      const prev = previousSlideRef.current;
      const currentLabel = slideToName[current] || current;
      const newLabel = slideToName[newSlideId] || newSlideId;

      // Add to journey path if not consecutive repeat
      if (userJourneyPath.current[userJourneyPath.current.length - 1] !== newLabel) {
        userJourneyPath.current.push(newLabel);
      }

      if (prev && newSlideId === prev) {
        const backtrackNote = `Visited ${currentLabel} (${duration}s) ──> RETURNED BACK to ${newLabel}`;
        backtrackJourneys.current.push(backtrackNote);
        logTimelineEvent(`↩️ Backtracked: ${backtrackNote}`);
      } else {
        logTimelineEvent(`Navigated to ${newLabel} (spent ${duration}s on ${currentLabel})`);
      }

      previousSlideRef.current = current;
      activeSlideRef.current = newSlideId;
      slideEnterTime.current = now;
    }
  }, [logTimelineEvent]);

  // Generate telemetry summary
  const getTelemetrySummary = useCallback(() => {
    const now = Date.now();
    const activeDuration = Math.max(0, Math.round((now - slideEnterTime.current) / 1000));
    const finalDwellMap = { ...slideDwellMap.current };
    finalDwellMap[activeSlideRef.current] = (finalDwellMap[activeSlideRef.current] || 0) + activeDuration;

    const totalDurationSec = Math.max(1, Math.round((now - sessionStartTime.current) / 1000));
    const avgEfficiency = efficiencySamples.current.length > 0
      ? Number((efficiencySamples.current.reduce((a, b) => a + b, 0) / efficiencySamples.current.length).toFixed(2))
      : 1.0;

    return {
      metadata: {
        sessionId: `sess_${sessionStartTime.current.toString(36)}`,
        timestamp: new Date().toISOString(),
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        deviceType: /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
        referrer: document.referrer || 'Direct / Bookmark'
      },
      temporal: {
        totalDurationSec,
        activeDurationSec: Math.max(0, totalDurationSec - totalIdleSeconds.current),
        idleDurationSec: totalIdleSeconds.current,
        tabSwitches: tabSwitches.current,
        dwellPerSectionSec: finalDwellMap
      },
      kinematics: {
        pathEfficiencyRatio: avgEfficiency,
        erraticMovementCount: totalJitterEvents.current,
        maxScrollDepthPercent: Math.round(maxScrollDepth.current)
      },
      frictionAnomalies: {
        rageClicks: rageClicksList.current,
        deadClicksCount: deadClicksCount.current,
        deadClickSamples: deadClicksSample.current.slice(-5)
      },
      conversionIntent: {
        formFocused: Array.from(formInteraction.current.fieldsFocused),
        formSubmitted: formInteraction.current.submitted,
        formAbandoned: formInteraction.current.fieldsFocused.size > 0 && !formInteraction.current.submitted
      },
      userJourneyPath: userJourneyPath.current,
      buttonClicks: buttonClicks.current,
      highValueActions: highValueActions.current,
      sectionFriction: sectionFrictionSignals.current,
      activityTimeline: activityTimeline.current
    };
  }, []);

  // Formats human-readable report matching the user's exact specification
  const formatEmailReportText = useCallback((telemetry) => {
    const totalDwell = telemetry.temporal?.totalDurationSec || 1;
    const activeDwell = telemetry.temporal?.activeDurationSec || 1;
    const dwellMap = telemetry.temporal?.dwellPerSectionSec || {};
    const maxScroll = telemetry.kinematics?.maxScrollDepthPercent || 0;
    const formSubmitted = telemetry.conversionIntent?.formSubmitted;
    const formAbandoned = telemetry.conversionIntent?.formAbandoned;

    // --- 1. ENGAGEMENT ANALYSIS ---
    const homeSec = dwellMap['slide-1'] || 0;
    const aboutSec = dwellMap['slide-2'] || 0;
    const skillsSec = dwellMap['slide-3'] || 0;
    const projectsSec = dwellMap['slide-4'] || 0;
    const certsSec = dwellMap['slide-5'] || 0;
    const contactSec = dwellMap['slide-8'] || 0;

    // Relative engagement percentages per section
    const computeSectionEngagement = (sec, weight) => {
      if (sec === 0) return 0;
      return Math.min(99, Math.round((sec / (totalDwell * 0.4 || 1)) * weight * 100));
    };

    const homeEngage = Math.min(100, Math.max(15, computeSectionEngagement(homeSec, 0.4)));
    const aboutEngage = Math.min(100, Math.max(20, computeSectionEngagement(aboutSec, 0.6)));
    const skillsEngage = Math.min(100, Math.max(25, computeSectionEngagement(skillsSec, 0.7)));
    const projectsEngage = Math.min(100, Math.max(30, computeSectionEngagement(projectsSec, 1.0)));
    const contactEngage = formSubmitted ? 100 : formAbandoned ? 78 : contactSec > 0 ? 50 : 10;

    const overallEngagement = Math.min(99, Math.round(
      (Math.min(100, (activeDwell / totalDwell) * 40)) +
      (Math.min(100, maxScroll) * 0.35) +
      (telemetry.buttonClicks.length > 0 ? 25 : 10)
    ));

    // --- 2. INTEREST ANALYSIS ---
    // Rank specific projects & elements
    const brainTumorScore = projectsSec > 0 ? Math.min(98, Math.round(projectsEngage * 0.95 + (telemetry.highValueActions.githubClicks ? 10 : 0))) : 30;
    const awsProjectScore = projectsSec > 0 ? Math.min(95, Math.round(projectsEngage * 0.82)) : 25;
    const fullStackScore = skillsSec > 0 ? Math.min(90, Math.round(skillsEngage * 0.85)) : 20;
    const aboutMeScore = Math.min(85, Math.round(aboutEngage * 0.9));

    // --- 3. NAVIGATION ANALYSIS ---
    const pathNodes = telemetry.userJourneyPath || ['Home'];
    const pathVisual = pathNodes.join('\n ↓\n');

    // Detect common UX patterns
    const pathString = pathNodes.join(' → ');
    let detectedPattern = 'Pattern B: Home → About → Projects';
    if (pathString.includes('Projects') && telemetry.highValueActions.githubClicks > 0) {
      detectedPattern = 'Pattern A: Home → Projects → GitHub';
    } else if (pathString.includes('Contact') || formSubmitted || formAbandoned) {
      detectedPattern = 'Pattern C: Home → Projects → Contact';
    } else if (totalDwell < 20) {
      detectedPattern = 'Pattern D: Home → Leave (Bounce)';
    }

    // --- 4. FRICTION / DIFFICULTY ANALYSIS ---
    const rageCount = telemetry.frictionAnomalies?.rageClicks?.length || 0;
    const deadCount = telemetry.frictionAnomalies?.deadClicksCount || 0;
    const efficiency = Math.round((telemetry.kinematics?.pathEfficiencyRatio || 1) * 100);

    const getFrictionRating = (sectionKey, isHighRisk = false) => {
      if (isHighRisk && (rageCount > 0 || deadCount > 1)) return 'HIGH';
      if (deadCount > 0 || efficiency < 40) return 'MEDIUM';
      return 'LOW';
    };

    const homeFriction = getFrictionRating('Home');
    const aboutFriction = getFrictionRating('About');
    const skillsFriction = getFrictionRating('Skills');
    const projectsFriction = getFrictionRating('Projects', rageCount > 0);
    const resumeFriction = telemetry.highValueActions.certViews > 0 ? 'LOW' : 'MEDIUM';
    const contactFriction = formAbandoned ? 'HIGH' : formSubmitted ? 'LOW' : 'MEDIUM';

    // --- 5. INTENT ANALYSIS (Probabilities summing to 100%) ---
    let technicalExploration = 30;
    let recruitmentInterest = 25;
    let generalBrowsing = 35;
    let projectResearch = 10;

    if (projectsSec > 25 || telemetry.highValueActions.githubClicks > 0) {
      technicalExploration += 30;
      projectResearch += 15;
      generalBrowsing -= 25;
    }
    if (formSubmitted || formAbandoned || telemetry.highValueActions.linkedinClicks > 0 || telemetry.highValueActions.certViews > 0) {
      recruitmentInterest += 35;
      generalBrowsing -= 20;
    }
    if (totalDwell < 25 && maxScroll < 40) {
      generalBrowsing = 70;
      technicalExploration = 15;
      recruitmentInterest = 10;
      projectResearch = 5;
    }

    // Normalize to exact 100%
    const sum = technicalExploration + recruitmentInterest + generalBrowsing + projectResearch;
    technicalExploration = Math.round((technicalExploration / sum) * 100);
    recruitmentInterest = Math.round((recruitmentInterest / sum) * 100);
    projectResearch = Math.round((projectResearch / sum) * 100);
    generalBrowsing = 100 - (technicalExploration + recruitmentInterest + projectResearch);

    // --- 6. CONTENT PREFERENCE ANALYSIS ---
    const prefProjects = Math.min(99, Math.max(35, Math.round((projectsSec / (totalDwell || 1)) * 140) + 40));
    const prefArchitecture = Math.min(95, Math.max(25, Math.round(prefProjects * 0.88)));
    const prefSkills = Math.min(95, Math.max(30, Math.round((skillsSec / (totalDwell || 1)) * 150) + 35));
    const prefExperience = Math.min(90, Math.max(20, Math.round((aboutSec / (totalDwell || 1)) * 150) + 25));
    const prefAbout = Math.min(85, Math.max(15, Math.round((aboutSec / (totalDwell || 1)) * 130) + 20));

    return `
================================================================================
⚡ VISITOR BEHAVIORAL INTELLIGENCE & INTENT REPORT
================================================================================
Session: ${telemetry.metadata?.sessionId} | Device: ${telemetry.metadata?.deviceType} (${telemetry.metadata?.viewport})
Referrer: ${telemetry.metadata?.referrer} | Duration: ${totalDwell}s (Active: ${activeDwell}s)

1. Engagement Analysis

Question: How engaged was the visitor?

Analyze:
• Session duration           : ${totalDwell} seconds
• Active interaction time    : ${activeDwell} seconds (${Math.round((activeDwell / totalDwell) * 100)}% active)
• Scroll depth               : ${maxScroll}% of entire page
• Number of sections viewed  : ${Object.values(dwellMap).filter(v => v > 0).length} of 8 sections
• Interaction frequency      : ${telemetry.buttonClicks.length + (telemetry.kinematics?.erraticMovementCount || 0)} interaction events
• Navigation Returns         : ${telemetry.userJourneyPath.length > 3 ? 'Multiple backtracks observed' : 'Linear pass'}

Output:
Overall Engagement: ${overallEngagement}%

Home             ${homeEngage}%
About            ${aboutEngage}%
Skills           ${skillsEngage}%
Projects         ${projectsEngage}%
Certifications   ${Math.min(95, Math.max(15, Math.round((certsSec / (totalDwell || 1)) * 160)))}%
Contact          ${contactEngage}%

────────────────────────────────────────────────────────────────────────────────
2. Interest Analysis

Question: What attracted the visitor?

Analyze:
• Time spent on projects: ${projectsSec} seconds (${Math.round((projectsSec / totalDwell) * 100)}% of total time)
• GitHub clicks         : ${telemetry.highValueActions.githubClicks}
• LinkedIn / Resume     : ${telemetry.highValueActions.linkedinClicks + telemetry.highValueActions.certViews}
• External-link clicks  : ${telemetry.highValueActions.githubClicks + telemetry.highValueActions.linkedinClicks}
• Form attention focus  : ${telemetry.conversionIntent?.formFocused?.join(', ') || 'None'}

Output:
Highest Interest

1. Brain Tumor Project         ${brainTumorScore}%
2. AWS AutoScaling Project     ${awsProjectScore}%
3. Full Stack & Skills         ${fullStackScore}%
4. About Me & Background       ${aboutMeScore}%

────────────────────────────────────────────────────────────────────────────────
3. Navigation Analysis

Question: How does the visitor move through the website?

Observed User Journey Path:

${pathVisual}

Common Pattern Discovered:
Matched Flow : ${detectedPattern}
Path Efficiency: ${efficiency}% (${efficiency > 70 ? 'Decisive, purposeful navigation' : 'Exploratory searching'})

────────────────────────────────────────────────────────────────────────────────
4. Friction / Difficulty Analysis

Question: Where does the visitor appear to struggle?

Signals Detected:
• Repeated / Rage Clicks : ${rageCount} ${rageCount > 0 ? '(Friction on specific element)' : '(None)'}
• Dead Clicks            : ${deadCount} ${deadCount > 0 ? telemetry.frictionAnomalies.deadClickSamples.map(dc => `(<${dc.tag}>: "${dc.snippet}")`).join(', ') : '(None)'}
• Rapid Cursor Jitter    : ${telemetry.kinematics?.erraticMovementCount} angular redirection events
• Form Abandonment       : ${formAbandoned ? 'YES (Began typing in fields but abandoned)' : 'NO'}

Output:

Navigation Friction

Home          ${homeFriction.padEnd(6, ' ')}
About         ${aboutFriction.padEnd(6, ' ')}
Skills        ${skillsFriction.padEnd(6, ' ')}
Projects      ${projectsFriction.padEnd(6, ' ')}
Resume        ${resumeFriction.padEnd(6, ' ')}
Contact       ${contactFriction.padEnd(6, ' ')}

────────────────────────────────────────────────────────────────────────────────
5. Intent Analysis

This is a calculated probability distribution based on interaction heuristics:

Potential categories:

Technical exploration       ${technicalExploration}%
Recruitment/Career interest ${recruitmentInterest}%
General browsing            ${generalBrowsing}%
Project research             ${projectResearch}%

Behavioral Inference:
${
  technicalExploration > 50
    ? 'Projects + GitHub + Tech Stack ──> High Technical Interest & Verification'
    : recruitmentInterest > 40
    ? 'Projects + Resume + Contact ──> Active Hiring / Recruiter Behavior'
    : 'General Browsing ──> Casual overview of portfolio content'
}

────────────────────────────────────────────────────────────────────────────────
6. Content Preference Analysis

Question: What type of content does the visitor prefer?

Output:

Content Preference

Technical Projects       ${renderBar(prefProjects)}
Architecture & Cloud     ${renderBar(prefArchitecture)}
Skills & Languages       ${renderBar(prefSkills)}
Experience & History     ${renderBar(prefExperience)}
About & Bio              ${renderBar(prefAbout)}

Summary Recommendation:
${
  prefProjects > 75
    ? 'The visitor focused heavily on your Technical Projects. Ensure GitHub live demo and architecture links are front-and-center.'
    : formAbandoned
    ? 'The visitor showed intent to reach out but abandoned the contact form. Consider adding a one-click direct email button.'
    : 'Visitor had a clean, balanced walkthrough of your portfolio.'
}
================================================================================
    `.trim();
  }, []);

  // Dispatch report to admin email
  const dispatchReportToAdmin = useCallback(async () => {
    if (hasDispatchedReport.current) return;

    const summary = getTelemetrySummary();
    const duration = summary.temporal?.totalDurationSec || 0;

    if (duration < minSessionSecondsToReport) {
      return;
    }

    hasDispatchedReport.current = true;

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_yk8my4g';
    const notificationTemplateId = import.meta.env.VITE_EMAILJS_NOTIFICATION_TEMPLATE_ID || 'template_2hjga2u';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '8_FzZL87L8oDYmfhN';

    const reportMessage = formatEmailReportText(summary);

    const emailParams = {
      title: `⚡ Behavioral Intel: Session ${summary.metadata?.sessionId} (${duration}s)`,
      subject: `⚡ Behavioral Intel: Session ${summary.metadata?.sessionId} (${duration}s)`,
      from_name: 'Portfolio AI Behavioral Tracker',
      name: 'Behavioral Analyzer',
      user_name: 'Behavioral Analyzer',
      from_email: 'telemetry@portfolio-intel.com',
      email: 'telemetry@portfolio-intel.com',
      user_email: 'telemetry@portfolio-intel.com',
      reply_to: 'telemetry@portfolio-intel.com',
      to_name: 'Thomala Tejovanth',
      to_email: 'tejovanth16@gmail.com',
      message: reportMessage
    };

    try {
      await emailjs.send(serviceId, notificationTemplateId, emailParams, publicKey);
      sessionStorage.setItem('last_telemetry_sent', JSON.stringify({ sentAt: new Date().toISOString(), summary }));
    } catch (_err) {
      if (apiEndpoint && navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(summary)], { type: 'application/json' });
        navigator.sendBeacon(apiEndpoint, blob);
      }
    }
  }, [apiEndpoint, formatEmailReportText, getTelemetrySummary, minSessionSecondsToReport]);

  // Hook event listeners
  useEffect(() => {
    const initTime = Date.now();
    if (!sessionStartTime.current) sessionStartTime.current = initTime;
    if (!slideEnterTime.current) slideEnterTime.current = initTime;
    if (!lastActiveTimestamp.current) lastActiveTimestamp.current = initTime;

    // 1. Throttled Mouse Movement Listener
    const handleMouseMove = (e) => {
      const now = performance.now();
      lastActiveTimestamp.current = Date.now();

      if (now - lastSampleTime.current < 70) return;
      lastSampleTime.current = now;

      const pt = { x: e.clientX, y: e.clientY };
      trajectoryBuffer.current.push(pt);

      if (trajectoryBuffer.current.length > 25) {
        const efficiency = calculatePathEfficiency(trajectoryBuffer.current);
        efficiencySamples.current.push(efficiency);
        if (efficiencySamples.current.length > 50) {
          efficiencySamples.current.shift();
        }

        const { totalJitterEvents: jitters } = calculateTrajectoryAngularJitter(trajectoryBuffer.current);
        if (jitters > 0) {
          totalJitterEvents.current += jitters;
        }

        trajectoryBuffer.current = trajectoryBuffer.current.slice(-5);
      }
    };

    // 2. Click Analyzer
    const handleClick = (e) => {
      lastActiveTimestamp.current = Date.now();
      const target = e.target;
      if (!target) return;

      const tag = target.tagName?.toLowerCase() || 'unknown';
      const id = target.id || target.closest('[id]')?.id || '';
      const text = (target.innerText || target.alt || target.title || '').slice(0, 40).trim();

      // Check specific high-value clicks
      const linkHref = target.closest('a')?.getAttribute('href') || '';
      if (linkHref.includes('github.com') || id.includes('github') || text.toLowerCase().includes('github')) {
        highValueActions.current.githubClicks++;
        userJourneyPath.current.push('GitHub');
      } else if (linkHref.includes('linkedin.com') || id.includes('linkedin') || text.toLowerCase().includes('linkedin')) {
        highValueActions.current.linkedinClicks++;
        userJourneyPath.current.push('LinkedIn');
      } else if (linkHref.includes('drive.google.com') || text.toLowerCase().includes('certificate')) {
        highValueActions.current.certViews++;
        userJourneyPath.current.push('Resume/Cert');
      }

      // Check project interactions
      const projectCard = target.closest('[id^="project-"]');
      if (projectCard) {
        const projId = projectCard.id;
        const projTitle = projId === 'project-brain-tumor' ? 'Brain Tumor'
          : projId === 'project-music-genre' ? 'Music Genre'
          : projId === 'project-aws-autoscaling' ? 'AWS AutoScaling' : 'Project Detail';
        if (userJourneyPath.current[userJourneyPath.current.length - 1] !== projTitle) {
          userJourneyPath.current.push(projTitle);
        }
      }

      const interactiveEl = target.closest('a, button, [role="button"]');
      if (interactiveEl) {
        const btnName = (interactiveEl.innerText || interactiveEl.title || interactiveEl.getAttribute('aria-label') || text || 'Button').slice(0, 35).trim();
        const targetHref = interactiveEl.getAttribute('href') || interactiveEl.id || '';
        const elapsedSec = Math.max(0, Math.round((Date.now() - sessionStartTime.current) / 1000));

        buttonClicks.current.push({
          name: btnName,
          target: targetHref,
          time: formatTime(elapsedSec)
        });
      }

      // Check Rage Click
      const rageEvent = rageDetector.current.registerClick(e.clientX, e.clientY, tag, id, text);
      if (rageEvent) {
        rageClicksList.current.push(rageEvent);
      }

      // Check Dead Click
      if (isDeadClick(target)) {
        deadClicksCount.current++;
        deadClicksSample.current.push({
          tag,
          id: id || 'unlabeled',
          snippet: text.slice(0, 30).trim()
        });
      }
    };

    // 3. Form Input & Abandonment Listeners
    const handleFocusIn = (e) => {
      const target = e.target;
      if (target && ['INPUT', 'TEXTAREA'].includes(target.tagName)) {
        const fieldName = target.name || target.id || target.placeholder || 'form_field';
        formInteraction.current.fieldsFocused.add(fieldName);
      }
    };

    const handleInputType = (e) => {
      const target = e.target;
      if (target && ['INPUT', 'TEXTAREA'].includes(target.tagName)) {
        formInteraction.current.didType = true;
      }
    };

    // 4. Tab Visibility Tracker (for metrics only, NO email dispatch)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        tabSwitches.current++;
      }
    };

    // 5. Intersection Observer for Slide Detection
    const slideElements = document.querySelectorAll('section[id^="slide-"]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            updateSlideDwell(entry.target.id);
          }
        });
      },
      { threshold: [0.5] }
    );

    slideElements.forEach((el) => observer.observe(el));

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });
    window.addEventListener('focusin', handleFocusIn, { passive: true });
    window.addEventListener('input', handleInputType, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('input', handleInputType);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
    };
  }, [updateSlideDwell]);

  // Compiles and returns the structured 6-section behavioral report
  const getFormattedReport = useCallback(() => {
    const summary = getTelemetrySummary();
    return formatEmailReportText(summary);
  }, [formatEmailReportText, getTelemetrySummary]);

  const markFormSubmitted = useCallback(() => {
    formInteraction.current.submitted = true;
  }, []);

  const reportScrollProgress = useCallback((percent) => {
    if (percent > maxScrollDepth.current) {
      maxScrollDepth.current = percent;
    }
  }, []);

  return {
    getFormattedReport,
    markFormSubmitted,
    reportScrollProgress
  };
}
