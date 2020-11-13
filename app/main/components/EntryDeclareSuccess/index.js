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
import {SafeAreaView, View, TouchableOpacity} from 'react-native';
import {injectIntl, intlShape} from 'react-intl';
import * as PropTypes from 'prop-types';

// Components
import Text, {MediumText} from '../../../base/components/Text';

import SCREEN from '../../nameScreen';

// Styles
import styles from './styles/index.css';
import messages from '../../../core/msg/entryScreen';

const EntryDeclareSuccessScreen = props => {
  const {route, navigation, intl} = props;
  const {code, passport} = route.params;

  const updateEntry = () => {
    navigation.replace(SCREEN.ENTRY, {
      tabFocus: 'EntryDeclare',
    });
  };

  const goBack = () => {
    navigation.goBack();
  };

  const {formatMessage} = intl;

  return (
    <SafeAreaView>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <MediumText style={styles.info}>
            {`${formatMessage(messages.code)}: `}
          </MediumText>
          <MediumText style={styles.infoValue}>{code}</MediumText>
        </View>
        <View style={styles.infoRow}>
          <MediumText style={styles.info}>
            {`${formatMessage(messages.passport)}: `}
          </MediumText>
          <MediumText style={styles.infoValue}>{passport}</MediumText>
        </View>
      </View>
      <MediumText style={styles.thank}>
        {formatMessage(messages.content1)}
      </MediumText>
      <Text style={styles.text}>{formatMessage(messages.content2)}</Text>
      <View
        style={{
          alignItems: 'center',
          marginTop: 20,
        }}>
        <TouchableOpacity style={styles.button1} onPress={updateEntry}>
          <Text style={styles.buttonText1}>
            {formatMessage(messages.updateEntryInfo)}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: 'center',
          marginTop: 20,
        }}>
        <TouchableOpacity style={styles.button2} onPress={goBack}>
          <Text style={styles.buttonText2}>
            {formatMessage(messages.backHome)}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

EntryDeclareSuccessScreen.propTypes = {
  intl: intlShape.isRequired,
  navigation: PropTypes.object,
};

export default injectIntl(EntryDeclareSuccessScreen);
