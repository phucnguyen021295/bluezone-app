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

import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  View,
  ScrollView,
} from 'react-native';
import {injectIntl, intlShape} from 'react-intl';
import * as PropTypes from 'prop-types';
import {CheckBox} from 'react-native-elements';

// Components
import Text, {MediumText} from '../../../base/components/Text';
import Header from '../../../base/components/Header';

// Styles
import styles from './styles/index.css';
import message from '../../../core/msg/register';
import ButtonBase from '../../../base/components/ButtonBase';

const items = [
  {id: 'sot', name: 'Sốt'},
  {id: 'ho', name: 'Ho'},
  {id: 'khotho', name: 'Khó thở'},
  {id: 'daunguoi_metmoi', name: 'Đau người, mệt mỏi'},
  {id: 'khoemanh', name: 'Khỏe mạnh'},
];

class DailyDeclaration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsSelected: [],
    };
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
    const {itemsSelected} = this.state;
    const {intl, navigation} = this.props;
    const {formatMessage} = intl;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar hidden={true} />
        <Header title={'Khai báo Y tế hàng ngày'} />
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <MediumText style={styles.title}>
            Chọn thông tin sức khỏe hiện tại của bạn
          </MediumText>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
            {items.map(item => {
              const selected = itemsSelected.find(i => i.id === item.id);
              return (
                <CheckBox
                  iconType={'ionicon'}
                  center
                  title={item.name}
                  checkedIcon="ios-checkbox-outline"
                  uncheckedIcon="ios-square-outline"
                  checked={selected}
                  onPress={() => this.selectItem(item)}
                  containerStyle={{
                    marginLeft: 0,
                    marginRight: 0,
                    margin: 0,
                    backgroundColor: '#ffffff',
                    borderWidth: 0,
                  }}
                  textStyle={{marginRight: 5, marginLeft: 5}}
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
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: '#015cd0',
                  zIndex: 99,
                }}
              />
              <View
                style={{
                  marginRight: 16.5,
                  borderLeftColor: '#707070',
                  borderLeftWidth: 1,
                  marginLeft: 5,
                }}
              />
              <View style={{flex: 1}}>
                <MediumText>30/09/2020</MediumText>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#b2b2b2',
                    flex: 1,
                    padding: 10,
                    borderRadius: 9,
                    marginBottom: 47,
                    marginTop: 7,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingBottom: 13,
                    }}>
                    <ButtonBase
                      title={'Nguy cơ nhiễm bệnh'}
                      onPress={this.onCloseScreenPress}
                      containerStyle={styles.containerStyleNCNB}
                      titleStyle={styles.textInviteNCNB}
                    />
                    <Text>10:10</Text>
                  </View>
                  <Text>
                    <MediumText>Thông tin: </MediumText>Ho, Sốt, Khó thở
                  </Text>
                </View>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: '#015cd0',
                  zIndex: 99,
                }}
              />
              <View
                style={{
                  marginRight: 16.5,
                  borderLeftColor: '#707070',
                  borderLeftWidth: 1,
                  marginLeft: 5,
                }}
              />
              <View style={{flex: 1}}>
                <MediumText>30/09/2020</MediumText>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#b2b2b2',
                    flex: 1,
                    padding: 10,
                    borderRadius: 9,
                    marginBottom: 47,
                    marginTop: 7,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingBottom: 13,
                    }}>
                    <ButtonBase
                      title={'Nguy cơ nhiễm bệnh'}
                      onPress={this.onCloseScreenPress}
                      containerStyle={styles.containerStyleNCNB}
                      titleStyle={styles.textInviteNCNB}
                    />
                    <Text>10:10</Text>
                  </View>
                  <Text>
                    <MediumText>Thông tin: </MediumText>Ho, Sốt, Khó thở
                  </Text>
                </View>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: '#015cd0',
                  zIndex: 99,
                }}
              />
              <View
                style={{
                  marginRight: 16.5,
                  borderLeftColor: '#707070',
                  borderLeftWidth: 1,
                  marginLeft: 5,
                }}
              />
              <View style={{flex: 1}}>
                <MediumText>30/09/2020</MediumText>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#b2b2b2',
                    flex: 1,
                    padding: 10,
                    borderRadius: 9,
                    marginBottom: 47,
                    marginTop: 7,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingBottom: 13,
                    }}>
                    <ButtonBase
                      title={'Nguy cơ nhiễm bệnh'}
                      onPress={this.onCloseScreenPress}
                      containerStyle={styles.containerStyleNCNB}
                      titleStyle={styles.textInviteNCNB}
                    />
                    <Text>10:10</Text>
                  </View>
                  <Text>
                    <MediumText>Thông tin: </MediumText>Ho, Sốt, Khó thở
                  </Text>
                </View>
              </View>
            </View>
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
