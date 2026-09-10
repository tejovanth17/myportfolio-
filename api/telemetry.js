/**
 * Serverless API / Endpoint: /api/telemetry
 * Receives visitor behavioral telemetry, runs Gemini LLM Cognitive Analysis,
 * and delivers the report to the Admin's email.
 */

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let telemetryData;
  try {
    telemetryData = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch (err) {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  // Filter out empty or ultra-short bounces (< 4 seconds) to save LLM tokens
  if (!telemetryData || (telemetryData.temporal?.totalDurationSec || 0) < 4) {
    return res.status(200).json({ status: 'ignored_too_short' });
  }

  const geminiApiKey = process.env.GEMINI_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL || 'tejovanth16@gmail.com';
  const resendApiKey = process.env.RESEND_API_KEY;

  try {
    let aiAnalysis = null;

    // 1. Call Gemini API if key is provided
    if (geminiApiKey) {
      aiAnalysis = await analyzeWithGemini(telemetryData, geminiApiKey);
    } else {
      // Fallback rule-based heuristic summary if no API key is yet configured
      aiAnalysis = generateHeuristicSummary(telemetryData);
    }

    // 2. Dispatch Email to Admin
    if (resendApiKey) {
      await sendEmailViaResend({
        apiKey: resendApiKey,
        to: adminEmail,
        subject: `[Portfolio Behavioral Intel] Session ${telemetryData.metadata?.sessionId || ''}`,
        html: renderEmailReport(telemetryData, aiAnalysis)
      });
    } else {
      console.log('--- BEHAVIORAL INTEL REPORT ---');
      console.log('Telemetry:', JSON.stringify(telemetryData, null, 2));
      console.log('AI Analysis:', JSON.stringify(aiAnalysis, null, 2));
    }

    return res.status(200).json({
      success: true,
      analysis: aiAnalysis
    });
  } catch (error) {
    console.error('Telemetry processing error:', error);
    return res.status(500).json({ error: 'Internal processing error' });
  }
}

/**
 * Executes frontier LLM behavioral deduction using Google Gemini API
 */
async function analyzeWithGemini(telemetry, apiKey) {
  const prompt = `
You are a Principal Human-Computer Interaction (HCI) Scientist and Behavioral Psychologist.
Analyze the following dense visitor session telemetry from Thomala Tejovanth's portfolio website.

TELEMETRY DATA:
${JSON.stringify(telemetry, null, 2)}

TASK:
Infer the visitor's subconscious intentions, psychological state, and UX blockers.
Provide your output in strictly valid JSON with this exact structure:
{
  "visitorArchetype": "<Recruiter | Client / Founder | Fellow Engineer | Casual Visitor>",
  "interestScore": <0 to 100>,
  "frictionIndex": <0 to 100>,
  "hesitationLevel": "<Low | Medium | High>",
  "executiveSummary": "<2-3 clear sentences summarizing what this person did, what caught their attention, and why>",
  "topEngagedSections": ["<section 1>", "<section 2>"],
  "frictionPoints": ["<specific friction point or rage/dead click issue, or none>"],
  "conversionProbability": "<High | Moderate | Low>",
  "actionableRecommendationForDev": "<1 specific suggestion for Thomala to improve portfolio conversion>"
}
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json'
        }
      })
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  return JSON.parse(rawText);
}

/**
 * Lightweight mathematical heuristic fallback when LLM API key is pending
 */
function generateHeuristicSummary(telemetry) {
  const efficiency = telemetry.kinematics?.pathEfficiencyRatio || 1.0;
  const rageCount = telemetry.frictionAnomalies?.rageClicks?.length || 0;
  const dwell = telemetry.temporal?.totalDurationSec || 0;
  const formSubmitted = telemetry.conversionIntent?.formSubmitted;

  let archetype = 'Casual Visitor';
  if (formSubmitted) archetype = 'High-Value Client / Recruiter';
  else if (dwell > 60) archetype = 'Technical Recruiter / Peer';

  return {
    visitorArchetype: archetype,
    interestScore: Math.min(100, Math.round((dwell / 120) * 80 + (formSubmitted ? 20 : 0))),
    frictionIndex: Math.min(100, rageCount * 30 + (efficiency < 0.4 ? 30 : 0)),
    hesitationLevel: efficiency < 0.4 ? 'High' : efficiency < 0.7 ? 'Medium' : 'Low',
    executiveSummary: `Visitor spent ${dwell}s exploring sections. Navigation path efficiency was ${Math.round(efficiency * 100)}% with ${rageCount} rage click incidents detected.`,
    topEngagedSections: Object.entries(telemetry.temporal?.dwellPerSectionSec || {})
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([k, v]) => `${k} (${v}s)`),
    frictionPoints: rageCount > 0 ? [`${rageCount} rage click events recorded`] : ['No major UI friction observed'],
    conversionProbability: formSubmitted ? 'High' : dwell > 90 ? 'Moderate' : 'Low',
    actionableRecommendationForDev: 'Consider streamlining project links and verifying interactive hover affordances.'
  };
}

/**
 * Sends email report via Resend API
 */
async function sendEmailViaResend({ apiKey, to, subject, html }) {
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'Portfolio Intel <telemetry@resend.dev>',
      to: [to],
      subject,
      html
    })
  });
}

/**
 * Renders HTML email template
 */
function renderEmailReport(telemetry, ai) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #09090b; color: #f4f4f5; padding: 24px; border-radius: 12px; border: 1px solid #27272a;">
      <h2 style="color: #10b981; margin-top: 0;">⚡ Visitor Behavioral Intelligence Report</h2>
      <p style="color: #a1a1aa; font-size: 14px;">Session: <code>${telemetry.metadata?.sessionId}</code> | Device: <strong>${telemetry.metadata?.deviceType}</strong></p>
      
      <div style="background: #18181b; padding: 16px; border-radius: 8px; margin: 16px 0; border: 1px solid #27272a;">
        <h3 style="margin-top: 0; color: #ffffff;">Executive Cognitive Summary</h3>
        <p style="color: #e4e4e7; line-height: 1.5;">${ai.executiveSummary}</p>
        <p><strong>Visitor Archetype:</strong> <span style="color: #38bdf8;">${ai.visitorArchetype}</span></p>
        <p><strong>Interest Score:</strong> <span style="color: #10b981;">${ai.interestScore}/100</span> | <strong>Friction Index:</strong> <span style="color: #f59e0b;">${ai.frictionIndex}/100</span></p>
      </div>

      <div style="background: #18181b; padding: 16px; border-radius: 8px; margin: 16px 0; border: 1px solid #27272a;">
        <h4 style="margin-top: 0; color: #ffffff;">Recommended Action:</h4>
        <p style="color: #a3e635; margin-bottom: 0;">${ai.actionableRecommendationForDev}</p>
      </div>
    </div>
  `;
}
