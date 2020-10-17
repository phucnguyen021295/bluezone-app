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
import {bigger, normal, fontSize19} from '../../../../core/fontSize';
import {blue_bluezone} from '../../../../core/color';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../../../core/utils/dimension';

const PADDING_TOP_CONTACT = heightPercentageToDP((26 / 720) * 100);
const HEIGHT_CONTACT = heightPercentageToDP((44 / 720) * 100);
const TEXT_CONTACT_PADDING_TOP = heightPercentageToDP((10 / 720) * 100);
const TEXT_CONTACT_PADDING_BOTTOM = heightPercentageToDP((16 / 720) * 100);
// const TEXT_CONTACT_PADDING_BOTTOM = heightPercentageToDP((16 / 720) * 100);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  warper: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  titleHeader: {
    color: '#015cd0',
    fontSize: bigger,
  },
  contact: {
    alignItems: 'center',
    paddingTop: PADDING_TOP_CONTACT,
  },

  textContact: {
    color: blue_bluezone,
    fontFamily: 'OpenSans-Italic',
    paddingTop: TEXT_CONTACT_PADDING_TOP,
    paddingBottom: TEXT_CONTACT_PADDING_BOTTOM,
  },

  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F0F5FD',
    height: HEIGHT_CONTACT,
    paddingHorizontal: 20,
  },

  textHeader: {
    fontSize: normal,
    color: blue_bluezone,
  },

  contentContainerStyle: {
    // paddingHorizontal: 20,
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 20,
    paddingVertical: 10.5,
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 0.65,
  },

  date: {
    fontSize: normal,
  },

  numberContact: {
    fontSize: fontSize19,
    color: blue_bluezone,
    paddingRight: 20,
  },
});

export default styles;
