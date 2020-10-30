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
import {View} from 'react-native';
import {injectIntl, intlShape} from 'react-intl';
import * as PropTypes from 'prop-types';

// Components
import Text, {MediumText} from '../../../../../base/components/Text';
import ButtonBase from '../../../../../base/components/ButtonBase';

import {listSymptom} from '../../index';

// Styles
import styles from './styles/index.css';

class DailyDeclaration extends React.Component {
  constructor(props) {
    super(props);

    this.getInfo = this.getInfo.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.formatHour = this.formatHour.bind(this);
  }

  getInfo() {
    const {item} = this.props;
    const ListItem = item.ListItem;
    let textInfo = '';
    ListItem.map(id => {
      const symptom = listSymptom.filter(it => it.StateID === id);
      if (symptom.length === 0) {
        return;
      }
      textInfo = textInfo ? `${textInfo}, ${symptom[0].name}` : symptom[0].name;
    });
    return textInfo;
  }

  formatDate(timeStamp) {
    const date = new Date(timeStamp);
    const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
    const month =
      date.getMonth() > 8 ? date.getMonth() + 1 : `0${date.getMonth()}`;
    return `${day}/${month}/${date.getFullYear()}`;
  }

  formatHour(timeStamp) {
    const date = new Date(timeStamp);
    let hour = date.getHours();
    hour = hour > 9 ? hour : `0${hour}`;
    let minutes = date.getMinutes();
    minutes = minutes > 9 ? minutes : `0${minutes}`;
    return `${hour}:${minutes}`;
  }

  render() {
    const {item} = this.props;
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={styles.dot} />
        <View style={styles.borderItem} />
        <View style={{flex: 1}}>
          <MediumText>{this.formatDate(item.TimeStamp)}</MediumText>
          <View style={styles.body}>
            <View style={styles.row}>
              <ButtonBase
                title={'Nguy cơ nhiễm bệnh'}
                onPress={this.onCloseScreenPress}
                containerStyle={styles.containerStyleNCNB}
                titleStyle={styles.textInviteNCNB}
              />
              <Text>{this.formatHour(item.TimeStamp)}</Text>
            </View>
            <Text>
              <MediumText>Thông tin: </MediumText>
              {this.getInfo()}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

DailyDeclaration.propTypes = {
  intl: intlShape.isRequired,
};

DailyDeclaration.contextTypes = {
  language: PropTypes.string,
};

export default injectIntl(DailyDeclaration);
