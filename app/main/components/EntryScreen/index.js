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
  StatusBar,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {injectIntl, intlShape} from 'react-intl';
import * as PropTypes from 'prop-types';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// Components
import Text, {MediumText} from '../../../base/components/Text';
import EntryDeclarationScreen from '../EntryDeclarationScreen';
import DailyDeclarationScreen from '../DailyDeclarationScreen';

import {isIPhoneX} from '../../../core/utils/isIPhoneX';
import {
  TAB_BAR_HEIGHT,
  TAB_BAR_IPHONEX_HEIGHT,
} from '../MainScreen/style/index.css';
import * as fontSize from '../../../core/fontSize';
import Header from '../../../base/components/Header';

// Styles

export const Tab = createMaterialTopTabNavigator();

const EntryDeclareSuccessScreen = props => {
  const {navigation} = props;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <Header title={'Nhập cảnh'} />
      <Tab.Navigator
        initialRouteName="EntryDeclare"
        tabBarPosition={'top'}
        tabBarOptions={{
          showIcon: false,
          activeTintColor: '#015cd0',
          inactiveTintColor: '#f2f2f2',
          indicatorStyle: {
            opacity: 0,
          },
          style: {
            borderTopColor: '#dddddd',
            borderTopWidth: 0.5,
            height: isIPhoneX ? TAB_BAR_IPHONEX_HEIGHT : TAB_BAR_HEIGHT,
          },
          tabStyle: {
            height: TAB_BAR_HEIGHT,
          },
          iconStyle: {
            alignItems: 'center',
            paddingTop: 2,
          },
          labelStyle: {
            fontSize: fontSize.smallest,
            textTransform: 'capitalize',
          },
          allowFontScaling: false,
        }}>
        <Tab.Screen
          name={'EntryDeclare'}
          options={{
            tabBarLabel: ({focused}) => (
              <Text
                text={'TO khai nhap canh'}
                style={[
                  {
                    fontSize: fontSize.normal,
                    marginBottom: 4,
                  },
                  {
                    color: focused ? '#015cd0' : '#747474',
                  },
                ]}
              />
            ),
          }}>
          {props => <EntryDeclarationScreen displayHeader={false} {...props} />}
        </Tab.Screen>

        <Tab.Screen
          name={'DailyDeclare'}
          options={{
            tabBarLabel: ({focused}) => (
              <Text
                text={'Khai bao hang ngay'}
                style={[
                  {
                    fontSize: fontSize.normal,
                    marginBottom: 4,
                  },
                  {
                    color: focused ? '#015cd0' : '#747474',
                  },
                ]}
              />
            ),
          }}>
          {props => <DailyDeclarationScreen displayHeader={false} {...props} />}
        </Tab.Screen>
      </Tab.Navigator>
    </SafeAreaView>
  );
};

EntryDeclareSuccessScreen.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(EntryDeclareSuccessScreen);
