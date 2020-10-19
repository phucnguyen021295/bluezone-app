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
import {heightPercentageToDP} from '../../../../core/utils/dimension';

const MARGIN_TOP_CONTENT = heightPercentageToDP((62 / 720) * 100);
const MARGIN_BOTTOM_CONTENT = heightPercentageToDP((89 / 720) * 100);
const MARGIN_TOP_PHONE = heightPercentageToDP((38 / 720) * 100);
const BTN_HEIGHT = heightPercentageToDP((46 / 720) * 100);
const INPUT_HEIGHT = heightPercentageToDP((40 / 720) * 100);
const MARGIN_TOP_35 = heightPercentageToDP((35 / 720) * 100);

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 70,
    justifyContent: 'center',
    marginTop: MARGIN_TOP_CONTENT,
    marginBottom: MARGIN_BOTTOM_CONTENT,
  },

  text1: {
    textAlign: 'center',
    fontSize: fontSize.normal,
    lineHeight: 25,
  },

  textPhoneNumber: {
    fontWeight: 'bold',
    marginTop: MARGIN_TOP_35,
    fontSize: fontSize.larger,
    textAlign: 'center',
  },

  layoutCountdown: {
    flexDirection: 'row',
    alignSelf: 'center',
  },

  text3: {
    fontSize: fontSize.small,
    lineHeight: 25,
    color: blue_bluezone,
  },

  text4: {
    fontWeight: 'normal',
    fontSize: fontSize.larger,
    paddingVertical: 24,
    textAlign: 'center',
    paddingHorizontal: 50,
    lineHeight: 30,
    color: blue_bluezone,
  },

  btn: {
    height: 54,
    backgroundColor: '#e8e8e8',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
  },

  textSendOTP: {
    fontSize: fontSize.small,
    lineHeight: 25,
    color: blue_bluezone,
  },

  lBtnModal: {
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(60, 60, 67, 0.29)',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
  },
  btnModal: {
    alignItems: 'center',
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  buttonConfirm: {
    zIndex: 999,
    marginHorizontal: 43,
    marginBottom: 27,
  },
  colorButtonConfirm: {
    backgroundColor: blue_bluezone,
    height: BTN_HEIGHT,
  },

  btnConfim: {
    backgroundColor: '#e8e8e8',
    height: BTN_HEIGHT,
  },

  iconButtonConfirm: {
    width: 18,
    height: 18,
  },

  inputOTPMax: {
    height: INPUT_HEIGHT,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    paddingLeft: 12,
    fontSize: fontSize.large,
    marginBottom: 51,
    marginHorizontal: 30,
    textAlign: 'center',
    paddingTop: 9,
    paddingBottom: 9,
    color: '#000000',
  },

  buttonInvite: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: MARGIN_TOP_PHONE,
  },

  textInvite: {
    fontSize: fontSize.normal,
    color: blue_bluezone,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});

export default styles;
