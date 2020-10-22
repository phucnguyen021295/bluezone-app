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

import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {blue_bluezone} from '../../../../../core/color';

function IconBack(props) {
  const {color} = props;
  return (
    <Svg width="1em" height="1em" viewBox="0 0 8.779 15.041" {...props}>
      <G data-name="Group 9261">
        <Path
          data-name="Path 16286"
          d="M7.365 1.414L1.399 7.661l5.966 5.966"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={2}
        />
      </G>
    </Svg>
  );
}

IconBack.defaultProps = {
  color: blue_bluezone,
};

export default IconBack;
