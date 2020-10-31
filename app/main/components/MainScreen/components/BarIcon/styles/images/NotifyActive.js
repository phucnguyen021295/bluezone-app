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

function NotifyActive(props) {
  const {color} = props;
  return (
    <Svg width="1em" height="1em" viewBox="0 0 16.711 20.406" {...props}>
      <G data-name="Group 9347">
        <G data-name="icon SVG-05" fill={color}>
          <Path
            data-name="Path 184"
            d="M1.18 16.679l14.32-.029a1.182 1.182 0 001.212-1.118v-.012a1.692 1.692 0 00-.659-1.331 5.045 5.045 0 01-.937-2.83V8.406a6.769 6.769 0 00-4.9-6.5v-.042a1.858 1.858 0 00-3.716 0v.052a6.523 6.523 0 00-2.94 1.712 6.708 6.708 0 00-2 4.788v2.943a4.945 4.945 0 01-.956 2.866 1.831 1.831 0 00-.462.627 1.876 1.876 0 00-.136.669 1.181 1.181 0 001.174 1.158z"
          />
          <Path
            data-name="Path 185"
            d="M5.811 18.213c0 .044-.013.088-.013.133a2.353 2.353 0 002.562 2.061 2.353 2.353 0 002.562-2.061c0-.044-.01-.088-.013-.133z"
          />
        </G>
      </G>
    </Svg>
  );
}

NotifyActive.defaultProps = {
  color: '#015cd0',
};

export default NotifyActive;
