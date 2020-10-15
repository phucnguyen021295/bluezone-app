/*
 * @Project Bluezone
 * @Author Bluezone Global (contact@bluezone.ai)
 * @Createdate 04/26/2020, 16:36
 *
 * This file is part of Bluezone (https://bluezone.ai)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

const RADIUS = 295;
const RADIUS1B = RADIUS - 230;
const RADIUS2A = RADIUS - 150;
const RADIUS2B = RADIUS - 110;
const RADIUS3A = RADIUS - 45;
const RADIUS3B = RADIUS;
const CENTER_X = 380;
const CENTER_Y = 450;
const TIME_LOOP = 60;
const HALF_TIME_LOOP = TIME_LOOP / 2;
const ONE = Math.PI / 180;
const FRAMES = 60;

const dotSizes = {
  strong: 38,
  normal1: 32,
  normal2: 28,
  weak1: 25,
  weak2: 22,
};

// const sizeDot = {
//   strong: 36,
//   normal: 30,
//   weak: 24,
// };

const dotWrapper = {
  v: '5.7.1',
  fr: 30,
  ip: 0,
  op: 60,
  w: 720,
  h: 720,
  nm: 'Dot',
  ddd: 0,
  assets: [],
  layers: [],
  markers: [],
};

const getDotData = type => {
  const dotSize = dotSizes[type];
  return {
    ddd: 0,
    ind: 6,
    ty: 4,
    nm: 'Shape Layer 1',
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [],
        ix: 11,
      },
      r: {
        a: 0,
        k: 0,
        ix: 10,
      },
      p: {
        a: 0,
        k: [0, 0, 0],
        ix: 2,
      },
      a: {
        a: 0,
        k: [0, 0, 0],
        ix: 1,
      },
      s: {
        a: 0,
        k: [70, 70, 100],
        ix: 6,
      },
    },
    ao: 0,
    shapes: [
      {
        ty: 'gr',
        it: [
          {
            d: 1,
            ty: 'el',
            s: {
              a: 0,
              k: [dotSize, dotSize],
              ix: 2,
            },
            p: {
              a: 0,
              k: [0, 0],
              ix: 3,
            },
            nm: 'Ellipse Path 1',
            mn: 'ADBE Vector Shape - Ellipse',
            hd: false,
          },
          {
            ty: 'st',
            c: {
              a: 0,
              k: [1, 1, 1, 1],
              ix: 3,
            },
            o: {
              a: 0,
              k: 100,
              ix: 4,
            },
            w: {
              a: 0,
              k: 0,
              ix: 5,
            },
            lc: 1,
            lj: 1,
            ml: 4,
            bm: 0,
            nm: 'Stroke 1',
            mn: 'ADBE Vector Graphic - Stroke',
            hd: false,
          },
          {
            ty: 'fl',
            c: {
              a: 0,
              k: [1, 1, 1, 1],
              ix: 4,
            },
            o: {
              a: 0,
              k: 100,
              ix: 5,
            },
            r: 1,
            bm: 0,
            nm: 'Fill 1',
            mn: 'ADBE Vector Graphic - Fill',
            hd: false,
          },
          {
            ty: 'tr',
            p: {
              a: 0,
              k: [-27, -90],
              ix: 2,
            },
            a: {
              a: 0,
              k: [0, 0],
              ix: 1,
            },
            s: {
              a: 0,
              k: [100, 100],
              ix: 3,
            },
            r: {
              a: 0,
              k: 0,
              ix: 6,
            },
            o: {
              a: 0,
              k: 100,
              ix: 7,
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4,
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5,
            },
            nm: 'Transform',
          },
        ],
        nm: 'Ellipse 1',
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: 'ADBE Vector Group',
        hd: false,
      },
    ],
    ip: 0,
    op: 60,
    st: 0,
    bm: 0,
  };
};

const dotTimeline = {
  i: {
    x: [0.833],
    y: [0.833],
  },
  o: {
    x: [0.167],
    y: [0.167],
  },
  t: 0,
  s: [0],
};

const getDotXYInBottomLeft = (alpha, radius) => {
  const _alpha = ONE * (90 / alpha);
  const result = [];
  for (let i = 0; i < alpha; i++) {
    result.push({
      x: CENTER_X - Math.sin(_alpha * i) * radius,
      y: CENTER_Y + Math.cos(_alpha * i) * radius,
    });
  }
  return result;
};
const getDotXYInTopLeft = (alpha, radius) => {
  const _alpha = ONE * (90 / alpha);
  const result = [];
  for (let i = 0; i < alpha; i++) {
    result.push({
      x: CENTER_X - Math.cos(_alpha * i) * radius,
      y: CENTER_Y - Math.sin(_alpha * i) * radius,
    });
  }
  return result;
};
const getDotXYInTopRight = (alpha, radius) => {
  const _alpha = ONE * (90 / alpha);
  const result = [];
  for (let i = 0; i < alpha; i++) {
    result.push({
      x: CENTER_X + Math.sin(_alpha * i) * radius,
      y: CENTER_Y - Math.cos(_alpha * i) * radius,
    });
  }
  return result;
};
const getDotXYInBottomRight = (alpha, radius) => {
  const _alpha = ONE * (90 / alpha);
  const result = [];
  for (let i = 0; i < alpha; i++) {
    result.push({
      x: CENTER_X + Math.cos(_alpha * i) * radius,
      y: CENTER_Y + Math.sin(_alpha * i) * radius,
    });
  }
  return result;
};
const getDotXY = (alpha, radius) => {
  return [
    ...getDotXYInBottomLeft(alpha, radius),
    ...getDotXYInTopLeft(alpha, radius),
    ...getDotXYInTopRight(alpha, radius),
    ...getDotXYInBottomRight(alpha, radius),
  ];
};

const getDotXY3B = () => {
  return getDotXY(10, RADIUS3B);
};
const getDotXY3A = () => {
  return getDotXY(9, RADIUS3A);
};
const getDotXY2B = () => {
  return getDotXY(7, RADIUS2B);
};
const getDotXY2A = () => {
  return getDotXY(5, RADIUS2A);
};
const getDotXY1B = () => {
  return getDotXY(3, RADIUS1B);
};

const _getDots = (dotXYArr, type) => {
  const result = [];
  const dotXYArrLength = dotXYArr.length;
  for (let i = 0; i < dotXYArrLength; i++) {
    const firstStep = Math.ceil((TIME_LOOP / dotXYArrLength) * i);
    const tmp0 = firstStep; // Opacity 0
    const tmp1 = firstStep + 6; // Opacity 100
    const tmp2 = firstStep + (HALF_TIME_LOOP - 6); // Opacity 100
    let tmp3 = firstStep + HALF_TIME_LOOP; // Opacity 0

    let firstBeginFrame = 0;
    let firstEndFrame = 0;
    let otherBeginFrame = 0;
    let otherEndFrame = 0;
    let op = 0;
    let timeline = [];

    if (tmp3 <= TIME_LOOP) {
      timeline = [
        Object.assign({}, dotTimeline, {t: 0, s: [0]}),
        Object.assign({}, dotTimeline, {t: tmp0, s: [0]}),
        Object.assign({}, dotTimeline, {t: tmp1, s: [100]}),
        Object.assign({}, dotTimeline, {t: tmp2, s: [100]}),
        Object.assign({}, dotTimeline, {t: tmp3 === TIME_LOOP ? tmp3 - 1 : tmp3, s: [0]}),
        Object.assign({}, dotTimeline, {t: TIME_LOOP, s: [0]}),
      ];
      firstBeginFrame = 0;
      firstEndFrame = TIME_LOOP;
      otherBeginFrame = 0;
      otherEndFrame = TIME_LOOP;
      op = TIME_LOOP;
    } else {
      timeline = [
        Object.assign({}, dotTimeline, {t: 0, s: [0]}),
        Object.assign({}, dotTimeline, {t: tmp3 - TIME_LOOP, s: [0]}),
        Object.assign({}, dotTimeline, {t: tmp0, s: [0]}),
        Object.assign({}, dotTimeline, {t: tmp1, s: [100]}),
        Object.assign({}, dotTimeline, {t: tmp2, s: [100]}),
        Object.assign({}, dotTimeline, {t: tmp3 - 1, s: [0]}),
      ];
      firstBeginFrame = 0;
      firstEndFrame = tmp3;
      otherBeginFrame = tmp3 - TIME_LOOP;
      otherEndFrame = tmp3;
      op = tmp3;
    }

    const x = dotXYArr[i].x;
    const y = dotXYArr[i].y;

    const dotData = getDotData(type);
    const data = Object.assign({}, dotData, {
      op,
      nm: `Sharp_${type}_${i}`,
      ks: {o: {k: timeline}, p: {k: [x, y, 0]}},
    });
    const dot = Object.assign({}, dotWrapper, {
      op,
      nm: `Dot_${type}_${i}`,
      layers: [data],
      type,
      firstBeginFrame,
      firstEndFrame,
      otherBeginFrame,
      otherEndFrame,
    });

    result.push(dot);
  }
  return result;
};
const getDots3B = () => {
  return _getDots(getDotXY3B(), 'weak2');
};
const getDots3A = () => {
  return _getDots(getDotXY3A(), 'weak1');
};
const getDots2B = () => {
  return _getDots(getDotXY2B(), 'normal2');
};
const getDots2A = () => {
  return _getDots(getDotXY2A(), 'normal1');
};
const getDots1B = () => {
  return _getDots(getDotXY1B(), 'strong');
};

const strongDots = [...getDots1B()];
const normalDots = [...getDots2B(), ...getDots2A()];
const weakDots = [...getDots3B(), ...getDots3A()];

export {strongDots, normalDots, weakDots};
