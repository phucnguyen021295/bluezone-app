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

import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// Components
import TabScreen from './components/TabScreen';
import SCREEN from '../../nameScreen';

// Core
import {isIPhoneX} from '../../../core/utils/isIPhoneX';
import {smallest} from '../../../core/fontSize';
import {reportScreenAnalytics} from '../../../core/analytics';

import configuration from '../../../configuration';

// Styles
import {TAB_BAR_HEIGHT, TAB_BAR_IPHONEX_HEIGHT} from './style/index.css';

// Consts
export const Tab = createMaterialTopTabNavigator();

class HomeTabScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    reportScreenAnalytics(SCREEN.HOME);
  }

  render() {
    const {AppTabIds} = configuration;
    return (
      <Tab.Navigator
        initialRouteName="Home"
        tabBarPosition={'bottom'}
        tabBarOptions={{
          showIcon: true,
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
            fontSize: smallest,
            textTransform: 'capitalize',
          },
          allowFontScaling: false,
        }}>
        {TabScreen(AppTabIds)}
      </Tab.Navigator>
    );
  }
}

export default HomeTabScreen;
