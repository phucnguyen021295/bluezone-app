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

import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../../../core/utils/dimension';
import {blue_bluezone} from '../../../../core/color';

const APP_LIST_MARGIN_TOP = heightPercentageToDP((51 / 720) * 100);
const BTN_HEIGHT = heightPercentageToDP((54 / 720) * 100);
const BTN_PADDING_HORIZONTAL = widthPercentageToDP((49 / 360) * 100);

const styles = StyleSheet.create({
  contentContainerStyle: {
    marginTop: APP_LIST_MARGIN_TOP,
  },

  titleStyle: {
    paddingLeft: 10.2,
    color: '#ffffff',
  },

  buttonStyle: {
    backgroundColor: blue_bluezone,
    borderRadius: BTN_HEIGHT / 2,
    height: BTN_HEIGHT,
  },

  containerStyle: {
    paddingHorizontal: BTN_PADDING_HORIZONTAL,
  },
});

export default styles;
