(() => {
  // Themes the Employee Detail → Actions grid cards for the black portal design.
  //
  // The cards carry React INLINE styles (pastel background + a per-card accent).
  // We deliberately never write inline styles ourselves: React replaces the whole
  // style attribute on re-render, which would silently revert the theme.
  // Instead we emit CSS rules with `!important` — those beat React's non-important
  // inline styles and survive every re-render with no re-application needed.
  //
  // Per-card accents can't be expressed in static CSS, so each card is stamped with
  // a `data-acc="r-g-b"` attribute (React leaves unknown attributes alone) and a
  // matching rule is injected once per distinct accent.

  const CARD = "button.p-5.rounded-2xl.flex.flex-col.items-center.gap-3.text-center.transition-all";
  const SURFACE = "#050a14";
  const SURFACE_HOVER = "#0b1424";

  const emitted = new Set();
  let sheet = null;

  const styleSheetEl = () => {
    if (sheet) return sheet;
    const el = document.createElement("style");
    el.id = "employee-actions-theme-css";
    el.textContent = `
      /* Dark surface for every Actions card */
      ${CARD} {
        background: ${SURFACE} !important;
        box-shadow: none !important;
        transition: background .15s, border-color .15s !important;
      }
      ${CARD}:hover { background: ${SURFACE_HOVER} !important; }
      /* Neutral fallback border until the accent rule is stamped */
      ${CARD} { border: 1px solid #1e293b !important; }
      /* Icon chip: drop the white pill */
      ${CARD} > div {
        background: rgba(148, 163, 184, .10) !important;
        box-shadow: none !important;
      }
    `;
    document.head.appendChild(el);
    sheet = el;
    return el;
  };

  const parseRGB = (str) => {
    const m = String(str || "").match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i);
    return m ? { r: +m[1], g: +m[2], b: +m[3] } : null;
  };

  // Lift a dark accent to a readable lightness against a black surface.
  const brighten = ({ r, g, b }) => {
    const R = r / 255, G = g / 255, B = b / 255;
    const max = Math.max(R, G, B), min = Math.min(R, G, B);
    const l = (max + min) / 2, d = max - min;
    let h = 0, s = 0;
    if (d !== 0) {
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === R) h = ((G - B) / d + (G < B ? 6 : 0)) / 6;
      else if (max === G) h = ((B - R) / d + 2) / 6;
      else h = ((R - G) / d + 4) / 6;
    }
    const S = Math.min(1, Math.max(s, 0.68));
    const L = 0.66;
    const hue = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = L < 0.5 ? L * (1 + S) : L + S - L * S;
    const p = 2 * L - q;
    return {
      r: Math.round(hue(p, q, h + 1 / 3) * 255),
      g: Math.round(hue(p, q, h) * 255),
      b: Math.round(hue(p, q, h - 1 / 3) * 255),
    };
  };

  const emitAccentRule = (key, c) => {
    if (emitted.has(key)) return;
    emitted.add(key);
    const rgb = `rgb(${c.r}, ${c.g}, ${c.b})`;
    styleSheetEl().textContent += `
      ${CARD}[data-acc="${key}"] { border-color: rgba(${c.r}, ${c.g}, ${c.b}, .28) !important; }
      ${CARD}[data-acc="${key}"]:hover { border-color: rgba(${c.r}, ${c.g}, ${c.b}, .55) !important; }
      ${CARD}[data-acc="${key}"] > div {
        background: rgba(${c.r}, ${c.g}, ${c.b}, .14) !important;
        border: 1px solid rgba(${c.r}, ${c.g}, ${c.b}, .22) !important;
        color: ${rgb} !important;
      }
      ${CARD}[data-acc="${key}"] > div svg { color: ${rgb} !important; stroke: ${rgb} !important; }
      ${CARD}[data-acc="${key}"] > span { color: ${rgb} !important; }
    `;
  };

  const enhance = () => {
    const cards = document.querySelectorAll(CARD);
    if (!cards.length) return;
    cards.forEach((card) => {
      if (card.dataset.acc) return; // accent already resolved for this card
      // Read React's ORIGINAL accent from the inline style attribute. Our CSS never
      // touches the style attribute, so this value stays authoritative.
      const label = card.querySelector("span");
      const chip = card.querySelector("div");
      const raw = (label && label.style.color) || (chip && chip.style.color) || "rgb(37, 99, 235)";
      const base = parseRGB(raw);
      if (!base) return;
      const c = brighten(base);
      const key = `${c.r}-${c.g}-${c.b}`;
      emitAccentRule(key, c);
      card.setAttribute("data-acc", key);
    });
  };

  // Create the base stylesheet EAGERLY. The dark surface must not depend on
  // enhance() having run — the rule applies the moment the cards exist, so the
  // cards never flash pastel and a missed enhance() pass cannot leave them light.
  styleSheetEl();

  let queued = false;
  const observer = new MutationObserver(() => {
    if (queued) return;
    queued = true;
    // setTimeout rather than rAF: rAF is throttled to zero in background tabs,
    // which would stall accent stamping when the pane is hidden.
    setTimeout(() => { queued = false; enhance(); }, 0);
  });
  const start = () => {
    if (!document.body) { setTimeout(start, 10); return; }
    observer.observe(document.body, { childList: true, subtree: true });
    enhance();
  };
  start();

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", enhance, { once: true });
})();
