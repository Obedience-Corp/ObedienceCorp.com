// 8×8 hex glyphs from Panel Rain. Bit 7 is leftmost.
const HEX8: number[][] = [
  [0x3c, 0x66, 0x6e, 0x76, 0x66, 0x66, 0x3c, 0x00],
  [0x18, 0x38, 0x18, 0x18, 0x18, 0x18, 0x7e, 0x00],
  [0x3c, 0x66, 0x06, 0x1c, 0x30, 0x66, 0x7e, 0x00],
  [0x3c, 0x66, 0x06, 0x1c, 0x06, 0x66, 0x3c, 0x00],
  [0x0c, 0x1c, 0x3c, 0x6c, 0x7e, 0x0c, 0x0c, 0x00],
  [0x7e, 0x60, 0x7c, 0x06, 0x06, 0x66, 0x3c, 0x00],
  [0x3c, 0x66, 0x60, 0x7c, 0x66, 0x66, 0x3c, 0x00],
  [0x7e, 0x06, 0x0c, 0x18, 0x30, 0x30, 0x30, 0x00],
  [0x3c, 0x66, 0x66, 0x3c, 0x66, 0x66, 0x3c, 0x00],
  [0x3c, 0x66, 0x66, 0x3e, 0x06, 0x66, 0x3c, 0x00],
  [0x18, 0x3c, 0x66, 0x66, 0x7e, 0x66, 0x66, 0x00],
  [0x7c, 0x66, 0x66, 0x7c, 0x66, 0x66, 0x7c, 0x00],
  [0x3c, 0x66, 0x60, 0x60, 0x60, 0x66, 0x3c, 0x00],
  [0x78, 0x6c, 0x66, 0x66, 0x66, 0x6c, 0x78, 0x00],
  [0x7e, 0x60, 0x60, 0x7c, 0x60, 0x60, 0x7e, 0x00],
  [0x7e, 0x60, 0x60, 0x7c, 0x60, 0x60, 0x60, 0x00],
];

type Drop = {
  x: number;
  y: number;
  speed: number;
  length: number;
  seed: number;
};

const CELL = 3;
const GLYPH = 8 * CELL + 6;

function drawGlyph(
  ctx: CanvasRenderingContext2D,
  digit: number,
  x: number,
  y: number,
  alpha: number,
) {
  const rows = HEX8[digit & 15];
  ctx.fillStyle = `rgba(255,255,255,${alpha})`;
  for (let r = 0; r < 8; r++) {
    const bits = rows[r];
    for (let c = 0; c < 8; c++) {
      if (bits & (0x80 >> c)) {
        ctx.fillRect(x + c * CELL, y + r * CELL, CELL, CELL);
      }
    }
  }
}

function sizeCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  canvas.width = Math.floor(w * dpr);
  canvas.height = Math.floor(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { w, h };
}

export function startRain(canvas: HTMLCanvasElement) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    canvas.remove();
    return () => {};
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  let { w, h } = sizeCanvas(canvas, ctx);
  const colW = GLYPH + 10;
  let drops: Drop[] = [];

  const seed = () => {
    drops = [];
    const narrow = w < 700;
    const cols = Math.max(narrow ? 14 : 8, Math.floor(w / colW));
    const keep = narrow ? 0.82 : 0.58;
    for (let i = 0; i < cols; i++) {
      if (Math.random() > keep) continue;
      drops.push({
        x: i * colW + 2,
        y: Math.random() * h * 1.4 - h * 0.4,
        speed: 0.28 + Math.random() * 0.9,
        length: 5 + Math.floor(Math.random() * 12),
        seed: (i * 17 + 13) | 0,
      });
    }
  };

  seed();

  let running = true;
  let raf = 0;
  let last = performance.now();

  const draw = (now: number) => {
    if (!running) return;
    const dt = Math.min(48, now - last);
    last = now;

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, w, h);

    for (const d of drops) {
      d.y += d.speed * (dt / 16);
      if (d.y - d.length * GLYPH > h) {
        d.y = -Math.random() * 120;
        d.speed = 0.28 + Math.random() * 0.9;
      }
      for (let i = 0; i < d.length; i++) {
        const gy = d.y - i * GLYPH;
        if (gy < -GLYPH || gy > h) continue;
        const head = i === 0;
        const alpha = head ? 0.95 : Math.max(0.07, 0.42 - i * 0.032);
        const digit = (d.seed * 1103515245 + i * 12347 + Math.floor(gy * 13)) >>> 0 & 15;
        drawGlyph(ctx, digit, d.x, gy, alpha);
      }
    }

    raf = requestAnimationFrame(draw);
  };

  const onResize = () => {
    ({ w, h } = sizeCanvas(canvas, ctx));
    seed();
  };

  const onVis = () => {
    if (document.hidden) {
      running = false;
      cancelAnimationFrame(raf);
    } else {
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(draw);
    }
  };

  window.addEventListener("resize", onResize);
  document.addEventListener("visibilitychange", onVis);
  raf = requestAnimationFrame(draw);

  return () => {
    running = false;
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", onResize);
    document.removeEventListener("visibilitychange", onVis);
  };
}
