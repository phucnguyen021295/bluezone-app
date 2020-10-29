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
import * as fontSize from '../../../../core/fontSize';
import * as color from '../../../../core/color';
import {heightPercentageToDP} from '../../../../core/utils/dimension';

const BTN_HEIGHT = heightPercentageToDP((46 / 720) * 100);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  title: {
    fontSize: fontSize.fontSize16,
    paddingTop: 28,
    paddingBottom: 6
  },

  contentContainerStyle: {
    paddingHorizontal: 20,
  },

  containerStyle: {
    height: BTN_HEIGHT,
    backgroundColor: color.blue_bluezone,
    justifyContent: 'center',
    borderRadius: 12,
    marginHorizontal: 26,
    marginTop: 30,
    marginBottom: 47
  },

  containerStyleNCNB: {
    height: 33,
    backgroundColor: '#f8b123',
    borderRadius: 9,
    justifyContent: 'center',
  },

  textInvite: {
    color: '#ffffff',
    fontSize: fontSize.normal
  },

  textInviteNCNB: {
    color: '#ffffff',
    fontSize: fontSize.small
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 15,
  },
  item: {
    alignItems: 'center',
    width: '33%',
  },
  itemImage: {
    width: 60,
    height: 60,
  },

  itemText: {
    color: '#AAAAAA',
    fontSize: 12,
    paddingVertical: 5,
  },
});

export default styles;
