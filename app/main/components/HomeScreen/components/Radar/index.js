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

import React from 'react';
import {Platform, TouchableOpacity} from 'react-native';
import * as PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';

// Components
import Dot from './Dot';

// Apis
import Service from '../../../../../core/apis/service';

// Styles
import style from '../../styles/index.css';
import {injectIntl, intlShape} from 'react-intl';

// Data
import radar from './data/radar';
import radarOutline from './data/radarOutline';
import {
  radarBackground1,
  radarBackground2,
  radarBackground3,
  radarBackground4,
} from './data/radarBackground';
import {weakDots, normalDots, strongDots} from './data/dot';
import {
  getRandomDotArrDontExistYet,
  getNewTypeDot,
  getTypeDotByRSSI,
  getRandomDotCount,
} from './data';
import {dev} from '../../../../../core/apis/server';
import {isIPhoneX} from '../../../../../core/utils/isIPhoneX';
import configuration from '../../../../../configuration';
import {
  SCANNING_EN_HEIGHT,
  SCANNING_VI_HEIGHT,
  BOTTOM_IPHONEX_HEIGHT,
} from '../../styles/index.css';

// Const
const TIMEOUT = 30000;
const RADAR_LEVELS = [2, 6, 10];
export let logBlueZone = [];
const RADAR_HEIGHT_VI = isIPhoneX
  ? SCANNING_VI_HEIGHT - BOTTOM_IPHONEX_HEIGHT
  : SCANNING_VI_HEIGHT;
const RADAR_HEIGHT_EN = isIPhoneX
  ? SCANNING_EN_HEIGHT - BOTTOM_IPHONEX_HEIGHT
  : SCANNING_EN_HEIGHT;

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.mapDevice = {};
    this.onScan = this.onScan.bind(this);
    this.onRadarAnimationFinish = this.onRadarAnimationFinish.bind(this);
    this.setDotRef = this.setDotRef.bind(this);
    this.setWeakDotRef = this.setWeakDotRef.bind(this);
    this.setNormalDotRef = this.setNormalDotRef.bind(this);
    this.setStrongDotRef = this.setStrongDotRef.bind(this);
    this.setRadarRef = this.setRadarRef.bind(this);
    this.radarRef = {play: () => {}};

    this.state = {
      levelRadar: 1,
    };

    this.dotRefArr = {
      weak: [],
      normal: [],
      strong: [],
    };
    this.currentDots = [];
    this.realDots = {
      weak: [],
      normal: [],
      strong: [],
    };
    this.fakeDots = {
      weak: [],
      normal: [],
      strong: [],
    };
    this.blueZoners = {};
    this.objectRadar = {};
  }

  componentDidMount() {
    logBlueZone = [];
    this.scanBLEListener = Service.addListenerScanBLE(this.onScan);
    if (Platform.OS === 'android') {
      this.scanBluetoothListener = Service.addListenerScanBluetooth(
        this.onScan,
      );
    }
  }

  componentWillUnmount() {
    this.scanBLEListener && this.scanBLEListener.remove();
    this.scanBluetoothListener && this.scanBluetoothListener.remove();
    const keys = Object.keys(this.mapDevice);
    for (let i = 0; i < keys.length; i++) {
      clearTimeout(this.mapDevice[keys[i]].timer);
      delete this.mapDevice[keys[i]];
    }
  }

  getAllDotType = type => {
    return [...this.realDots[type].map(d => d.dot), ...this.fakeDots[type]];
  };

  addRealDotInRadar = (type, id) => {
    let max = 0;
    switch (type) {
      case 'strong': {
        max = strongDots.length;
        break;
      }
      case 'normal': {
        max = normalDots.length;
        break;
      }
      case 'weak': {
        max = weakDots.length;
        break;
      }
    }

    const dot = getRandomDotArrDontExistYet(
      this.getAllDotType(type),
      1,
      max,
    )[0];
    this.realDots[type].push({
      dot: dot,
      id: id,
    });
  };

  removeRealDotInRadar = (type, id) => {
    const indexDot = this.realDots[type].findIndex(d => d.id === id);
    this.realDots[type].splice(indexDot, 1);
  };

  changeLevelRadar = countBluezoner => {
    const {levelRadar} = this.state;
    if (levelRadar !== this.getLevelRadar(countBluezoner)) {
      this.setState({levelRadar: this.getLevelRadar(countBluezoner)});
    }
  };

  getLevelRadar = count => {
    let i = 0;
    while (i < RADAR_LEVELS.length) {
      if (count <= RADAR_LEVELS[i]) {
        return i + 1;
      }
      i++;
    }
    return 4;
  };

  addFakeDotsInRadar = count => {
    let countRemind = count;
    const dotTypes = Object.keys(this.realDots);
    for (let j = 0; j < dotTypes.length; j++) {
      const type = dotTypes[j];
      if (countRemind > 0) {
        let k = 0;
        const max = this.getMaxCountByType(type);
        if (this.getDotCountByType(type) + countRemind <= max) {
          k = countRemind;
          countRemind = 0;
        } else {
          k = max - this.getDotCountByType(type);
          countRemind = countRemind - k;
        }

        const dots = getRandomDotArrDontExistYet(
          this.getAllDotType(type),
          k,
          max,
        );
        this.fakeDots[type].push(...dots);
      }
    }
  };

  removeFakeDotsInRadar = count => {
    const dotTypes = Object.keys(this.realDots);
    let k = count;
    for (let j = 0; j < dotTypes.length; j++) {
      const type = dotTypes[j];
      if (this.fakeDots[type].length > 0) {
        this.fakeDots[type].pop();
        k--;
        if (k === 0) {
          return;
        }
      }
    }
  };

  onScan({id, name = '', address = '', rssi = 0, platform, typeScan}) {
    const keyMap = id && id.length > 0 ? id : name + '@' + address;
    if (this.mapDevice[keyMap]) {
      // Xóa timer cũ
      clearTimeout(this.mapDevice[keyMap].timer);
      delete this.mapDevice[keyMap];
    } else {
      if (keyMap === id) {
        this.blueZoners[id] = rssi;
      }
    }

    let hasDevice = false;
    let indexDevice;
    for (let i = 0; i < logBlueZone.length; i++) {
      if (
        logBlueZone[i].userId === id &&
        logBlueZone[i].name === name &&
        logBlueZone[i].address === address
      ) {
        hasDevice = true;
        indexDevice = i;
      }
    }

    const type = getTypeDotByRSSI(rssi);
    if (!hasDevice) {
      // Thêm vào danh sách
      logBlueZone.push({
        id: keyMap,
        userId: id,
        name,
        address,
        rssi,
        platform,
        typeScan,
        typeRSSI: type,
      });
      this.changeLevelRadar(logBlueZone.length);
      this.addRealDotInRadar(type, keyMap);
    } else {
      const oldTypeRSSI = logBlueZone[indexDevice].typeRSSI;
      const newTypeRSSI = getNewTypeDot(oldTypeRSSI, rssi);

      if (oldTypeRSSI !== newTypeRSSI) {
        this.removeRealDotInRadar(oldTypeRSSI, keyMap);
        this.addRealDotInRadar(newTypeRSSI, keyMap);
        logBlueZone[indexDevice].typeRSSI = newTypeRSSI;
      }

      // Sửa lại danh sách
      logBlueZone[indexDevice].rssi = rssi;
    }

    // Thêm timer
    const timer = setTimeout(() => {
      delete this.mapDevice[keyMap];
      // Xóa khỏi danh sách thiết bị
      for (let i = 0; i < logBlueZone.length; i++) {
        if (
          logBlueZone[i].userId === id &&
          logBlueZone[i].name === name &&
          logBlueZone[i].address === address
        ) {
          this.removeRealDotInRadar(
            getTypeDotByRSSI(logBlueZone[i].rssi),
            keyMap,
          );
          logBlueZone.splice(i, 1);
          this.changeLevelRadar(logBlueZone.length);
        }
      }

      if (keyMap === id) {
        delete this.blueZoners[id];
      }
    }, TIMEOUT);

    this.mapDevice[keyMap] = {
      timer,
      time: new Date().getTime(),
    };
  }

  getMaxCountByType = type => {
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

  getDotCountByType = type => {
    return this.realDots[type].length + this.fakeDots[type].length;
  };

  getRealDotCount = () => {
    return (
      this.realDots.weak.length +
      this.realDots.normal.length +
      this.realDots.strong.length
    );
  };

  getFakeDotCount = () => {
    return (
      this.fakeDots.weak.length +
      this.fakeDots.normal.length +
      this.fakeDots.strong.length
    );
  };

  onRadarAnimationFinish() {
    const realDotCount = this.getRealDotCount();
    const fakeDotCount = this.getFakeDotCount();
    const fakeDotCountRequired = getRandomDotCount(realDotCount) - realDotCount;

    if (fakeDotCount < fakeDotCountRequired) {
      // Add fake dot
      this.addFakeDotsInRadar(fakeDotCountRequired - fakeDotCount);
    }
    if (fakeDotCount > fakeDotCountRequired) {
      // Remove fake dot
      this.removeFakeDotsInRadar(fakeDotCount - fakeDotCountRequired);
    }

    const dotTypes = Object.keys(this.realDots);
    for (let j = 0; j < dotTypes.length; j++) {
      const type = dotTypes[j];
      for (let i = 0; i < this.realDots[type].length; i++) {
        const newDotIndex = this.realDots[type][i].dot;
        this.dotRefArr[type][newDotIndex] &&
          this.dotRefArr[type][newDotIndex].play();
      }

      for (let i = 0; i < this.fakeDots[type].length; i++) {
        const newDotIndex = this.fakeDots[type][i];
        this.dotRefArr[type][newDotIndex] &&
          this.dotRefArr[type][newDotIndex].play();
      }
    }

    // Play radar
    this.radarRef.play();
    this.objectRadar.timeStart = new Date().getTime();
  }

  setDotRef(type, dotIndex, ref) {
    this.dotRefArr[type][dotIndex] = ref;
  }

  setWeakDotRef(dotIndex, ref) {
    this.setDotRef('weak', dotIndex, ref);
  }

  setNormalDotRef(dotIndex, ref) {
    this.setDotRef('normal', dotIndex, ref);
  }

  setStrongDotRef(dotIndex, ref) {
    this.setDotRef('strong', dotIndex, ref);
  }

  setRadarRef(ref) {
    this.radarRef = ref;
  }

  onOpenScanScreen = () => {
    dev &&
      this.props.navigation.navigate('WatchScan', {
        logs: logBlueZone,
      });
  };

  getSourceBackgroundRadar = levelRadar => {
    if (levelRadar === 1) {
      return radarBackground1;
    }
    if (levelRadar === 2) {
      return radarBackground2;
    }
    if (levelRadar === 3) {
      return radarBackground3;
    }
    if (levelRadar === 4) {
      return radarBackground4;
    }
  };

  render() {
    const {Language} = configuration;
    const {levelRadar} = this.state;

    return (
      <TouchableOpacity
        style={[
          style.circleScan,
          {
            width: Language === 'vi' ? RADAR_HEIGHT_VI : RADAR_HEIGHT_EN,
            height: Language === 'vi' ? RADAR_HEIGHT_VI : RADAR_HEIGHT_EN,
          },
        ]}
        activeOpacity={1}
        onPress={this.onOpenScanScreen}>
        <LottieView
          loop={false}
          source={radarOutline}
          autoPlay
          renderMode="HARDWARE"
        />
        <LottieView
          loop={false}
          source={this.getSourceBackgroundRadar(1)}
          autoPlay
          renderMode="HARDWARE"
        />
        <LottieView
          loop={false}
          source={this.getSourceBackgroundRadar(levelRadar)}
          autoPlay
          renderMode="HARDWARE"
        />
        <LottieView
          ref={this.setRadarRef}
          loop={false}
          source={radar}
          onAnimationFinish={this.onRadarAnimationFinish}
          autoPlay
          renderMode="HARDWARE"
        />
        {strongDots.map((dot, index) => {
          return (
            <Dot
              key={dot.nm}
              dot={dot}
              dotIndex={index}
              ref={ref => this.setStrongDotRef(index, ref)}
              objectRadar={this.objectRadar}
            />
          );
        })}
        {normalDots.map((dot, index) => {
          return (
            <Dot
              key={dot.nm}
              dot={dot}
              dotIndex={index}
              ref={ref => this.setNormalDotRef(index, ref)}
              objectRadar={this.objectRadar}
            />
          );
        })}
        {weakDots.map((dot, index) => {
          return (
            <Dot
              key={dot.nm}
              dot={dot}
              dotIndex={index}
              ref={ref => this.setWeakDotRef(index, ref)}
              objectRadar={this.objectRadar}
            />
          );
        })}
      </TouchableOpacity>
    );
  }
}

Index.propTypes = {
  intl: intlShape.isRequired,
};

Index.defaultProps = {};

Index.contextTypes = {
  language: PropTypes.string,
};

export default injectIntl(Index);
