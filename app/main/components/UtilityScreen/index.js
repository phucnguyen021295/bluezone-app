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
import FastImage from 'react-native-fast-image';

import Header from '../../../base/components/Header';

import SCREEN from '../../nameScreen';
import {syncConfigComponentApp} from './data/dataConfigComponentApp';

// Styles
import styles from './styles/index.css';

const IMAGE = {
  '1': require('./styles/images/anh.jpeg'),
  '2': require('./styles/images/anh.jpeg'),
  '3': require('./styles/images/anh.jpeg'),
  '4': require('./styles/images/anh.jpeg'),
};

class UtilityScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      HasApp: [],
      App: {},
    };

    this.onChangeEvent = this.onChangeEvent.bind(this);
  }

  componentDidMount() {
    syncConfigComponentApp(data => {
      this.setState({HasApp: data.HasApp, App: data.App});
    });
  }

  onChangeEvent(app) {
    const {navigation} = this.props;

    switch (app.screen) {
      case SCREEN.DOMESTIC_DECLARATION:
        navigation.navigate(SCREEN.DOMESTIC_DECLARATION);
        break;
      case SCREEN.ENTRY_DECLARATION:
        navigation.navigate(SCREEN.ENTRY_DECLARATION);
        break;
      case SCREEN.DAILY_DECLARATION:
        navigation.navigate(SCREEN.DAILY_DECLARATION);
        break;
      default:
        break;
    }
  }

  render() {
    const {intl} = this.props;
    const {HasApp, App} = this.state;
    const {locale} = intl;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
        <StatusBar hidden={true} />
        <Header title={'Tiện ích'} showBack={false} />
        <View style={styles.grid}>
          {HasApp.map(id => {
            const app = App[id];
            const title = locale === 'vi' ? app.title : app.titleEn;
            const source = app.image ? {uri: app.image} : IMAGE[id];
            return (
              <TouchableOpacity
                style={styles.item}
                onPress={() => this.onChangeEvent(app)}>
                <FastImage style={styles.itemImage} source={source} />
                <Text style={styles.itemText}>{title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    );
  }
}

UtilityScreen.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(UtilityScreen);
