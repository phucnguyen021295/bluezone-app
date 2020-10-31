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
import Svg, {G, Rect} from 'react-native-svg';

function Utilities(props) {
  const {color} = props;
  return (
    <Svg width="1em" height="1em" viewBox="0 0 17 17" {...props}>
      <G data-name="Group 9345" fill="none" stroke={color}>
        <G data-name="Rectangle 2497">
          <Rect width={7} height={7} rx={2} stroke="none" />
          <Rect x={0.5} y={0.5} width={6} height={6} rx={1.5} />
        </G>
        <G data-name="Rectangle 2500" transform="translate(0 10)">
          <Rect width={7} height={7} rx={2} stroke="none" />
          <Rect x={0.5} y={0.5} width={6} height={6} rx={1.5} />
        </G>
        <G data-name="Rectangle 2498" transform="translate(10)">
          <Rect width={7} height={7} rx={2} stroke="none" />
          <Rect x={0.5} y={0.5} width={6} height={6} rx={1.5} />
        </G>
        <G data-name="Rectangle 2499" transform="translate(10 10)">
          <Rect width={7} height={7} rx={2} stroke="none" />
          <Rect x={0.5} y={0.5} width={6} height={6} rx={1.5} />
        </G>
      </G>
    </Svg>
  );
}

Utilities.defaultProps = {
  color: '#707070',
};

export default Utilities;
