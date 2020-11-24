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
import LottieView from 'lottie-react-native';

class Dot extends React.PureComponent {
  constructor(props) {
    super(props);
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.setRef = this.setRef.bind(this);
    this.onAnimationFinish = this.onAnimationFinish.bind(this);
    this.isPlaying = false;
    this.playAgain = false;
  }

  play() {
    const {dot} = this.props;
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.playAgain = false;

      if (dot.firstBeginFrame === 0) {
        this.ref && this.ref.play();
      } else {
        this.ref && this.ref.play(dot.firstBeginFrame, dot.firstEndFrame);
      }
    } else {
      this.playAgain = true;
    }
  }

  stop() {}

  onAnimationFinish() {
    const {dot, objectRadar} = this.props;

    if (this.playAgain) {
      this.isPlaying = true;
      this.playAgain = false;
      const timeNow = new Date().getTime();
      const radarFrame = Math.round(
        ((timeNow - objectRadar.timeStart) / 1000) * 30,
      );
      const k = dot.otherBeginFrame - radarFrame;

      if (dot.otherBeginFrame === 0 && dot.otherBeginFrame - k <= 0) {
        this.ref && this.ref.play();
      }

      // if (Math.abs(k) >= 4) {
      //   this.ref && this.ref.play(dot.otherBeginFrame - k, dot.otherEndFrame);
      // } else {
      //   this.ref && this.ref.play(dot.otherBeginFrame, dot.otherEndFrame);
      // }
      this.ref && this.ref.play(dot.otherBeginFrame - k, dot.otherEndFrame);
      return;
    }
    this.isPlaying = false;
  }

  setRef(ref) {
    this.ref = ref;
  }

  render() {
    const {dot, dotIndex, ...other} = this.props;
    return (
      <LottieView
        ref={this.setRef}
        source={dot}
        loop={false}
        onAnimationFinish={this.onAnimationFinish}
        renderMode="HARDWARE"
        {...other}
      />
    );
  }
}

export default Dot;
