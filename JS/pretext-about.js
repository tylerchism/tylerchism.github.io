/**
 * Pretext POC — magazine-style circular text wrap for About section.
 *
 * Uses layoutNextLine() with per-line variable maxWidth to flow text
 * around a circular profile image. CSS cannot do this; Pretext can.
 */
import { prepareWithSegments, layoutNextLine } from 'https://esm.sh/@chenglou/pretext@0.0.2';

const ABOUT_TEXT =
  `I'm a fundamentalist by nature, constantly seeking unifying theories that ` +
  `explain and account for multiple paradigms. In practice, I'm an engineer ` +
  `who loves solving problems by getting hands dirty and putting in the work ` +
  `to create meaningful solutions.\n\n` +
  `I value emotional intelligence, curiosity, strong work ethic, and the ` +
  `motivation to continually grow and improve. Each day I work to enhance ` +
  `both my communication and technical skills while prioritizing mental ` +
  `and physical health.`;

const LINE_HEIGHT = 28;   // px — matches .pretext-line line-height
const FONT_SIZE   = 17;   // px — matches .pretext-line font-size
const IMG_SIZE    = 200;  // px — matches .about-pretext-img width/height
const IMG_GAP     = 20;   // px — gap between text column and image circle edge

function getLineMaxWidth(containerWidth, lineTop) {
  const imgRadius  = IMG_SIZE / 2;
  const imgCenterX = containerWidth - imgRadius;   // absolute X of circle center
  const imgCenterY = imgRadius;                    // absolute Y of circle center

  const lineMid    = lineTop + LINE_HEIGHT / 2;
  const dy         = lineMid - imgCenterY;

  if (Math.abs(dy) < imgRadius) {
    // Line midpoint is within the vertical span of the circle
    const halfChord      = Math.sqrt(Math.max(0, imgRadius * imgRadius - dy * dy));
    const circleLeftEdge = imgCenterX - halfChord;
    const available      = circleLeftEdge - IMG_GAP;
    // Never collapse line below 45% of container (handles narrow containers)
    return Math.max(available, containerWidth * 0.45);
  }

  return containerWidth;
}

function layoutAbout() {
  const body    = document.getElementById('about-pretext-body');
  const linesEl = document.getElementById('about-pretext-lines');
  if (!body || !linesEl) return;

  const containerWidth = body.offsetWidth;
  if (containerWidth < 100) return; // guard against hidden/zero-width

  // Mobile: Pretext layout disabled; CSS handles it via static stacking
  if (window.innerWidth <= 600) return;

  const font     = `${FONT_SIZE}px Inter, -apple-system, BlinkMacSystemFont, sans-serif`;
  const prepared = prepareWithSegments(ABOUT_TEXT, font);

  linesEl.innerHTML = '';

  let cursor = { segmentIndex: 0, graphemeIndex: 0 };
  let y      = 0;

  for (let safety = 0; safety < 200; safety++) {
    const maxWidth = getLineMaxWidth(containerWidth, y);
    const line     = layoutNextLine(prepared, cursor, maxWidth);

    if (line === null) break;

    // Guard against infinite loop on degenerate input
    if (
      line.end.segmentIndex === cursor.segmentIndex &&
      line.end.graphemeIndex === cursor.graphemeIndex
    ) break;

    const el       = document.createElement('div');
    el.className   = 'pretext-line';
    el.style.top   = `${y}px`;
    el.style.width = `${maxWidth}px`;
    el.textContent = line.text;
    linesEl.appendChild(el);

    cursor  = line.end;
    y      += LINE_HEIGHT;
  }

  // Size containers
  linesEl.style.height  = `${y}px`;
  body.style.minHeight  = `${Math.max(y, IMG_SIZE + LINE_HEIGHT)}px`;
}

// Wait for fonts before measuring, then lay out
async function init() {
  await document.fonts.ready;
  layoutAbout();
}

// Debounced resize
let resizeTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(layoutAbout, 120);
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
