/**
 * Behavior Physics & Kinematics Engine
 * Performs real-time mathematical signal processing on user interaction streams.
 */

// Euclidean distance between two 2D points
export function calculateEuclideanDistance(p1, p2) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Calculates Path Efficiency Ratio:
 * Direct Euclidean Distance (start to finish) / Total Cumulative Trajectory Distance
 * - 1.0 = Perfectly straight, decisive, goal-driven movement
 * - 0.5 - 0.9 = Normal purposeful browsing
 * - < 0.35 = Searching, hesitation, wandering cursor, or confusion
 */
export function calculatePathEfficiency(points) {
  if (!points || points.length < 2) return 1.0;

  const directDistance = calculateEuclideanDistance(points[0], points[points.length - 1]);
  let cumulativeDistance = 0;

  for (let i = 1; i < points.length; i++) {
    cumulativeDistance += calculateEuclideanDistance(points[i - 1], points[i]);
  }

  if (cumulativeDistance === 0) return 1.0;
  return Math.min(1.0, Number((directDistance / cumulativeDistance).toFixed(3)));
}

/**
 * Computes angular direction change (radians) between consecutive velocity vectors:
 * Indicates erratic movement / hesitation when angle > 90 deg (PI / 2)
 */
export function calculateTrajectoryAngularJitter(points) {
  if (!points || points.length < 3) return { totalJitterEvents: 0, averageAngleDelta: 0 };

  let jitterEvents = 0;
  let totalDeltaAngle = 0;
  let sampleCount = 0;

  for (let i = 2; i < points.length; i++) {
    const p0 = points[i - 2];
    const p1 = points[i - 1];
    const p2 = points[i];

    const v1 = { x: p1.x - p0.x, y: p1.y - p0.y };
    const v2 = { x: p2.x - p1.x, y: p2.y - p1.y };

    const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
    const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);

    if (mag1 > 2 && mag2 > 2) { // filter micro-sensor noise
      const dot = (v1.x * v2.x + v1.y * v2.y) / (mag1 * mag2);
      const clampedDot = Math.max(-1, Math.min(1, dot));
      const angle = Math.acos(clampedDot); // 0 to PI

      totalDeltaAngle += angle;
      sampleCount++;

      // Sharp reversal or jerky redirection (> 100 degrees)
      if (angle > (100 * Math.PI) / 180) {
        jitterEvents++;
      }
    }
  }

  const averageAngleDelta = sampleCount > 0 ? Number((totalDeltaAngle / sampleCount).toFixed(2)) : 0;
  return { totalJitterEvents: jitterEvents, averageAngleDelta };
}

/**
 * Rage Click Detector:
 * ≥ 3 clicks on the same localized target (or within 30px) within 800ms
 */
export class RageClickDetector {
  constructor(threshold = 3, timeWindowMs = 800, radiusPx = 30) {
    this.threshold = threshold;
    this.timeWindowMs = timeWindowMs;
    this.radiusPx = radiusPx;
    this.clickHistory = [];
  }

  registerClick(x, y, targetTag, targetId, targetText) {
    const now = performance.now();
    this.clickHistory.push({ x, y, timestamp: now, targetTag, targetId, targetText });

    // Prune events outside time window
    this.clickHistory = this.clickHistory.filter(c => now - c.timestamp <= this.timeWindowMs);

    if (this.clickHistory.length >= this.threshold) {
      // Check spatial clustering
      const first = this.clickHistory[0];
      const isClustered = this.clickHistory.every(
        c => calculateEuclideanDistance(first, c) <= this.radiusPx
      );

      if (isClustered) {
        const rageEvent = {
          count: this.clickHistory.length,
          targetTag,
          targetId: targetId || 'unnamed',
          snippet: (targetText || '').slice(0, 35).trim(),
          timestamp: Math.round(now / 1000)
        };
        // Reset window to prevent duplicate reports for the same rapid burst
        this.clickHistory = [];
        return rageEvent;
      }
    }
    return null;
  }
}

/**
 * Dead Click Detector:
 * Clicks on non-interactive elements (p, span, div without onClick/cursor-pointer or button/a parent)
 */
export function isDeadClick(targetElement) {
  if (!targetElement) return false;

  // Walk up DOM tree up to 3 levels to find interactive elements
  let current = targetElement;
  let depth = 0;
  while (current && depth < 3) {
    const tag = current.tagName?.toUpperCase();
    if (tag === 'A' || tag === 'BUTTON' || tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
      return false;
    }
    if (current.onclick || current.getAttribute('role') === 'button') {
      return false;
    }
    const style = window.getComputedStyle(current);
    if (style && style.cursor === 'pointer') {
      return false;
    }
    current = current.parentElement;
    depth++;
  }

  // If clicked directly on text/images inside neutral container
  const directTag = targetElement.tagName?.toUpperCase();
  return ['P', 'SPAN', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'IMG', 'CODE'].includes(directTag);
}
