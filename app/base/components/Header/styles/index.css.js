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

import {StyleSheet, Platform} from 'react-native';
import * as fontSize from '../../../../core/fontSize';
import {heightPercentageToDP} from '../../../../core/utils/dimension';
import {isIPhoneX} from '../../../../core/utils/isIPhoneX';

const HEADER_HEIGHT = heightPercentageToDP((70 / 720) * 100);
const HEADER_IPHONE_X_HEIGHT = heightPercentageToDP((50 / 720) * 100);
const HEADER_PADDING_TOP = heightPercentageToDP((37 / 720) * 100);
const HEADER_IPHONE_X_PADDING_TOP = heightPercentageToDP((17 / 720) * 100);
export const ICON_SIZE = heightPercentageToDP((23 / 720) * 100);

const styles = StyleSheet.create({
  container: {
    height: isIPhoneX ? HEADER_IPHONE_X_HEIGHT : HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  btnBack: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    height: isIPhoneX ? HEADER_IPHONE_X_HEIGHT : HEADER_HEIGHT,
    justifyContent: 'center',
    zIndex: 99,
    paddingTop: isIPhoneX ? HEADER_IPHONE_X_PADDING_TOP : HEADER_PADDING_TOP,
  },
  textTitle: {
    textAlign: 'center',
    color: '#015cd0',
    fontSize: fontSize.bigger,
  },
  icon: {
    paddingLeft: 20,
    paddingRight: 30,
    ...Platform.select({
      ios: {
        paddingTop: 5,
      },
    }),
  },
  title: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: isIPhoneX ? HEADER_IPHONE_X_PADDING_TOP : HEADER_PADDING_TOP,
  },
});

export default styles;
