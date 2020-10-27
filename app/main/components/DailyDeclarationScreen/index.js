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

'use strict';

import React, {Component, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  View,
  Image,
} from 'react-native';
import {injectIntl, intlShape} from 'react-intl';
import * as PropTypes from 'prop-types';

import Header from '../../../base/components/Header';
import * as fontSize from '../../../core/fontSize';

// const historyData = [{
//   date: '21/10/2020',
//   symptoms: [
//
//   ]
// }];

const DeclareDaily = props => {
  const {intl, navigation} = props;
  const {formatMessage} = intl;

  const items = ['Sốt', 'Ho', 'Khó thở', 'Đau người, mệt mỏi', 'Khỏe mạnh'];

  const [itemsSelected, setItemsSelected] = useState([]);
  const selectItem = item => {
    const i = itemsSelected.indexOf(item);
    if (i !== -1) {
      itemsSelected.splice(i, 1);
    } else {
      itemsSelected.push(item);
    }
    setItemsSelected([...itemsSelected]);
  };

  const onSend = () => {};

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <Header title={'Khai báo y tế hàng ngày'} />
      <View style={styles.container}>
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
                    selectItem(item);
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

          <View style={styles.btnSendContainer}>
            <TouchableOpacity style={styles.btnSend} onPress={onSend}>
              <Text style={styles.btnSendContent}>Gửi tờ khai</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text>Lich su theo doi suc khoe</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

DeclareDaily.propTypes = {
  intl: intlShape.isRequired,
};

DeclareDaily.contextTypes = {
  language: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },

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

  btnSendContainer: {
    alignItems: 'center',
  },

  btnSend: {
    marginVertical: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'blue',
  },

  btnSendContent: {
    color: '#FFF',
  },
});

export default injectIntl(DeclareDaily);
