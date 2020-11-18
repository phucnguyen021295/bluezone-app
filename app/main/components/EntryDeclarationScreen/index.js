/*
 * @Project Bluezone
 * @Author Bluezone Global (contact@bluezone.ai)
 * @Createdate 04/28/2020, 21:55
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
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ContextProvider, {
  EntryLanguageContext,
} from './components/LanguageContext';
import LanguageProvider from './components/LanguageProvider';
import {translationMessages} from '../../../i18n';
import decorateEntry from './decorateEntry';
import SCREEN from '../../nameScreen';
import PhoneNumberRegister from '../PhoneNumberRegisterScreen';
import PhoneNumberVerifyOTP from '../PhoneNumberVerifyOTPScreen';
import RegisterInformation from '../RegisterInformationScreen';
import EntryDeclareSuccess from '../EntryDeclareSuccess';
import EntryForm from './EntryForm';

const Stack = createStackNavigator();

const MAIN_INITIAL_ROUTE = SCREEN.ENTRY_DECLARATION;

const EntryDeclaration = decorateEntry(EntryForm, EntryLanguageContext);

const Declaration = ({route}) => {
  return (
    <ContextProvider>
      <LanguageProvider messages={translationMessages}>
        <Stack.Navigator
          id="entry"
          headerMode="none"
          mode="card"
          initialRouteName={MAIN_INITIAL_ROUTE}>
          <Stack.Screen
            name={SCREEN.ENTRY_DECLARATION}
            component={EntryDeclaration}
            initialParams={route.params}
          />
          <Stack.Screen
            name={SCREEN.PHONE_NUMBER_REGISTER}
            component={PhoneNumberRegister}
          />
          <Stack.Screen
            name={SCREEN.PHONE_NUMBER_VERITY_OTP}
            component={PhoneNumberVerifyOTP}
          />
          <Stack.Screen
            name={SCREEN.REGISTER_INFORMATION}
            component={RegisterInformation}
          />

          <Stack.Screen
            name={SCREEN.ENTRY_DECLARATION_SUCCESS}
            component={EntryDeclareSuccess}
          />
        </Stack.Navigator>
      </LanguageProvider>
    </ContextProvider>
  );
};

export default Declaration;
