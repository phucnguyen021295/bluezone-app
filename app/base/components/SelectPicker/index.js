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
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import * as PropTypes from 'prop-types';
import {injectIntl, intlShape} from 'react-intl';
import Entypo from 'react-native-vector-icons/Entypo';

// Components
import Text, {MediumText} from '../Text';
import ModalBase from '../ModalBase/ButtonHalf';
import Header from '../Header';

import messages from '../../../core/msg/entryForm';

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
      itemSelected = data[index] || {};
    }

    this.state = {
      isVisible: false,
      id: itemSelected.id,
      name: itemSelected.name,
      index: index,
      searchKey: '',
      _data: data,
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
    const {value, data} = this.props;
    const {searchKey} = this.state;
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
    if (prevState.searchKey !== searchKey || prevProps.data !== data) {
      const _data =
        searchKey && data && typeof data.filter === 'function'
          ? data.filter(({name}) =>
              this.convertVietNamese(name).includes(
                this.convertVietNamese(searchKey),
              ),
            )
          : data;
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        _data,
      });
    }
  }

  convertVietNamese = alias => {
    if (!alias) {
      return alias;
    }
    return (
      alias
        .toLowerCase()
        .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
        .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
        .replace(/[ìíịỉĩ]/g, 'i')
        .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
        .replace(/[ùúụủũưừứựửữ]/g, 'u')
        .replace(/[ỳýỵỷỹ]/g, 'y')
        .replace(/đ/g, 'd')
        .replace(/[!@%^*()+=<>?\/,.:;'"&#\[\]~$_`\-{}|\\]/g, ' ')
        // .replace(/[!@%^*()+=<>?\/,.:;'"&#\[\]~$_`\-{}|\\]/g, ' ');
        .replace(/ + /g, ' ')
        .trim()
    );
  };

  onShowSelect = () => {
    const {shouldVisible} = this.props;
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
    this.setState({
      isVisible: false,
    });
    setTimeout(() => {
      this.setState({
        searchKey: '',
      });
    });
  }

  getItemLayout = (data, index) => {
    return {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index: index};
  };

  onChangeSearchKey = value => {
    this.setState({searchKey: value});
  };

  renderModal() {
    const {isVisible, searchKey, _data} = this.state;
    const {loading, headerText, enableSearch, onVisible} = this.props;

    const {intl} = this.props;
    const {formatMessage} = intl;

    return (
      <ModalBase
        isVisible={isVisible}
        contentStyle={{flex: 1}}
        onModalShow={onVisible}
        onBackdropPress={this.onHideModal}>
        <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
          {headerText && (
            <Header onBack={this.onHideModal} title={headerText} />
          )}
          {enableSearch && (
            <TextInput
              style={[styles.textInput]}
              onChangeText={this.onChangeSearchKey}
              value={searchKey}
              placeholder={formatMessage(messages.search)}
            />
          )}
          {!loading ? (
            <FlatList
              keyboardShouldPersistTaps={'handled'}
              data={_data}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 15}}
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
        </SafeAreaView>
      </ModalBase>
    );
  }

  render() {
    const {content} = this.props;
    const {name} = this.state;
    const {placeholder, containerStyle} = this.props;
    const text = content || name;
    return (
      <>
        <TouchableOpacity
          style={[styles.containerStyle, containerStyle]}
          onPress={this.onShowSelect}>
          <Text
            text={text ? text : placeholder}
            style={[styles.title, {color: text ? '#000000' : '#dddddd'}]}
          />
          <Entypo name={'triangle-down'} size={16} style={{color: '#6A6A6A'}} />
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
  intl: intlShape.isRequired,
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

export default injectIntl(SelectPicker);
