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
    fontSize: fontSize.large,
  },

  itemContainer: {
    paddingVertical: 10,
  },

  item2Container: {
    paddingBottom: 10,
  },

  itemTitle: {
    paddingBottom: 10,
  },

  headerTwo: {
    fontSize: fontSize.small,
  },

  headerTwoContainer: {
    paddingTop: 0,
    paddingBottom: 10,
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
    fontSize: fontSize.small,
  },

  checkbox: {
    marginLeft: -7,
    ...Platform.select({
      ios: {
        width: 15,
        height: 15,
        marginRight: 5,
      },
    }),
  },

  date: {
    borderColor: '#dddddd',
    borderWidth: 1,
    padding: 10,
  },

  rowSymptom0: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#d9d9d9',
  },

  rowSymptom1: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },

  rowSymptom2: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },

  nameSymptom: {
    flex: 1,
    paddingLeft: 6,
    fontSize: fontSize.small,
  },

  buttonSymptom: {
    textAlign: 'center',
    width: 55,
    fontSize: fontSize.small,
  },

  checkboxSymptom: {
    width: 55,
    alignItems: 'center',
  },

  btnSendContainer: {
    alignItems: 'center',
  },

  btnSend: {
    marginVertical: 30,
    paddingHorizontal: 99,
    paddingVertical: 13,
    backgroundColor: '#015cd0',
    borderRadius: 13,
  },

  btnSendContent: {
    color: '#FFF',
    fontSize: fontSize.normal,
  },

  portraitContainer: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },

  portraitBtn: {
    width: 126,
    height: 126,
    // borderWidth: 1,
    // borderColor: '#000',
    borderRadius: 73,
    backgroundColor: '#949494',
  },

  portraitImageBtn: {},

  portraitImage: {
    width: 126,
    height: 126,
  },

  testResultBtn: {
    width: 131,
    height: 97,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#707070',
  },

  testResultImageBtn: {},

  testResultImage: {
    width: 131,
    height: 97,
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
    fontSize: fontSize.smaller,
  },

  label1: {
    marginVertical: 7,
    fontSize: fontSize.normal,
  },

  flexRow: {
    flexDirection: 'row',
  },

  vehicleNumber: {
    // flex: 1,
    // marginRight: 10,
  },
  vehicleSeat: {
    // flex: 1,
    // marginLeft: 10,
  },

  genderItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },

  genderFirstItemContainer: {
    marginLeft: -10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  gender: {
    fontSize: fontSize.small,
  },

  camera: {
    width: 34,
    height: 34,
    position: 'absolute',
    top: 99,
    left: 87,
  },

  checkboxContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    paddingHorizontal: 0,
    paddingVertical: 8,
    marginLeft: 0,
    margin: 0,
    marginRight: 35,
  },

  checkBoxText: {
    color: '#000',
    fontSize: fontSize.small,
    fontFamily: 'OpenSans-Bold',
    fontWeight: 'normal',
    marginRight: 0,
  },
});

export default styles;
