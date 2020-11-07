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
import Modal from 'react-native-modal';
import {View} from 'react-native';

// Components
import Text from '../Text';

// Styles
import styles from './styles/index.css';

function ModalBase(props) {
  const {
    isVisibleModal,
    title,
    description,
    children,
    onCloseModal,
    styleTitle,
    styleDescription,
  } = props;
  return (
    <Modal
      isVisible={isVisibleModal}
      style={styles.container}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      backdropOpacity={0.65}
      animationInTiming={500}
      animationOutTiming={500}
      backdropTransitionInTiming={0}
      backdropTransitionOutTiming={0}
      onBackButtonPress={onCloseModal}
      onBackdropPress={onCloseModal}>
      <View style={styles.content}>
        <View style={styles.body}>
          {title && <Text text={title} style={[styles.title, styleTitle]} />}
          {description && (
            <Text
              text={description}
              style={[styles.description, styleDescription]}
            />
          )}
        </View>
        {children && children}
      </View>
    </Modal>
  );
}

ModalBase.propTypes = {
  isVisibleModal: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.any,
  onCloseModal: PropTypes.func,
  styleTitle: PropTypes.object,
  styleDescription: PropTypes.object,
};

ModalBase.defaultProps = {
  onCloseModal: () => {},
  styleTitle: {},
  styleDescription: {},
};

export default ModalBase;
