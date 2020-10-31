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
import Svg, {G, Rect, Text, TSpan} from 'react-native-svg';

function FaqActive(props) {
  const {color} = props;
  return (
    <Svg width="1em" height="1em" viewBox="0 0 27 20" {...props}>
      <G data-name="Group 9348" transform="translate(-2663 -7112)">
        <Rect
          data-name="Rectangle 2421"
          width={27}
          height={20}
          rx={10}
          transform="translate(2663 7112)"
          fill={color}
        />
        <Text
          transform="translate(2677 7125)"
          fill="#fff"
          fontSize={9}
          fontFamily="Roboto-Bold, Roboto"
          fontWeight={700}>
          <TSpan x={-8.378} y={0}>
            {'FAQ'}
          </TSpan>
        </Text>
      </G>
    </Svg>
  );
}

FaqActive.defaultProps = {
  color: '#015cd0',
};

export default FaqActive;
