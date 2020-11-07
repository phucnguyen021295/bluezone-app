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
import {TextInput, View} from 'react-native';

// Components
import Text, {MediumText} from '../Text';

// Styles
import styles from './styles/index.css';

// const FormInput = React.forwardRef((props, ref) => {
//   const {
//     title,
//     star,
//     containerStyle,
//     textStyle,
//     inputStyle,
//     ...otherProps
//   } = props;
//
//   return (
//     <View style={[styles.container, containerStyle]}>
//       <Text style={styles.titleContainer}>
//         <MediumText text={title} style={[styles.titleStyle, textStyle]} />
//         {star && <Text text={' *'} style={styles.star} />}
//       </Text>
//       <TextInput
//         style={[styles.inputStyle, inputStyle]}
//         {...otherProps}
//         ref={ref}
//       />
//     </View>
//   );
// });

function FormInput(props) {
  const {
    title,
    star,
    containerStyle,
    textStyle,
    inputStyle,
    disable,
    value,
    ...otherProps
  } = props;
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.titleContainer}>
        <MediumText text={title} style={[styles.titleStyle, textStyle]} />
        {star && <Text text={' *'} style={styles.star} />}
      </Text>
      {disable ? (
        <Text text={value} />
      ) : (
        <TextInput
          value={value}
          style={[styles.inputStyle, inputStyle]}
          {...otherProps}
        />
      )}
    </View>
  );
}

FormInput.defaultProps = {
  title: '',
  containerStyle: {},
  textStyle: {},
  inputStyle: {},
};

export default FormInput;
