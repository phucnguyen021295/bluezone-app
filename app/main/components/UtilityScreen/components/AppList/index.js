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
import PropTypes from 'prop-types';
import {Text, TouchableOpacity, FlatList} from 'react-native';
import {injectIntl, intlShape} from 'react-intl';
import FastImage from 'react-native-fast-image';

import configuration from '../../../../../configuration';
import SCREEN from '../../../../nameScreen';
import {syncConfigComponentApp} from '../../data/dataConfigComponentApp';

// Styles
import styles from './styles/index.css';
import {getEntryObjectGUIDInformation} from '../../../../../core/storage';

const IMAGE = {
  '1': require('./styles/images/medicalSearch.png'),
  '2': require('./styles/images/health.png'),
  '3': require('./styles/images/SKPN.png'),
  '4': require('./styles/images/calendar.png'),
  '5': require('./styles/images/vaccinations.png'),
  '6': require('./styles/images/entry.png'),
};

class AppList extends React.Component {
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

  async onChangeEvent(app) {
    const {navigation, intl} = this.props;
    const {locale} = intl;
    const title = locale === 'vi' ? app.title : app.titleEn;

    // const {PhoneNumber} = configuration;
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
          navigation.navigate(SCREEN.ENTRY);
        } else {
          const objectGUID = await getEntryObjectGUIDInformation();
          navigation.navigate(SCREEN.ENTRY_DECLARATION, {
            objectGUID: objectGUID,
          });
        }

        break;
      default:
        break;
    }
  }

  renderItem = ({item}) => {
    const {intl, appStyle} = this.props;
    const {App} = this.state;
    const {locale} = intl;
    const app = App[item];
    if (!app) {
      return null;
    }
    const title = locale === 'vi' ? app.title : app.titleEn;
    const source = app.image ? {uri: app.image} : IMAGE[item];
    return (
      <TouchableOpacity
        style={[styles.appStyle, appStyle]}
        onPress={() => this.onChangeEvent(app)}>
        <FastImage style={styles.imageStyle} source={source} />
        <Text style={styles.titleStyle}>{title}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    const {HasApp} = this.state;
    const {contentContainerStyle} = this.props;
    return (
      <FlatList
        data={HasApp}
        renderItem={this.renderItem}
        keyExtractor={item => item}
        numColumns={3}
        contentContainerStyle={[
          styles.contentContainerStyle,
          contentContainerStyle,
        ]}
        columnWrapperStyle={styles.columnWrapperStyle}
      />
    );
  }
}

AppList.propTypes = {
  intl: intlShape.isRequired,
  navigation: PropTypes.object,
};

AppList.defaultProps = {
  appStyle: {},
  contentContainerStyle: {},
};

export default injectIntl(AppList);
