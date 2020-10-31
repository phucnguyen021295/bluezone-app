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
import Svg, {G, Circle, Path} from 'react-native-svg';

function Info(props) {
  const {color} = props;
  return (
    <Svg width="1em" height="1em" viewBox="0 0 20 20" {...props}>
      <G data-name="Group 9343">
        <G data-name="Group 8709" fill="none" stroke={color}>
          <G data-name="Ellipse 1468">
            <Circle cx={10} cy={10} r={10} stroke="none" />
            <Circle cx={10} cy={10} r={9.5} />
          </G>
          <Path data-name="Line 14" strokeWidth={2} d="M10.5 7.5v7" />
          <Path data-name="Line 15" strokeWidth={2} d="M10.5 4.5v2" />
        </G>
      </G>
    </Svg>
  );
}

Info.defaultProps = {
  color: '#707070',
};

export default Info;
