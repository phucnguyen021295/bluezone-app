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
import * as fontSize from '../../../../../../core/fontSize';
import {isIPhoneX} from '../../../../../../core/utils/isIPhoneX';
import {heightPercentageToDP} from '../../../../../../core/utils/dimension';

const LOGO_PADDING_BOTTOM = heightPercentageToDP((8 / 720) * 100);

const styles = StyleSheet.create({
  switchLanguage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: isIPhoneX ? 34 : 6,
    zIndex: 99,
    paddingBottom: LOGO_PADDING_BOTTOM,
  },

  btnLanguage: {
    flexDirection: 'row',
    borderRadius: 15,
    alignItems: 'center',
    borderColor: '#ffffff',
    borderWidth: 0.3,
  },

  btnLanguageActive: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 1,
    paddingHorizontal: 8,
  },

  textBtnLanguageActive: {
    fontSize: fontSize.smallest,
    color: '#0166de',
    alignItems: 'center',
    paddingVertical: 1,
    paddingHorizontal: 2,
    // fontWeight: '600',
  },

  textBtnLanguage: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: fontSize.smallest,
    color: '#ffffff',
  },
});

export default styles;
