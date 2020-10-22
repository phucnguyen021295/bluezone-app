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

    const {data, valueDefault} = this.props;

    let itemSelected = {};
    if (data && data.find && props.valueDefault) {
      itemSelected = data.find(item => item.id === valueDefault) || {};
    }

    this.state = {
      isVisible: false,
      id: itemSelected.id,
      name: itemSelected.name,
    };

    this.renderModal = this.renderModal.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.onHideModal = this.onHideModal.bind(this);
  }

  onShowSelect = () => {
    this.setState({isVisible: true});
  };

  onSelect = (id, name) => {
    const {onSelect} = this.props;
    this.setState({
      id: id,
      name: name,
    });
    onSelect && onSelect(id, name);
    this.onHideModal();
  };

  renderItem({item}) {
    const {id, name} = item;
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => this.onSelect(id, name)}>
        <Text text={name} style={styles.titlePicker} />
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
      <ModalBase
        isVisible={isVisible}
        // contentStyle={{paddingVertical: 15}}
        onBackdropPress={this.onHideModal}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{padding: 15}}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
          initialNumToRender={30}
        />
      </ModalBase>
    );
  }

  render() {
    const {id, name} = this.state;
    const {placeholder, containerStyle} = this.props;
    return (
      <>
        <TouchableOpacity
          style={[styles.containerStyle, containerStyle]}
          onPress={this.onShowSelect}>
          <Text
            text={name ? name : placeholder}
            style={[styles.title, {color: name ? '#000000' : '#dddddd'}]}
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
