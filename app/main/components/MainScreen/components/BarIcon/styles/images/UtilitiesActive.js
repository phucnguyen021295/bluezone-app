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

function UtilitiesSvg(props) {
  const {color} = props;
  return (
    <Svg width="1em" height="1em" viewBox="0 0 17 17" {...props}>
      <G data-name="Group 9339" transform="translate(-171 -679)" fill={color}>
        <Rect
          data-name="Rectangle 2497"
          width={7}
          height={7}
          rx={2}
          transform="translate(171 679)"
        />
        <Rect
          data-name="Rectangle 2500"
          width={7}
          height={7}
          rx={2}
          m
          transform="translate(171 689)"
        />
        <Rect
          data-name="Rectangle 2498"
          width={7}
          height={7}
          rx={2}
          transform="translate(181 679)"
        />
        <Rect
          data-name="Rectangle 2499"
          width={7}
          height={7}
          rx={2}
          transform="translate(181 689)"
        />
      </G>
    </Svg>
  );
}

UtilitiesSvg.defaultProps = {
  color: '#015cd0',
};

export default UtilitiesSvg;
