/* ============================================================
   rethink-selectivity — main.js
   Handles: ToC scroll-spy, BibTeX toggle, shared canvas utils
   Interactive plots are in index.html inline scripts so they
   have direct access to their canvas elements after DOM load.
   ============================================================ */

'use strict';

/* ---- ToC scroll-spy ---- */
(function initToc() {
  const links = document.querySelectorAll('.toc nav a');
  if (!links.length) return;

  const sectionIds = Array.from(links)
    .map(a => a.getAttribute('href').replace('#', ''))
    .filter(Boolean);

  function onScroll() {
    const scrollY = window.scrollY;
    let current = sectionIds[0];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top < 140) {
        current = id;
      }
    });

    links.forEach(a => {
      const href = a.getAttribute('href').replace('#', '');
      a.classList.toggle('active', href === current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ---- BibTeX toggle ---- */
(function initBib() {
  const toggle = document.querySelector('.bib-toggle');
  const block  = document.querySelector('.bib-block');
  if (!toggle || !block) return;

  toggle.addEventListener('click', () => {
    const open = block.style.display === 'block';
    block.style.display = open ? 'none' : 'block';
    toggle.textContent  = open ? 'Show BibTeX ↓' : 'Hide BibTeX ↑';
  });
})();

document.querySelectorAll('.toc nav a').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      window.scrollTo({ top: el.offsetTop - 24, behavior: 'smooth' });
    }
  });
});

/* ============================================================
   Shared canvas utilities
   Used by the inline plot scripts in index.html
   ============================================================ */

/**
 * Set up a canvas for the device pixel ratio and return its 2D context.
 * @param {HTMLCanvasElement} canvas
 * @param {number} w  — CSS width in px
 * @param {number} h  — CSS height in px
 * @returns {CanvasRenderingContext2D}
 */
function setupCanvas(canvas, w, h) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width  = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width  = w + 'px';
  canvas.style.height = h + 'px';
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  return ctx;
}

// Seeded random — same sequence every time
function seededRand(seed) {
  let s = seed;
  return function() {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/**
 * Get the current CSS width of a canvas's parent element.
 */
function canvasWidth(canvas) {
  return canvas.parentElement.getBoundingClientRect().width || 400;
}

/**
 * Draw a box-and-whisker at position (cx, meanVal).
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} cx        — centre x
 * @param {number} q1        — lower quartile value
 * @param {number} q3        — upper quartile value
 * @param {number} mean      — median / mean value
 * @param {number} whiskerLo — lower whisker value
 * @param {number} whiskerHi — upper whisker value
 * @param {Function} toY     — maps data value → canvas y px
 * @param {number} bw        — box width in px
 * @param {string} color     — hex or rgba
 */
function drawBox(ctx, cx, q1, q3, mean, whiskerLo, whiskerHi, toY, bw, color) {
  const q1y  = toY(q1);
  const q3y  = toY(q3);
  const my   = toY(mean);
  const wLoy = toY(whiskerLo);
  const wHiy = toY(whiskerHi);

  // whiskers
  ctx.strokeStyle = color;
  ctx.lineWidth   = 1;
  ctx.beginPath();
  ctx.moveTo(cx, wLoy);
  ctx.lineTo(cx, q1y);
  ctx.moveTo(cx, q3y);
  ctx.lineTo(cx, wHiy);
  ctx.moveTo(cx - bw * 0.2, wLoy);
  ctx.lineTo(cx + bw * 0.2, wLoy);
  ctx.moveTo(cx - bw * 0.2, wHiy);
  ctx.lineTo(cx + bw * 0.2, wHiy);
  ctx.stroke();

  // IQR box
  ctx.fillStyle   = color + '28';
  ctx.strokeStyle = color;
  ctx.lineWidth   = 1.5;
  ctx.fillRect(cx - bw / 2, q3y, bw, q1y - q3y);
  ctx.strokeRect(cx - bw / 2, q3y, bw, q1y - q3y);

  // median line
  ctx.beginPath();
  ctx.moveTo(cx - bw / 2, my);
  ctx.lineTo(cx + bw / 2, my);
  ctx.lineWidth = 2.5;
  ctx.stroke();
}

/**
 * Draw scatter jitter points over a box.
 * @param {CanvasRenderingContext2D} ctx
 * @param {number[]} values  — array of data values
 * @param {number} cx        — centre x
 * @param {number} bw        — jitter width
 * @param {Function} toY
 * @param {string} color
 */
function drawJitter(ctx, values, cx, bw, toY, color) {
  values.forEach(v => {
    const jx = cx + (Math.random() - 0.5) * bw * 0.55;
    const py = toY(v);
    ctx.beginPath();
    ctx.arc(jx, py, 3, 0, 2 * Math.PI);
    ctx.fillStyle = color + 'aa';
    ctx.fill();
  });
}

/**
 * Draw axis labels.
 */
function drawAxisLabel(ctx, text, x, y, opts = {}) {
  ctx.save();
  ctx.font      = (opts.size || 11) + 'px -apple-system, sans-serif';
  ctx.fillStyle = opts.color || 'rgba(0,0,0,0.45)';
  ctx.textAlign = opts.align || 'center';
  if (opts.rotate) {
    ctx.translate(x, y);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(text, 0, 0);
  } else {
    ctx.fillText(text, x, y);
  }
  ctx.restore();
}

/**
 * Draw a dashed horizontal reference line.
 */
function drawDashedLine(ctx, y, x0, x1, color, label) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth   = 1;
  ctx.setLineDash([4, 3]);
  ctx.beginPath();
  ctx.moveTo(x0, y);
  ctx.lineTo(x1, y);
  ctx.stroke();
  ctx.setLineDash([]);
  if (label) {
    ctx.font      = '9px -apple-system, sans-serif';
    ctx.fillStyle = color;
    ctx.textAlign = 'left';
    ctx.fillText(label, x0 + 4, y - 3);
  }
  ctx.restore();
}

/**
 * RDM color: red for high positive, blue for low/negative R.
 */
function rdmColor(r) {
  if (r === null || r === undefined) return 'transparent';
  const t = Math.max(-1, Math.min(1, r));
  if (t >= 0) {
    const v = Math.round(255 * (1 - t));
    return `rgb(255,${v},${v})`;
  } else {
    const v = Math.round(255 * (1 + t));
    return `rgb(${v},${v},255)`;
  }
}

/* ---- Redraw all plots on resize ---- */
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (typeof window.redrawAllPlots === 'function') {
      window.redrawAllPlots();
    }
  }, 120);
});

/* ---- Copy BibTex ---- */
function copyBibtex() {
  const text = document.querySelector('.bib-block').textContent;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.querySelector('[onclick="copyBibtex()"]');
    btn.textContent = 'Copied ✓';
    setTimeout(() => btn.textContent = 'Copy BibTeX', 2000);
  });
}

/* ---- Reveal figure tabs ---- */
// Reverse map: slug → panel ID (computed from PANEL_SLUGS in constants.js)
const SLUG_TO_PANEL = Object.fromEntries(
  Object.entries(typeof PANEL_SLUGS !== 'undefined' ? PANEL_SLUGS : {}).map(([k, v]) => [v, k])
);

function showTab(btn, panelId, { scroll = false, pushHistory = true } = {}) {
  const tabs = btn.closest('.reveal-tabs');
  const panel = document.getElementById(panelId);
  const isActive = btn.classList.contains('active');

  tabs.querySelectorAll('.reveal-btn').forEach(b => b.classList.remove('active'));
  tabs.parentElement.querySelectorAll('.reveal-panel').forEach(p => p.style.display = 'none');

  if (!isActive) {
    btn.classList.add('active');
    panel.style.display = 'block';
    if (typeof window.redrawAllPlots === 'function') window.redrawAllPlots();
    if (pushHistory) {
      const slug = (typeof PANEL_SLUGS !== 'undefined' && PANEL_SLUGS[panelId]) || panelId;
      history.replaceState(null, '', '#' + slug);
    }
    if (scroll) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    const section = tabs.closest('section');
    if (pushHistory) history.replaceState(null, '', section ? '#' + section.id : location.pathname);
  }
}

function navigateToHash(hash) {
  const raw = hash.replace(/^#/, '');
  if (!raw) return;
  // Resolve slug → panel ID, falling back to treating raw as a direct ID
  const panelId = SLUG_TO_PANEL[raw] || raw;
  const el = document.getElementById(panelId);
  if (!el) return;
  if (el.classList.contains('reveal-panel')) {
    const section = el.closest('section') || el.parentElement;
    const btn = section && [...section.querySelectorAll('.reveal-btn')]
      .find(b => (b.getAttribute('onclick') || '').includes("'" + panelId + "'"));
    if (btn) showTab(btn, panelId, { scroll: true, pushHistory: false });
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}