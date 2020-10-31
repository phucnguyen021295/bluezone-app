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

// Components
import BarLabel from '../BarLabel';
import BarIcon from '../BarIcon';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// Components
import {broadcastForcusChange} from '../CountNotification';

// Consts
const Tab = createMaterialTopTabNavigator();

// Core
const Screen = {
  Home: require('../../../HomeScreen').default,
  Notify: require('../../../NotifyScreen').default,
  Info: require('../../../InfoScreen').default,
  Faq: require('../../../FAQScreen').default,
  Utilities: require('../../../UtilityScreen').default,
};

function TabScreen(appTabIds) {
  return appTabIds.map(nameApp => {
    const TabScreen1 = Screen[nameApp];
    return (
      <Tab.Screen
        name={nameApp}
        options={{
          tabBarLabel: ({focused}) => (
            <BarLabel name={nameApp} focused={focused} />
          ),
          tabBarIcon: ({focused}) => (
            <BarIcon name={nameApp} focused={focused} />
          ),
        }}
        listeners={({navigation, route}) => ({
          focus: () => {
            nameApp === 'Notify' && broadcastFocusChange();
          },
        })}>
        {props => <TabScreen1 name={nameApp} {...props} />}
      </Tab.Screen>
    );
  });
}

export default TabScreen;
