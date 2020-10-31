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

function Faq(props) {
  const {color} = props;
  return (
    <Svg width="1em" height="1em" viewBox="0 0 27 20" {...props}>
      <G data-name="Group 9344">
        <G data-name="Rectangle 2421" fill="none" stroke={color}>
          <Rect width={27} height={20} rx={10} stroke="none" />
          <Rect x={0.5} y={0.5} width={26} height={19} rx={9.5} />
        </G>
        <Text
          transform="translate(14 13)"
          fill={color}
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

Faq.defaultProps = {
  color: '#707070',
};

export default Faq;
