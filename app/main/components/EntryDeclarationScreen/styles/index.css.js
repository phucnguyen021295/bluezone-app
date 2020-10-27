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

import {Platform, StyleSheet} from 'react-native';
import * as fontSize from '../../../../core/fontSize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  flexOne: {
    flex: 1,
  },

  scroll: {
    paddingHorizontal: 20,
  },

  textHeader: {
    fontSize: fontSize.huge,
  },

  itemContainer: {
    paddingVertical: 10,
  },

  itemTitle: {
    paddingBottom: 10,
  },

  bigText: {
    fontSize: fontSize.normal,
  },

  bigTextContainer: {
    paddingTop: 8,
    paddingBottom: 0,
  },

  inputNumberHome: {
    borderColor: '#dddddd',
    borderWidth: 1,
    borderRadius: 6,
    height: 40,
    paddingHorizontal: 12,
    fontSize: fontSize.smaller,
  },

  star: {
    color: 'red',
  },

  checkbox: {
    marginLeft: -7,
  },

  date: {
    borderColor: '#dddddd',
    borderWidth: 1,
    padding: 10,
  },

  rowSymptom: {
    flexDirection: 'row',
    paddingVertical: 10,
  },

  nameSymptom: {
    flex: 1,
  },

  buttonSymptom: {
    textAlign: 'center',
    width: 50,
  },

  checkboxSymptom: {
    width: 50,
    alignItems: 'center',
  },

  btnSendContainer: {
    alignItems: 'center',
  },

  btnSend: {
    marginVertical: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'blue',
  },

  btnSendContent: {
    color: '#FFF',
  },

  vehicleItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  vehicleItemText: {},

  portraitContainer: {
    alignItems: 'center',
    padding: 10,
  },

  portraitBtn: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#000',
  },

  portraitImageBtn: {},

  portraitImage: {
    width: 100,
    height: 100,
  },

  testResultBtn: {
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: '#000',
  },

  testResultImageBtn: {},

  testResultImage: {
    width: 120,
    height: 120,
  },

  textInput: {
    borderColor: '#dddddd',
    borderWidth: 1,
    borderRadius: 6,
    height: 40,
    paddingHorizontal: 12,
    fontSize: fontSize.smaller,
  },

  lBtnModal: {
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(60, 60, 67, 0.29)',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
  },

  labelVietNam: {
    borderColor: '#dddddd',
    borderWidth: 1,
    borderRadius: 6,
    height: 40,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  labelRed: {
    marginVertical: 10,
    color: 'red',
  },

  flexRow: {
    flexDirection: 'row',
  },

  vehicleNumber: {flex: 1, marginRight: 10},
  vehicleSeat: {flex: 1, marginLeft: 10},
});

export default styles;
