/*
 * @Project Bluezone
 * @Author Bluezone Global (contact@bluezone.ai)
 * @Createdate 04/28/2020, 21:55
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

import React from 'react';
import {TouchableOpacity, View} from 'react-native';

// Styles
import styles from './styles/index.css';

function RadioButton(props) {
  const {checked, onPress, radioStyle, checkedCircleStyle} = props;
  return (
    <TouchableOpacity style={[styles.squares, radioStyle]} onPress={onPress}>
      {checked ? (
        <View style={[styles.checkedCircle, checkedCircleStyle]} />
      ) : (
        <View />
      )}
    </TouchableOpacity>
  );
}

RadioButton.defaultProps = {
  checked: false,
  onPress: () => {},
  radioStyle: {},
  checkedCircleStyle: {},
};

export default RadioButton;
