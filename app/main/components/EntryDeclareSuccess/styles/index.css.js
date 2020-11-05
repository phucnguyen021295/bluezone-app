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

  infoContainer: {
    paddingHorizontal: 45,
    paddingVertical: 60,
  },

  infoRow: {
    padding: 10,
    fontSize: fontSize.normal,
    flexDirection: 'row',
  },

  info: {
    width: 85,
    fontSize: fontSize.normal,
  },

  infoValue: {
    flex: 1,
    fontSize: fontSize.normal,
  },

  row: {
    flexDirection: 'row',
  },

  thank: {
    textAlign: 'center',
    padding: 15,
    color: '#015CD0',
    fontSize: fontSize.normal,
  },

  text: {
    textAlign: 'center',
    padding: 15,
    fontSize: fontSize.fontSize14,
  },

  button1: {
    padding: 5,
    // marginHorizontal:
  },

  buttonText1: {
    color: '#015CD0',
    fontSize: fontSize.normal,
  },

  button2: {
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#015CD0',
  },

  buttonText2: {
    color: '#FFFFFF',
    fontSize: fontSize.normal,
  },
});

export default styles;
