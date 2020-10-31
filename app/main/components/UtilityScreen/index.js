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

import React, {Component} from 'react';
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

import SCREEN from '../../nameScreen';

class UtilityScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  open1 = () => {
    const {navigation} = this.props;
    navigation.navigate(SCREEN.DOMESTIC_DECLARATION);
  };

  open2 = () => {
    const {navigation} = this.props;
    navigation.navigate(SCREEN.ENTRY_DECLARATION);
  };

  open3 = () => {
    const {navigation} = this.props;
    navigation.navigate(SCREEN.DAILY_DECLARATION);
  };

  render() {
    const {intl, navigation} = this.props;
    const {formatMessage} = intl;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
        <StatusBar hidden={true} />
        <Header title={'Tiện ích'} showBack={false} />
        <View style={styles.grid}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.item} onPress={this.open1}>
              <Image
                style={styles.itemImage}
                source={require('./styles/images/anh.jpeg')}
              />
              <Text style={styles.itemText}>Khai bao y te nội địa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={this.open2}>
              <Image
                style={styles.itemImage}
                source={require('./styles/images/anh.jpeg')}
              />
              <Text style={styles.itemText}>Che do nhap canh</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={this.open3}>
              <Image
                style={styles.itemImage}
                source={require('./styles/images/anh.jpeg')}
              />
              <Text style={styles.itemText}>Khai bao y te nhập cảnh</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.item}>
              <Image
                style={styles.itemImage}
                source={require('./styles/images/anh.jpeg')}
              />
              <Text style={styles.itemText}>BMI</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Image
                style={styles.itemImage}
                source={require('./styles/images/anh.jpeg')}
              />
              <Text style={styles.itemText}>BMI</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Image
                style={styles.itemImage}
                source={require('./styles/images/anh.jpeg')}
              />
              <Text style={styles.itemText}>BMI</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

UtilityScreen.propTypes = {
  intl: intlShape.isRequired,
};

const styles = StyleSheet.create({
  grid: {
    marginTop: 20,
  },

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
    textAlign: 'center',
  },
});

export default injectIntl(UtilityScreen);
