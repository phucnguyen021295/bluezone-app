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

function HomeActive(props) {
  const {color} = props;
  return (
    <Svg width="1em" height="1em" viewBox="0 0 21.244 18.916" {...props}>
      <G data-name="Group 9346">
        <G data-name="Group 9338">
          <Path
            data-name="Path 14013"
            d="M20.88 7.082C18.18 5.053 12.419.71 12.419.71a2.811 2.811 0 00-1.84-.71 2.807 2.807 0 00-1.84.71C3.101 4.926.365 7.082.365 7.082a.816.816 0 00-.226 1.133.814.814 0 00.681.364.818.818 0 00.452-.137l.727-.484v8.894a2.19 2.19 0 002.314 2.034c1.255.041 11.275.04 12.53 0a2.193 2.193 0 002.315-2.034V7.9l.817.545a.818.818 0 00.453.137.817.817 0 00.681-.364.817.817 0 00-.229-1.136zm-10.3 6.309a3.043 3.043 0 01-3.065-3.013 3.043 3.043 0 013.065-3.013 3.092 3.092 0 012.863 1.941 2.865 2.865 0 01.2 1.072 3.043 3.043 0 01-3.067 3.013z"
            fill={color}
          />
        </G>
      </G>
    </Svg>
  );
}

HomeActive.defaultProps = {
  color: '#015cd0',
};

export default HomeActive;
