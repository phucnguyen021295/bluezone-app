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

import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native';
import {injectIntl, intlShape} from 'react-intl';
import * as PropTypes from 'prop-types';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// Components
import Header from '../../../base/components/Header';
import Text from '../../../base/components/Text';
import EntryDeclarationScreen from '../EntryDeclarationScreen/EntryDeclarationScreen';
import DailyDeclarationScreen from '../DailyDeclarationScreen';
import ContextProvider from '../EntryDeclarationScreen/components/LanguageContext';
import LanguageProvider from '../EntryDeclarationScreen/components/LanguageProvider';

// Styles
import * as fontSize from '../../../core/fontSize';
import styles from './styles/index.css';

import {heightPercentageToDP} from '../../../core/utils/dimension';
import {translationMessages} from '../../../i18n';

import messages from '../../../core/msg/entryScreen';

// Styles

export const TAB_BAR_HEIGHT = heightPercentageToDP((42 / 720) * 100);

export const Tab = createMaterialTopTabNavigator();

const EntryTabScreen = props => {
  const {route} = props;
  const initialRouteName = route.params?.tabFocus;

  const {intl} = props;
  const {formatMessage} = intl;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <Header title={formatMessage(messages.entry)} />
      <Tab.Navigator
        initialRouteName={initialRouteName}
        tabBarPosition={'top'}
        tabBarOptions={{
          showIcon: false,
          activeTintColor: '#015cd0',
          inactiveTintColor: '#f2f2f2',
          indicatorStyle: {
            opacity: 0,
          },
          style: {
            borderBottomWidth: 0.5,
            borderBottomColor: '#747474',
            height: TAB_BAR_HEIGHT,
            shadowRadius: 0,
            elevation: 0,
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

                text={formatMessage(messages.entryDeclare)}
                style={[
                  styles.tabHeader,
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
                text={formatMessage(messages.dailyDeclare)}
                style={[
                  styles.tabHeader,
                  ,
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

EntryTabScreen.propTypes = {
  intl: intlShape.isRequired,
};

const EntryTabScreenFinal = injectIntl(EntryTabScreen);

class EntryScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ContextProvider>
        <LanguageProvider messages={translationMessages}>
          <EntryTabScreenFinal {...this.props} />
        </LanguageProvider>
      </ContextProvider>
    );
  }
}

export default EntryScreen;
