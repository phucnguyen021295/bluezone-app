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
import {StatusBar, SafeAreaView, View, ScrollView} from 'react-native';
import {injectIntl, intlShape} from 'react-intl';
import * as PropTypes from 'prop-types';
import {CheckBox} from 'react-native-elements';

// Components
import Text, {MediumText} from '../../../base/components/Text';
import Header from '../../../base/components/Header';
import ButtonBase from '../../../base/components/ButtonBase';
import HealthMonitoringItem from './components/HealthMonitoringItem';

import {reportScreenAnalytics} from '../../../core/analytics';
import SCREEN from '../../nameScreen';

// Styles
import styles from './styles/index.css';

export const listSymptom = [
  {StateID: 1, name: 'Sốt'},
  {StateID: 2, name: 'Ho'},
  {StateID: 3, name: 'Khó thở'},
  {StateID: 4, name: 'Đau người, mệt mỏi'},
  {StateID: 5, name: 'Khỏe mạnh'},
];

const data = [
  {
    TimeStamp: 1603962024359,
    ListItem: [1, 2, 3, 4],
  },
  {
    TimeStamp: 1603962024359,
    ListItem: [5],
  },
  {
    TimeStamp: 1603962024359,
    ListItem: [1, 2, 3, 4],
  },
  {
    TimeStamp: 1603962024359,
    ListItem: [5],
  },
];

class DailyDeclaration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsSelected: [],
      data: data,
    };
  }

  componentDidMount() {
    reportScreenAnalytics(SCREEN.DAILY_DECLARATION);
  }

  selectItem = item => {
    const {itemsSelected} = this.state;
    const i = itemsSelected.indexOf(item);
    if (i !== -1) {
      itemsSelected.splice(i, 1);
    } else {
      itemsSelected.push(item);
    }
    this.setState({itemsSelected: itemsSelected});
  };

  render() {
    const {itemsSelected, data} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar hidden={true} />
        <Header title={'Khai báo Y tế hàng ngày'} />
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <MediumText style={styles.title}>
            Chọn thông tin sức khỏe hiện tại của bạn
          </MediumText>
          <View style={styles.listCheckbox}>
            {listSymptom.map(item => {
              const selected = itemsSelected.find(
                i => i.StateID === item.StateID,
              );
              return (
                <CheckBox
                  iconType={'ionicon'}
                  iconRight
                  title={item.name}
                  disabled={true}
                  checkedIcon="ios-checkbox-outline"
                  uncheckedIcon="ios-square-outline"
                  checked={selected}
                  onPress={() => this.selectItem(item)}
                  containerStyle={styles.containerStyleCheckbox}
                  textStyle={{marginRight: 10, marginLeft: 0}}
                />
              );
            })}
          </View>

          <ButtonBase
            title={'Gửi thông tin'}
            onPress={this.onCloseScreenPress}
            containerStyle={styles.containerStyle}
            titleStyle={styles.textInvite}
          />

          <MediumText style={styles.title}>
            Lịch sử theo dõi sức khỏe
          </MediumText>

          <View>
            {data.map((item, index) => (
              <HealthMonitoringItem item={item} key={index} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
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
