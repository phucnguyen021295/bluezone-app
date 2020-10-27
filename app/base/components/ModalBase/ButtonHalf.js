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
import * as PropTypes from 'prop-types';
import {View} from 'react-native';
import Modal from 'react-native-modal';

// Styles
import styles from './styles/index.css';

function BottomHalfModal(props) {
  const {
    children,
    containerStyle,
    isVisible,
    contentStyle,
    ...otherProps
  } = props;
  return (
    <Modal
      testID={'modal'}
      isVisible={isVisible}
      style={[styles.bottomHalfModal, containerStyle]}
      backdropOpacity={0.6}
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionInTiming={0}
      backdropTransitionOutTiming={0}
      {...otherProps}>
      <View style={[styles.contentStyle, contentStyle]}>{children}</View>
    </Modal>
  );
}

BottomHalfModal.defaultProps = {
  containerStyle: {},
  contentStyle: {},
  isVisible: false,
};

BottomHalfModal.propTypes = {
  isVisible: PropTypes.bool,
  containerStyle: PropTypes.object,
  children: PropTypes.any,
  contentStyle: PropTypes.any,
};

export default BottomHalfModal;
