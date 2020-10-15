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
import {blue_bluezone} from '../../../../core/color';
import {heightPercentageToDP, widthPercentageToDP} from '../../../../core/utils/dimension';

const MARGINTOP_HEADER = heightPercentageToDP((37 / 720) * 100);
const TITLE_HEIGHT = heightPercentageToDP((33 / 720) * 100);
const LOGO_HEIGHT = heightPercentageToDP((124 / 720) * 100);
const BODY_PADDING_TOP = heightPercentageToDP((28 / 720) * 100);
const MARGIN_BOTTON_FOTTER = heightPercentageToDP((40 / 720) * 100);
const TEXT_LINE_HEIGHT = heightPercentageToDP((25 / 720) * 100);
const BUTTON_PADDING_VERTICAL = heightPercentageToDP((10 / 720) * 100);
const PADDING_HOZITAL = widthPercentageToDP((23 / 360) * 100);
const DESCRIPTION_PADDING_BOTTOM = widthPercentageToDP((21 / 360) * 100);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  containerLogo: {
    marginTop: MARGINTOP_HEADER,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: blue_bluezone,
    fontSize: fontSize.bigger,
    // fontWeight: '600',
    // lineHeight: fontSize.bigger * 1.96,
    height: TITLE_HEIGHT
  },

  body: {
    flex: 1,
    paddingHorizontal: PADDING_HOZITAL,
    backgroundColor: '#ffffff',
    paddingTop: BODY_PADDING_TOP
  },

  viewDep: {
    justifyContent: 'center',
  },

  description: {
    fontSize: fontSize.normal,
    lineHeight: parseInt(fontSize.normal * 1.67),
    color: '#363636',
    textAlign: 'left',
    paddingBottom: DESCRIPTION_PADDING_BOTTOM
  },

  borderLogo: {
    borderWidth: 0.4,
    borderColor: '#DBDBDB',
    height: LOGO_HEIGHT,
  },

  boxButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    // marginTop: MARGINTOP_FOTTER,
    marginBottom: MARGIN_BOTTON_FOTTER,
  },

  button: {
    color: blue_bluezone,
    fontSize: fontSize.normal,
    paddingVertical: BUTTON_PADDING_VERTICAL,
    paddingHorizontal: 10,
    lineHeight: TEXT_LINE_HEIGHT,
  },
});

export {LOGO_HEIGHT};

export default styles;
