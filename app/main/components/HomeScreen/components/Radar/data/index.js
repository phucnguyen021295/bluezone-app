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

import {weakDots, normalDots, strongDots} from './dot';

const RSSI_LEVELS = [-70, -90];

const maxAllDots = Math.floor(
  (weakDots.length + normalDots.length + strongDots.length) / 1.25,
);

const isWeak = (rssi, rssiLevels = RSSI_LEVELS) => {
  return rssi <= rssiLevels[1];
};
const isNormal = (rssi, rssiLevels = RSSI_LEVELS) => {
  return rssi > rssiLevels[1] && rssi <= rssiLevels[0];
};
const isStrong = (rssi, rssiLevels = RSSI_LEVELS) => {
  return rssi > rssiLevels[0];
};

const getTypeDotByRSSI = (rssi, rssiLevels = RSSI_LEVELS) => {
  if (!RSSI_LEVELS) {
    rssiLevels = RSSI_LEVELS;
  }
  if (isWeak(rssi, rssiLevels)) {
    return 'weak';
  }
  if (isNormal(rssi, rssiLevels)) {
    return 'normal';
  }
  return 'strong';
};

const getNewTypeDot = (oldType, rssi) => {
  const newType = getTypeDotByRSSI(rssi);
  if (newType === oldType) {
    return newType;
  }

  let rssiLevels;
  if (oldType === 'weak') {
    rssiLevels = [RSSI_LEVELS[0], RSSI_LEVELS[1] + 5];
  }
  if (oldType === 'normal') {
    rssiLevels = [RSSI_LEVELS[0] + 5, RSSI_LEVELS[1] - 5];
  }
  if (oldType === 'strong') {
    rssiLevels = [RSSI_LEVELS[0] - 5, RSSI_LEVELS[1]];
  }
  return getTypeDotByRSSI(rssi, rssiLevels);
};

// Tra ve 1 so random trong khoang min, max
const getRandomArbitrary = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

const getRandomDotCount = count => {
  let min = 0;
  let max = 0;
  if (count <= 1) {
    min = 1;
    max = 3;
  } else if (count >= 2 && count <= 7) {
    min = count;
    max = count + 2;
  } else {
    const realAllDots = count >= maxAllDots ? maxAllDots : count;
    min = realAllDots;
    max = Math.floor(realAllDots * 1.25);
  }
  return getRandomArbitrary(min, max);
};

const getMaxCountByType = type => {
  if (type === 'strong') {
    return strongDots.length;
  }
  if (type === 'normal') {
    return normalDots.length;
  }
  if (type === 'weak') {
    return weakDots.length;
  }
  return 0;
};

const getRandomDotAmountSafe = (weakCount, normalCount, strongCount) => {
  const allDots = weakCount + normalCount + strongCount;
  const dotAmount = getRandomDotCount(allDots);

  // Tinh toan dam bao so luong Dot quet duong khong vuot qua so diem co the ve ra
  let remain = 0;
  // Neu so Strong Dot quet duoc nhieu hon so diem co the ve
  if (strongCount > strongDots.length) {
    remain = strongCount - strongDots.length;
    strongCount = strongDots.length;
  }
  // Day bot 1 phan Strong Dot sang Normal Dot neu thua
  normalCount = normalCount + remain;
  remain = 0;
  // Neu so Normal Dot quet duoc nhieu hon so diem co the ve
  if (normalCount > normalDots.length) {
    remain = normalCount - normalDots.length;
    normalCount = normalDots.length;
  }
  // Day bot 1 phan Normal Dot sang Weak Dot neu thua
  weakCount = weakCount + remain;
  // Neu so Weak Dot quet duoc vuot qua so diem co the ve thi chi giu lai so luong co the ve
  if (weakCount > weakDots.length) {
    weakCount = weakDots.length;
  }

  let fakeCount = dotAmount - allDots;
  const countObject = {
    weak: weakCount,
    normal: normalCount,
    strong: strongCount,
  };
  const dotTypes = ['weak', 'normal', 'strong'];
  const result = {};
  for (let j = 0; j < dotTypes.length; j++) {
    const type = dotTypes[j];
    const max = getMaxCountByType(type);
    let count = countObject[type];
    if (fakeCount > 0) {
      if (count + fakeCount <= max) {
        count = count + fakeCount;
        fakeCount = 0;
      } else {
        fakeCount = fakeCount - (max - count);
        count = max;
      }
    }
    result[type] = count;
  }

  return result;
};

const getRandomDotArr = (length, max) => {
  const arr = [];

  while (arr.length < length) {
    const r = Math.floor(Math.random() * max);
    if (arr.indexOf(r) === -1) {
      arr.push(r);
    }
  }
  return arr;
};

const getRandomDotIndex = (bzs = []) => {
  let weakCount = 0;
  let normalCount = 0;
  let strongCount = 0;

  for (let i = 0; i < bzs.length; i++) {
    const rssi = bzs[i];
    if (isWeak(rssi)) {
      weakCount++;
    } else if (isNormal(rssi)) {
      normalCount++;
    } else {
      strongCount++;
    }
  }

  const dotAmounts = getRandomDotAmountSafe(
    weakCount,
    normalCount,
    strongCount,
  );

  const weak = getRandomDotArr(dotAmounts.weakCount, weakDots.length);
  const normal = getRandomDotArr(dotAmounts.normalCount, normalDots.length);
  const strong = getRandomDotArr(dotAmounts.strongCount, strongDots.length);

  return {strong, normal, weak};
};

// NhatPA: Cac ham duoi day chi danh cho viec random cac fake Point, con cac real Point luon duoc giu nguyen.
const getRandomDotArrDontExistYet = (dotsExist = [], amount, max) => {
  const arr = [];

  while (arr.length < amount) {
    const r = Math.floor(Math.random() * max);
    if (dotsExist.indexOf(r) === -1 && arr.indexOf(r) === -1) {
      arr.push(r);
    }
  }
  return arr;
};

export {
  getRandomDotIndex,
  getRandomDotArrDontExistYet,
  getTypeDotByRSSI,
  getNewTypeDot,
  getRandomArbitrary,
  getRandomDotCount,
};
