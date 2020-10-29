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
import {
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  View,
  SafeAreaView,
} from 'react-native';
import * as PropTypes from 'prop-types';
import Entypo from 'react-native-vector-icons/Entypo';

// Components
import Text from '../Text';
import ModalBase from '../ModalBase/ButtonHalf';
import Header from '../Header';

// Styles
import styles from './styles/index.css';

const findIndex = (id, data) => {
  if (!data || data.length === 0) {
    return -1;
  }
  const length = data.length;
  for (let i = 0; i < length; i++) {
    if (data[i].id === id) {
      return i;
    }
  }
  return -1;
};

const ITEM_HEIGHT = 42;

class SelectPicker extends React.PureComponent {
  constructor(props) {
    super(props);

    const {data, valueDefault} = this.props;

    let itemSelected = {};
    let index;
    if (data && data.find && props.valueDefault) {
      index = findIndex(valueDefault, data);
      itemSelected = data[index];
    }

    this.state = {
      isVisible: false,
      id: itemSelected.id,
      name: itemSelected.name,
      index: index,
    };

    this.renderModal = this.renderModal.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.onHideModal = this.onHideModal.bind(this);
  }

  // static getDerivedStateFromProps = (props, state) => {
  //   if (!props.data) {
  //     return {name: null, index: null};
  //   }
  //
  //   if (props.value === state.id) {
  //     return null;
  //   }
  //
  //   let index = findIndex(props.value, props.data);
  //
  //   if (index < 0) {
  //     return {
  //       id: props.value,
  //       name: null,
  //       index: null,
  //     };
  //   }
  //
  //   const itemSelected = props.data[index];
  //   return {
  //     id: itemSelected.id,
  //     name: itemSelected.name,
  //     index: index,
  //   };
  // };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {value, data, headerText} = this.props;
    if (prevProps.value !== value) {
      const _data = data || [];
      let index = findIndex(value, _data);
      const itemSelected = _data[index] || {};
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        id: itemSelected.id,
        name: itemSelected.name,
        index: index,
      });
    }
  }

  onShowSelect = () => {
    const {shouldVisible, onVisible} = this.props;
    onVisible && onVisible();
    if (shouldVisible && !shouldVisible()) {
      return;
    }
    this.setState({isVisible: true});
  };

  onSelect = (id, name, index) => {
    const {onSelect} = this.props;
    this.setState({
      id,
      name,
      index,
    });
    onSelect && onSelect(id, name);
    this.onHideModal();
  };

  renderItem({item, index}) {
    console.log('renderItem');
    const {id, name} = item;
    if (!name) {
      return null;
    }
    return (
      <TouchableOpacity
        key={id.toString()}
        style={styles.item}
        onPress={() => this.onSelect(id, name, index)}>
        <Text text={name} style={styles.titlePicker} />
      </TouchableOpacity>
    );
  }

  onHideModal() {
    this.setState({isVisible: false});
  }

  getItemLayout = (data, index) => {
    return {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index: index};
  };

  renderModal() {
    const {isVisible} = this.state;
    const {data, loading, headerText} = this.props;

    return (
      <ModalBase
        isVisible={isVisible}
        contentStyle={{flex: 1}}
        onBackdropPress={this.onHideModal}>
        {headerText && <Header onBack={this.onHideModal} title={headerText} />}
        {!loading ? (
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{padding: 15}}
            getItemLayout={this.getItemLayout}
            keyExtractor={item => item.id.toString()}
            renderItem={this.renderItem}
            initialNumToRender={60}
          />
        ) : (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" color={'#015cd0'} />
          </View>
        )}
      </ModalBase>
    );
  }

  render() {
    const {name} = this.state;
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
          <Entypo name={'chevron-thin-down'} size={15} />
        </TouchableOpacity>
        {this.renderModal()}
      </>
    );
  }
}

SelectPicker.defaultProps = {
  valueDefault: '',
  data: [],
};

SelectPicker.propTypes = {
  valueDefault: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  containerStyle: PropTypes.object,
  data: PropTypes.array,
  loading: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  headerText: PropTypes.string,
  placeholder: PropTypes.string,
  onSelect: PropTypes.func,
  onVisible: PropTypes.func,
  shouldVisible: PropTypes.func,
};

export default SelectPicker;
