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
import {StatusBar, SafeAreaView, Image, View} from 'react-native';
import {injectIntl, intlShape} from 'react-intl';

// Components
import AppList from './components/AppList';
import Header from '../../../base/components/Header';
import ButtonBase from '../../../base/components/ButtonBase';

// Styles
import styles from './styles/index.css';

class UtilityScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {intl, navigation} = this.props;
    const {locale} = intl;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
        <StatusBar hidden={true} />
        <Header
          title={locale === 'vi' ? 'Tiện ích' : 'Utilities'}
          showBack={false}
        />
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row'}}>
            <AppList
              navigation={navigation}
              contentContainerStyle={styles.contentContainerStyle}
            />
          </View>
          <ButtonBase
            title={locale === 'vi' ? 'Công cộng' : 'Publish'}
            icon={
              <Image
                source={require('./styles/images/publish.png')}
                style={{width: 30, height: 30}}
              />
            }
            titleStyle={styles.titleStyle}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.containerStyle}
          />
        </View>
      </SafeAreaView>
    );
  }
}

UtilityScreen.propTypes = {
  intl: intlShape.isRequired,
  navigation: PropTypes.object,
};

export default injectIntl(UtilityScreen);
