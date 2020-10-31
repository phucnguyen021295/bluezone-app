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

// Apis
import {
  InsertEntryPersonReport,
  GetListDailyDeclaration,
} from '../../../core/apis/bluezone';

// Core
import {
  getInforEntryPersonObjectGuid,
  getEntryObjectGUIDInformation,
  setHealthMonitoring,
  getHealthMonitoring,
} from '../../../core/storage';
import {reportScreenAnalytics} from '../../../core/analytics';
import SCREEN from '../../nameScreen';

// Styles
import styles from './styles/index.css';
import message from '../../../core/msg/register';
import {ButtonConfirm} from '../../../base/components/ButtonText/ButtonModal';
import ModalBase from '../../../base/components/ModalBase';

export const listSymptom = [
  {StateID: 1, name: 'Sốt'},
  {StateID: 2, name: 'Ho'},
  {StateID: 3, name: 'Khó thở'},
  {StateID: 4, name: 'Đau người, mệt mỏi'},
  {StateID: 5, name: 'Khỏe mạnh'},
];

let LtinforEntryPersonReportDetail = [
  {
    StateID: 1,
    Value: false,
  },
  {
    StateID: 2,
    Value: false,
  },
  {
    StateID: 3,
    Value: false,
  },
  {
    StateID: 4,
    Value: false,
  },
  {
    StateID: 5,
    Value: false,
  },
];

class DailyDeclaration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisibleError: false,
      itemsSelected: [],
      data: [],
    };

    this.selectItem = this.selectItem.bind(this);
    this.onSendInfo = this.onSendInfo.bind(this);
    this.checkDisabledCheckbox = this.checkDisabledCheckbox.bind(this);
    this.getLtinforEntryPersonReportDetail = this.getLtinforEntryPersonReportDetail.bind(
      this,
    );
    this.InsertEntryPersonReportSuccess = this.InsertEntryPersonReportSuccess.bind(
      this,
    );
    this.InsertEntryPersonReportError = this.InsertEntryPersonReportError.bind(
      this,
    );
    this.getListHealthMonitoring = this.getListHealthMonitoring.bind(this);
    this.renderModal = this.renderModal.bind(this);
  }

  componentDidMount() {
    reportScreenAnalytics(SCREEN.DAILY_DECLARATION);

    this.getListHealthMonitoring();
  }

  async getListHealthMonitoring() {
    const HealthMonitoring = await getHealthMonitoring();
    if (!HealthMonitoring) {
      const InforEntryPersonObjectGuid = await getInforEntryPersonObjectGuid();
      GetListDailyDeclaration(InforEntryPersonObjectGuid, response => {
        const Object = response.Object;
        const data = Object.reverse().map(item => {
          let ListItem = [];
          item.LtinforEntryPersonReportDetail.map(
            id => id.Value && ListItem.push(id.StateID),
          );
          return {
            CreateDate: item.CreateDate,
            ListItem: ListItem,
          };
        });

        this.setState({data: data});
      });
    } else {
      this.setState({data: HealthMonitoring});
    }
  }

  selectItem(item) {
    const {itemsSelected} = this.state;
    const i = itemsSelected.indexOf(item.StateID);
    if (i !== -1) {
      itemsSelected.splice(i, 1);
    } else {
      itemsSelected.push(item.StateID);
    }
    this.setState({itemsSelected: itemsSelected});
  }

  getLtinforEntryPersonReportDetail(ListItem) {
    LtinforEntryPersonReportDetail = LtinforEntryPersonReportDetail.map(item =>
      ListItem.includes(item.StateID)
        ? {
            StateID: item.StateID,
            Value: true,
          }
        : {
            StateID: item.StateID,
            Value: false,
          },
    );
    return LtinforEntryPersonReportDetail;
  }

  async onSendInfo() {
    let {itemsSelected} = this.state;
    const ListItem = itemsSelected.length > 0 ? itemsSelected : [5];

    const InforEntryObjectGuid = await getEntryObjectGUIDInformation();
    const InforEntryPersonObjectGuid = await getInforEntryPersonObjectGuid();
    const LtinforEntryPersonReportDetail = this.getLtinforEntryPersonReportDetail(
      ListItem,
    );

    const body = {
      InforEntryPersonReport: {
        InforEntryObjectGuid: InforEntryObjectGuid,
        InforEntryPersonObjectGuid: InforEntryPersonObjectGuid,
        LtinforEntryPersonReportDetail: LtinforEntryPersonReportDetail,
      },
    };

    InsertEntryPersonReport(
      body,
      this.InsertEntryPersonReportSuccess,
      this.InsertEntryPersonReportError,
    );
  }

  InsertEntryPersonReportSuccess(response) {
    let {itemsSelected, data} = this.state;
    const ListItem = itemsSelected.length > 0 ? itemsSelected : [5];
    const object = {
      CreateDate: response.Object.CreateDate,
      ListItem: ListItem,
    };
    data.splice(0, 0, object);

    this.setState({
      data: data,
      itemsSelected: [],
    });

    setHealthMonitoring(data);
  }

  InsertEntryPersonReportError(error) {
    this.setState({isVisibleError: true});
  }

  checkDisabledCheckbox(StateID) {
    const {itemsSelected} = this.state;
    if (
      (itemsSelected.length > 0 && itemsSelected[0] === 5 && StateID !== 5) ||
      (itemsSelected.length > 0 && itemsSelected[0] !== 5 && StateID === 5)
    ) {
      return true;
    }
    return false;
  }

  onCloseAlertError() {
    this.setState({isVisibleError: false});
  }

  renderModal() {
    const {
      isProcessing,
      isVisibleError,
      codeString,
    } = this.state;
    return (
      <>
        <ModalBase
          isVisibleModal={isVisibleError}
          title={'Thông báo'}
          description={`Gửi thông tin sức khỏe thất bại!`}>
          <View style={styles.modalFooter}>
            <ButtonConfirm
              text={'Đóng'}
              onPress={this.onCloseAlertError}
            />
          </View>
        </ModalBase>
      </>
    );
  }

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
              const selected = itemsSelected.find(i => i === item.StateID);
              return (
                <CheckBox
                  iconType={'ionicon'}
                  iconRight
                  title={item.name}
                  disabled={this.checkDisabledCheckbox(item.StateID)}
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
            onPress={this.onSendInfo}
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
