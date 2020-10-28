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

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  View,
} from 'react-native';
import {injectIntl, intlShape} from 'react-intl';
import * as PropTypes from 'prop-types';

import Header from '../../../base/components/Header';

const items = ['Sốt', 'Ho', 'Khó thở', 'Đau người, mệt mỏi', 'Khỏe mạnh'];

class DailyDeclaration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsSelected: [],
    };
  }

  selectItem = item => {
    const {itemsSelected} = this.state;
    const i = itemsSelected.indexOf(item);
    if (i !== -1) {
      itemsSelected.splice(i, 1);
    } else {
      itemsSelected.push(item);
    }
    this.setState({itemsSelected: itemsSelected});
  };

  render() {
    const {itemsSelected} = this.state;
    const {intl, navigation} = this.props;
    const {formatMessage} = intl;

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
        <StatusBar hidden={true} />
        <Header title={'Khai báo Y tế hàng ngày'} />
        <View style={styles.grid}>
          <Text>Chọn thông tin sức khỏe của bạn</Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {items.map(item => {
              const selected = itemsSelected.indexOf(item) !== -1;
              return (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    backgroundColor: '#EEEEEE',
                    padding: 5,
                    margin: 5,
                  }}
                  onPress={() => {
                    this.selectItem(item);
                  }}>
                  <Text style={{marginRight: 20}}>{item}</Text>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderWidth: 1,
                      borderColor: 'blue',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {selected && (
                      <View
                        style={{
                          width: 10,
                          height: 10,
                          backgroundColor: 'black',
                        }}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

DailyDeclaration.propTypes = {
  intl: intlShape.isRequired,
};

DailyDeclaration.contextTypes = {
  language: PropTypes.string,
};

const styles = StyleSheet.create({
  grid: {},

  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 15,
  },
  item: {
    alignItems: 'center',
    width: '33%',
  },
  itemImage: {
    width: 60,
    height: 60,
  },

  itemText: {
    color: '#AAAAAA',
    fontSize: 12,
    paddingVertical: 5,
  },
});

export default injectIntl(DailyDeclaration);
