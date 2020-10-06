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
import {TouchableOpacity, FlatList, SafeAreaView} from 'react-native';
import * as PropTypes from 'prop-types';
import Entypo from 'react-native-vector-icons/Entypo';

// Components
import Text from '../Text';
import ModalBase from '../ModalBase/ButtonHalf';

// Styles
import styles from './styles/index.css';

class SelectPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      valueSelected: props.valueDefault || '',
    };

    this.renderModal = this.renderModal.bind(this);
    this.onPress = this.onPress.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.onHideModal = this.onHideModal.bind(this);
  }

  onPress() {
    this.setState({isVisible: true});
  }

  renderItem({item}) {
    return (
      <TouchableOpacity style={styles.item}>
        <Text text={item} style={styles.titlePicker} />
      </TouchableOpacity>
    );
  }

  onHideModal() {
    this.setState({isVisible: false});
  }

  renderModal() {
    const {isVisible} = this.state;
    const {data} = this.props;
    return (
      <ModalBase isVisible={isVisible} contentStyle={{maxHeight: 400}} onBackdropPress={this.onHideModal}>
        <FlatList
          data={data}
          keyExtractor={item => item}
          renderItem={this.renderItem}
        />
      </ModalBase>
    );
  }

  render() {
    const {valueSelected} = this.state;
    const {placeholder, containerStyle} = this.props;
    return (
      <>
        <TouchableOpacity
          style={[styles.containerStyle, containerStyle]}
          onPress={this.onPress}>
          <Text
            text={valueSelected ? valueSelected : placeholder}
            style={[
              styles.title,
              {color: valueSelected ? '#000000' : '#dddddd'},
            ]}
          />
          <Entypo name={'chevron-thin-down'} size={20} />
        </TouchableOpacity>
        {this.renderModal()}
      </>
    );
  }
}

SelectPicker.defaultProps = {
  valueDefault: '',
  isVisible: false,
};

SelectPicker.propTypes = {
  valueDefault: PropTypes.string,
  containerStyle: PropTypes.object,
  children: PropTypes.any,
};

export default SelectPicker;
