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
  Alert,
} from 'react-native';
import {injectIntl, intlShape} from 'react-intl';
import FastImage from 'react-native-fast-image';

import Header from '../../../base/components/Header';

import configuration from '../../../configuration';
import SCREEN from '../../nameScreen';
import {syncConfigComponentApp} from './data/dataConfigComponentApp';

// Styles
import styles from './styles/index.css';

const IMAGE = {
  '1': require('./styles/images/entry.png'),
  '2': require('./styles/images/entry.png'),
  '3': require('./styles/images/entry.png'),
  '4': require('./styles/images/entry.png'),
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
    const {navigation, intl} = this.props;
    const {locale} = intl;
    const title = locale === 'vi' ? app.title : app.titleEn;

    const {PhoneNumber} = configuration;
    // if (!PhoneNumber) {
    //   Alert.alert(
    //     'Bluezone',
    //     locale === 'vi'
    //       ? 'Bạn cần đăng ký số điện thoại để có thể sử dụng chức năng này.'
    //       : 'You need to register a phone number to be able to use this function.',
    //   );
    //   return;
    // }

    switch (app.screen) {
      case SCREEN.DOMESTIC_DECLARATION:
        navigation.navigate(SCREEN.DOMESTIC_DECLARATION, {title});
        break;
      case SCREEN.ENTRY_DECLARATION:
        navigation.navigate(SCREEN.ENTRY_DECLARATION, {title});
        break;
      case SCREEN.DAILY_DECLARATION:
        navigation.navigate(SCREEN.DAILY_DECLARATION, {title});
        break;
      case 'Entry':
        const {AppMode} = configuration;
        if (AppMode === 'entry') {
        } else {
        }
        navigation.navigate(SCREEN.ENTRY, {
          tabFocus: AppMode === 'entry' ? 'DailyDeclare' : 'EntryDeclare',
        });
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
        <Header
          title={locale === 'vi' ? 'Tiện ích' : 'Utilities'}
          showBack={false}
        />
        <View style={styles.grid}>
          {HasApp.map(id => {
            const app = App[id];
            if (!app) {
              return null;
            }
            const title = locale === 'vi' ? app.title : app.titleEn;
            const source = app.image ? {uri: app.image} : IMAGE[id];
            return (
              <TouchableOpacity
                key={id}
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
