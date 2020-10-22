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

import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View} from 'react-native';

// Components
import Text from '../Text';

// Styles
import styles from './styles/index.css';

function ButtonBase(props) {
  const {
    icon,
    title,
    onPress,
    customTitle,
    iconRight,
    titleStyle,
    buttonStyle,
    containerStyle,
    titleComponent,
    ...otherProps
  } = props;
  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <TouchableOpacity
        style={[styles.buttonStyle, buttonStyle]}
        onPress={onPress}
        {...otherProps}>
        {icon && icon}
        {titleComponent ? (
          titleComponent
        ) : (
          <Text text={title} style={[styles.titleStyle, titleStyle]} />
        )}
        {iconRight && iconRight}
      </TouchableOpacity>
    </View>
  );
}

ButtonBase.defaultProps = {
  title: '',
  onPress: () => {},
  titleStyle: {},
  buttonStyle: {},
  containerStyle: {},
};

ButtonBase.propTypes = {
  containerStyle: PropTypes.object,
  buttonStyle: PropTypes.object,
  iconRight: PropTypes.number,
  icon: PropTypes.number,
  onPress: PropTypes.func,
  titleComponent: PropTypes.element,
  title: PropTypes.string,
  titleStyle: PropTypes.object,
};

export default ButtonBase;
