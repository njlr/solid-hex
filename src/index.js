// "use strict";

// Based on code from http://www.redblobgames.com/grids/hexagons/

export const point = (x, y = x) => ({ x, y });

export const hex = (q, r, s = (0 - q - r)) => {
  console.assert(
    Math.abs(q + r + s) < 0.0001, 
    'q (' + q + '), r (' + r + ') and s (' + s + ') must sum to zero');
  return { q, r };
};

const s = (hex) => 0 - hex.q - hex.r;

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

export const neighbor = (hex, direction) => {
  return add(hex, direction(direction));
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
  let s = Math.trunc(Math.round(h.s));

  const q_diff = Math.abs(q - h.q);
  const r_diff = Math.abs(r - h.r);
  const s_diff = Math.abs(s - h.s);

  if (q_diff > r_diff && q_diff > s_diff) {
      q = -r - s;
  } else {
    if (r_diff > s_diff) {
        r = -q - s;
    } else {
        s = -q - r;
    }
  }

  return hex(q, r, s);
};

const lerp = (a, b, t) => {
  return hex(a.q * (1 - t) + b.q * t, a.r * (1 - t) + b.r * t);
}

function hex_linedraw(a, b) {
  let N = distance(a, b);
  let a_nudge = Hex(a.q + 0.000001, a.r + 0.000001, a.s - 0.000002);
  let b_nudge = Hex(b.q + 0.000001, b.r + 0.000001, b.s - 0.000002);
  let results = [];
  let step = 1.0 / Math.max(N, 1);
  for (let i = 0; i <= N; i++) {
    results.push(round(hex_lerp(a_nudge, b_nudge, step * i)));
  }
  return results;
}

function OffsetCoord(col, row) {
    return {col: col, row: row};
}

const EVEN = 1;
const ODD = -1;

function qoffset_from_cube(offset, h)
{
    var col = h.q;
    var row = h.r + Math.trunc((h.q + offset * (h.q & 1)) / 2);
    return OffsetCoord(col, row);
}

function qoffset_to_cube(offset, h)
{
    var q = h.col;
    var r = h.row - Math.trunc((h.col + offset * (h.col & 1)) / 2);
    var s = -q - r;
    return Hex(q, r, s);
}

function roffset_from_cube(offset, h)
{
    var col = h.q + Math.trunc((h.r + offset * (h.r & 1)) / 2);
    var row = h.r;
    return OffsetCoord(col, row);
}

function roffset_to_cube(offset, h)
{
    var q = h.col - Math.trunc((h.row + offset * (h.row & 1)) / 2);
    var r = h.row;
    var s = -q - r;
    return Hex(q, r, s);
}

const orientation = (f0, f1, f2, f3, b0, b1, b2, b3, startAngle) => ({
  f0, f1, f2, f3, b0, b1, b2, b3, startAngle,
});

export const layout = (orientation, size, origin) => ({
  orientation, size, origin,
});

export const pointyOrientation = orientation(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5);
export const flatOrientation = orientation(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0), 2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0);

const toPixel = (layout, hex) => {
  const M = layout.orientation;
  const size = layout.size;
  const origin = layout.origin;
  const x = (M.f0 * hex.q + M.f1 * hex.r) * size.x;
  const y = (M.f2 * hex.q + M.f3 * hex.r) * size.y;
  return point(x + origin.x, y + origin.y);
};

const toHex = (layout, p) => {
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




// Tests

// function complain(name) {
//     console.log("FAIL", name);
// }

// function equal_hex(name, a, b)
// {
//     if (!(a.q == b.q && a.s == b.s && a.r == b.r))
//     {
//         complain(name);
//     }
// }

// function equal_offsetcoord(name, a, b)
// {
//     if (!(a.col == b.col && a.row == b.row))
//     {
//         complain(name);
//     }
// }

// function equal_int(name, a, b)
// {
//     if (!(a == b))
//     {
//         complain(name);
//     }
// }

// function equal_hex_array(name, a, b)
// {
//     equal_int(name, a.length, b.length);
//     for (var i = 0; i < a.length; i++)
//     {
//         equal_hex(name, a[i], b[i]);
//     }
// }


// function test_hex_neighbor()
// {
//     equal_hex("hex_neighbor", Hex(1, -3, 2), hex_neighbor(Hex(1, -2, 1), 2));
// }

// function test_hex_diagonal()
// {
//     equal_hex("hex_diagonal", Hex(-1, -1, 2), hex_diagonal_neighbor(Hex(1, -2, 1), 3));
// }

// function test_round()
// {
//     var a = Hex(0, 0, 0);
//     var b = Hex(1, -1, 0);
//     var c = Hex(0, -1, 1);
//     equal_hex("round 1", Hex(5, -10, 5), round(hex_lerp(Hex(0, 0, 0), Hex(10, -20, 10), 0.5)));
//     equal_hex("round 2", round(a), round(hex_lerp(a, b, 0.499)));
//     equal_hex("round 3", round(b), round(hex_lerp(a, b, 0.501)));
//     equal_hex("round 4", round(a), round(Hex(a.q * 0.4 + b.q * 0.3 + c.q * 0.3, a.r * 0.4 + b.r * 0.3 + c.r * 0.3, a.s * 0.4 + b.s * 0.3 + c.s * 0.3)));
//     equal_hex("round 5", round(c), round(Hex(a.q * 0.3 + b.q * 0.3 + c.q * 0.4, a.r * 0.3 + b.r * 0.3 + c.r * 0.4, a.s * 0.3 + b.s * 0.3 + c.s * 0.4)));
// }

// function test_hex_linedraw()
// {
//     equal_hex_array("hex_linedraw", [Hex(0, 0, 0), Hex(0, -1, 1), Hex(0, -2, 2), Hex(1, -3, 2), Hex(1, -4, 3), Hex(1, -5, 4)], hex_linedraw(Hex(0, 0, 0), Hex(1, -5, 4)));
// }

// function test_layout()
// {
//     var h = Hex(3, 4, -7);
//     var flat = Layout(layout_flat, Point(10, 15), Point(35, 71));
//     equal_hex("layout", h, round(pixel_to_hex(flat, hex_to_pixel(flat, h))));
//     var pointy = Layout(layout_pointy, Point(10, 15), Point(35, 71));
//     equal_hex("layout", h, round(pixel_to_hex(pointy, hex_to_pixel(pointy, h))));
// }

// function test_conversion_roundtrip()
// {
//     var a = Hex(3, 4, -7);
//     var b = OffsetCoord(1, -3);
//     equal_hex("conversion_roundtrip even-q", a, qoffset_to_cube(EVEN, qoffset_from_cube(EVEN, a)));
//     equal_offsetcoord("conversion_roundtrip even-q", b, qoffset_from_cube(EVEN, qoffset_to_cube(EVEN, b)));
//     equal_hex("conversion_roundtrip odd-q", a, qoffset_to_cube(ODD, qoffset_from_cube(ODD, a)));
//     equal_offsetcoord("conversion_roundtrip odd-q", b, qoffset_from_cube(ODD, qoffset_to_cube(ODD, b)));
//     equal_hex("conversion_roundtrip even-r", a, roffset_to_cube(EVEN, roffset_from_cube(EVEN, a)));
//     equal_offsetcoord("conversion_roundtrip even-r", b, roffset_from_cube(EVEN, roffset_to_cube(EVEN, b)));
//     equal_hex("conversion_roundtrip odd-r", a, roffset_to_cube(ODD, roffset_from_cube(ODD, a)));
//     equal_offsetcoord("conversion_roundtrip odd-r", b, roffset_from_cube(ODD, roffset_to_cube(ODD, b)));
// }

// function test_offset_from_cube()
// {
//     equal_offsetcoord("offset_from_cube even-q", OffsetCoord(1, 3), qoffset_from_cube(EVEN, Hex(1, 2, -3)));
//     equal_offsetcoord("offset_from_cube odd-q", OffsetCoord(1, 2), qoffset_from_cube(ODD, Hex(1, 2, -3)));
// }

// function test_offset_to_cube()
// {
//     equal_hex("offset_to_cube even-", Hex(1, 2, -3), qoffset_to_cube(EVEN, OffsetCoord(1, 3)));
//     equal_hex("offset_to_cube odd-q", Hex(1, 2, -3), qoffset_to_cube(ODD, OffsetCoord(1, 2)));
// }

// function test_all()
// {
//     test_hex_arithmetic();
//     test_hex_direction();
//     test_hex_neighbor();
//     test_hex_diagonal();
//     test_distance();
//     test_hex_rotate_right();
//     test_hex_rotate_left();
//     test_round();
//     test_hex_linedraw();
//     test_layout();
//     test_conversion_roundtrip();
//     test_offset_from_cube();
//     test_offset_to_cube();
// }

// test_all()

// export default {
//   point,
//   hex,
//   add,
//   subtract,
//   scale,
//   rotateLeft,
//   rotateRight,
//   length,
//   distance,
//   adjacent,
//   round,
//   lerp,
//   toPixel,
//   pixelCorners,
// };

// Exports for node/browserify modules:

// exports.Point = Point;

// exports.Hex = Hex;
// exports.hex_add = hex_add;
// exports.hex_subtract = hex_subtract;
// exports.hex_scale = hex_scale;
// exports.hex_rotate_left = hex_rotate_left;
// exports.hex_rotate_right = hex_rotate_right;
// exports.hex_directions = hex_directions;
// exports.hex_direction = hex_direction;
// exports.hex_neighbor = hex_neighbor;
// exports.hex_diagonals = hex_diagonals;
// exports.hex_diagonal_neighbor = hex_diagonal_neighbor;
// exports.hex_length = hex_length;
// exports.distance = distance;
// exports.adjacent = adjacent;
// exports.round = round;
// exports.hex_lerp = hex_lerp;
// exports.hex_linedraw = hex_linedraw;

// exports.OffsetCoord = OffsetCoord;
// exports.EVEN = EVEN;
// exports.ODD = ODD;
// exports.qoffset_from_cube = qoffset_from_cube;
// exports.qoffset_to_cube = qoffset_to_cube;
// exports.roffset_from_cube = roffset_from_cube;
// exports.roffset_to_cube = roffset_to_cube;

// exports.Orientation = Orientation;

// exports.Layout = Layout;
// exports.layout_pointy = layout_pointy;
// exports.layout_flat = layout_flat;
// exports.hex_to_pixel = hex_to_pixel;
// exports.pixel_to_hex = pixel_to_hex;
// exports.hex_corner_offset = hex_corner_offset;
// exports.polygon_corners = polygon_corners;
