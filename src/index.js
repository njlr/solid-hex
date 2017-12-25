export const point = (x, y = x) => {
  if (Number.isNaN(x)) {
    throw new Error('x must be a number');
  }
  if (Number.isNaN(y)) {
    throw new Error('y must be a number');
  }
  return { x, y };
};

export const hex = (q, r, s = (0 - q - r)) => {
  if (Number.isNaN(q)) {
    throw new Error('q must be a number');
  }
  if (Number.isNaN(r)) {
    throw new Error('r must be a number');
  }
  if (Number.isNaN(s)) {
    throw new Error('s must be a number');
  }
  if (Math.abs(q + r + s) > 0.0001) {
    throw new Error('q (' + q + '), r (' + r + ') and s (' + s + ') must sum to zero');
  }
  return { 
    q: q == 0 ? 0 : q, // Removes negative zero
    r: r == 0 ? 0 : r, 
  };
};

const s = (hex) => (0 - hex.q - hex.r);

export const add = (a, b) => {
  return hex(a.q + b.q, a.r + b.r);
};

export const subtract = (a, b) => {
  return hex(a.q - b.q, a.r - b.r);
};

export const scale = (a, k) => {
  return hex(a.q * k, a.r * k);
};

export const rotateLeft = (a) => hex(-s(a), -a.q);

export const rotateRight = (a) => hex(-a.r, -s(a));

const directions = [
  hex( 1,  0, -1),
  hex( 1, -1,  0),
  hex( 0, -1,  1),
  hex(-1,  0,  1),
  hex(-1,  1,  0),
  hex( 0,  1, -1),
];

export const direction = (direction) => {
  return directions[direction];
};

export const neighbor = (hex, d) => {
  return add(hex, direction(d));
};

const diagonals = [
  hex( 2, -1, -1),
  hex( 1, -2,  1),
  hex(-1, -1,  2),
  hex(-2,  1,  1),
  hex(-1,  2, -1),
  hex( 1,  1, -2),
];

export const diagonalNeighbor = (hex, direction) => {
  return add(hex, diagonals[direction]);
};

export const length = (hex) => {
  return Math.trunc((Math.abs(hex.q) + Math.abs(hex.r) + Math.abs(s(hex))) / 2);
};

export const distance = (a, b) => {
  return length(subtract(a, b));
};

export const adjacent = (a, b) => {
  return distance(a, b) == 1;
};

export const round = (h) => {

  let q = Math.trunc(Math.round(h.q));
  let r = Math.trunc(Math.round(h.r));
  let s = Math.trunc(Math.round(0 - h.q - h.r));

  const qDiff = Math.abs(q - h.q);
  const rDiff = Math.abs(r - h.r);
  const sDiff = Math.abs(s - h.q - h.r);

  if (qDiff > rDiff && qDiff > sDiff) {
    q = -r - s;
  } else {
    if (rDiff > sDiff) {
      r = -q - s;
    } else {
      s = -q - r;
    }
  }

  return hex(q, r);
};

export const lerp = (a, b, t) => {
  if (t < 0 || t > 1) {
    throw new RangeError('t must be between zero and one inclusive');
  }
  return hex(a.q * (1 - t) + b.q * t, a.r * (1 - t) + b.r * t);
};

export const lineDraw = (a, b) => {
  const N = distance(a, b);
  const aNudge = hex(a.q + 0.000001, a.r + 0.000001, s(a) - 0.000002);
  const bNudge = hex(b.q + 0.000001, b.r + 0.000001, s(b) - 0.000002);
  const results = [];
  const step = 1.0 / Math.max(N, 1);
  for (let i = 0; i <= N; i++) {
    results.push(round(lerp(aNudge, bNudge, step * i)));
  }
  return results;
};

export const offsetCoord = (col, row) => ({ col, row });

export const qOffsetFromCube = (offset, h) => {
  const col = h.q;
  const row = h.r + Math.trunc((h.q + offset * (h.q & 1)) / 2);
  return offsetCoord(col, row);
};

export const qOffsetToCube = (offset, h) => {
  const q = h.col;
  const r = h.row - Math.trunc((h.col + offset * (h.col & 1)) / 2);
  return hex(q, r);
};

export const rOffsetFromCube = (offset, h) => {
  const col = h.q + Math.trunc((h.r + offset * (h.r & 1)) / 2);
  const row = h.r;
  return offsetCoord(col, row);
};

export const rOffsetToCube = (offset, h) => {
  const q = h.col - Math.trunc((h.row + offset * (h.row & 1)) / 2);
  const r = h.row;
  return hex(q, r);
};

const orientation = (f0, f1, f2, f3, b0, b1, b2, b3, startAngle) => ({
  f0, f1, f2, f3, b0, b1, b2, b3, startAngle,
});

export const layout = (orientation, size, origin) => ({
  orientation, size, origin,
});

export const pointyOrientation = orientation(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5);
export const flatOrientation = orientation(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0), 2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0);

export const toPixel = (layout, hex) => {
  const M = layout.orientation;
  const size = layout.size;
  const origin = layout.origin;
  const x = (M.f0 * hex.q + M.f1 * hex.r) * size.x;
  const y = (M.f2 * hex.q + M.f3 * hex.r) * size.y;
  return point(x + origin.x, y + origin.y);
};

export const toHex = (layout, p) => {
  const M = layout.orientation;
  const size = layout.size;
  const origin = layout.origin;
  const pt = point((p.x - origin.x) / size.x, (p.y - origin.y) / size.y);
  const q = M.b0 * pt.x + M.b1 * pt.y;
  const r = M.b2 * pt.x + M.b3 * pt.y;
  return hex(q, r);
};

const cornerOffset = (layout, corner) => {
  const M = layout.orientation;
  const size = layout.size;
  const angle = 2.0 * Math.PI * (M.startAngle - corner) / 6;
  return point(size.x * Math.cos(angle), size.y * Math.sin(angle));
};

export const pixelCorners = (layout, h) => {
  const corners = [];
  const center = toPixel(layout, h);
  for (let i = 0; i < 6; i++) {
    const offset = cornerOffset(layout, i);
    corners.push(point(center.x + offset.x, center.y + offset.y));
  }
  return corners;
};
