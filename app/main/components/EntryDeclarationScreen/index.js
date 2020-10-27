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
import * as PropTypes from 'prop-types';
import {
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from 'react-native';
import {injectIntl, intlShape} from 'react-intl';
import CheckBox from '@react-native-community/checkbox';
import ImagePicker from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

// Components
import Text from '../../../base/components/Text';
import Header from '../../../base/components/Header';
import InputScrollView from '../../../base/components/InputScrollView';
import FormInput from '../../../base/components/FormInput';
import RadioButton from '../../../base/components/RadioButton';
import SelectPicker from '../../../base/components/SelectPicker';
import TextInfo from './components/TextInfo';

// Data
import {
  gates,
  countries,
  provinces,
  yearBirth,
  symptomData,
  exposureHistoryData,
} from './data';

// Styles
import styles from './styles/index.css';

class Declaration extends React.Component {
  constructor(props) {
    super(props);

    const now = new Date();
    const nowString = moment(now).format('DD-MM-YYYY');

    this.state = {
      portrait: null,
      gateID: null,
      gate: null,
      fullName: '',
      yearOfBirth: null,
      gender: null,
      nationalityID: null,
      nationality: '',
      passport: '',
      vehicle_Planes: false,
      vehicle_Boat: false,
      vehicle_Car: false,
      otherVehicles: '',
      vehicleNumber: '',
      vehicleSeat: '',
      isPickerStartDateVisible: false,
      startDateString: nowString,
      startDate: now,
      isPickerEndDateVisible: false,
      endDateString: nowString,
      endDate: now,
      startCountryID: null,
      startProvince: '',
      startProvinceID: null,
      country21Day: '',
      province: '',
      provinceID: null,
      district: '',
      districtID: null,
      ward: '',
      wardID: '',
      addressVietNam: '',
      numberPhone: '',
      email: '',
      symptom: {},
      vacxin: '',
      exposureHistory: {},
      testResultImage: '',
      testResult: {},
    };
  }

  changeState = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  onSelectPortrait = () => {
    const options = {
      title: 'Chọn ảnh đại diện',
      cancelButtonTitle: 'Đóng',
      takePhotoButtonTitle: 'Chụp ảnh…',
      chooseFromLibraryButtonTitle: 'Chọn từ thư viện ảnh…',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel || response.error || response.customButton) {
        return;
      }
      this.changeState('portrait', response.data);
    });
  };

  onSelectTestResultImage = () => {
    const options = {
      title: 'Chọn ảnh kết quả xét nghiệm',
      cancelButtonTitle: 'Đóng',
      takePhotoButtonTitle: 'Chụp ảnh…',
      chooseFromLibraryButtonTitle: 'Chọn từ thư viện ảnh…',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel || response.error || response.customButton) {
        return;
      }
      this.changeState('testResultImage', response.data);
    });
  };

  onSelectGate = id => {
    this.changeState('gateID', id);
  };

  onSelectYearOfBirth = year => {
    this.changeState('yearOfBirth', year);
  };

  selectGenderMale = () => {
    this.changeState('gender', '1');
  };

  selectGenderFemale = () => {
    this.changeState('gender', '2');
  };

  selectGenderOther = () => {
    this.changeState('gender', '3');
  };

  onCheckBoxChange_Planes = value => {
    this.changeState('vehicle_Planes', value);
  };

  onCheckBoxChange_Boat = value => {
    this.changeState('vehicle_Boat', value);
  };

  onCheckBoxChange_Car = value => {
    this.changeState('vehicle_Car', value);
  };

  onChangeStatusVehicle = type => {
    this.changeState(type, !this.state[type]);
  };

  showPickerStartDate = () => {
    this.changeState('isPickerStartDateVisible', true);
  };

  showPickerEndDate = () => {
    this.changeState('isPickerEndDateVisible', true);
  };

  confirmPickerStartDate = date => {
    this.setState({
      startDateString: moment(date).format('DD-MM-YYYY'),
      startDate: date,
      isPickerStartDateVisible: false,
    });
    // this.changeState('isPickerStartDateVisible', false);
  };

  cancelPickerStartDate = () => {
    this.changeState('isPickerStartDateVisible', false);
  };

  confirmPickerEndDate = date => {
    this.setState({
      endDateString: moment(date).format('DD-MM-YYYY'),
      endDate: date,
      isPickerEndDateVisible: false,
    });
    // this.changeState('isPickerEndDateVisible', false);
  };

  cancelPickerEndDate = () => {
    this.changeState('isPickerEndDateVisible', false);
  };

  onSelectStartCountry = id => {
    this.changeState('startCountryID', id);
  };

  onSelectStartProvince = id => {
    this.changeState('startProvinceID', id);
  };

  onSelectSymptom = (type, value) => {
    const {symptom} = this.state;
    symptom[type] = value;
    this.setState({
      symptom,
    });
  };

  onSelectExposureHistory = (type, value) => {
    const {exposureHistory} = this.state;
    exposureHistory[type] = value;
    this.setState({
      exposureHistory,
    });
  };

  selectTestResut = value => {
    this.changeState('testResult', value);
  };

  hihi = () => {
    this.setState(prev => {
      return {
        xxx: (prev.xxx || 0) + 1,
      };
    });
  };
  haha = () => {
    this.setState(prev => {
      return {
        yyy: !prev.yyy,
      };
    });
  };

  render1() {
    const b = [];
    for (let i = 0; i < 50; i++) {
      b.push(<Text>{i}</Text>);
    }
    return (
      <KeyboardAvoidingView behavior="padding">
        <RadioButton checked={this.state.yyy} onPress={this.haha} />
        <RadioButton checked={!this.state.yyy} />
        <TouchableOpacity
          style={{padding: 20, backgroundColor: 'red'}}
          onPress={() => this.hihi()}>
          <Text>{this.state.xxx}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }

  render() {
    const {
      portrait,
      gateID,
      gate,
      fullName,
      yearOfBirth,
      gender,
      nationalityID,
      nationality,
      passport,
      vehicle_Planes,
      vehicle_Boat,
      vehicle_Car,
      vehicleNumber,
      vehicleSeat,
      isPickerStartDateVisible,
      startDateString,
      startDate,
      isPickerEndDateVisible,
      endDateString,
      endDate,
      startCountryID,
      startProvince,
      startProvinceID,
      country21Day,
      province,
      provinceID,
      district,
      districtID,
      ward,
      wardID,
      addressVietNam,
      numberPhone,
      email,
      symptom,
      vacxin,
      exposureHistory,
      testResultImage,
      testResult,
    } = this.state;
    const {intl} = this.props;
    const {formatMessage} = intl;

    return (
      <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
        <SafeAreaView style={styles.container}>
          <Header
            styleTitle={styles.textHeader}
            title={'Khai báo y tế tự nguyện'}
          />
          <ScrollView style={{paddingHorizontal: 20}}>
            <View style={styles.itemContainer}>
              <TextInfo
                styleContainer={styles.itemTitle}
                text={'Ảnh chân dung'}
                star
              />

              <View style={{alignItems: 'center', padding: 10}}>
                <TouchableOpacity
                  onPress={this.onSelectPortrait}
                  style={
                    !portrait ? styles.portraitBtn : styles.portraitImageBtn
                  }>
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                    }}
                    source={{
                      uri: `data:image/png;base64,${portrait}`,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.itemContainer}>
              <TextInfo
                styleContainer={styles.itemTitle}
                text={'Cửa khẩu'}
                star
              />
              <SelectPicker data={gates} placeholder={'Chọn cửa khẩu'} />
            </View>
            <FormInput
              title={'Họ và tên:'}
              star={true}
              placeholder={'Nhập họ và tên:'}
            />

            <View style={styles.itemContainer}>
              <TextInfo
                styleContainer={styles.itemTitle}
                text={'Năm sinh'}
                star
              />
              <SelectPicker
                data={yearBirth}
                valueDefault={'2020'}
                placeholder={'Chọn năm sinh'}
              />
            </View>

            <View style={styles.itemContainer}>
              <TextInfo
                text={'Giới tính'}
                styleContainer={styles.itemTitle}
                star
              />
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={this.selectGenderMale}>
                  <RadioButton
                    checked={gender === '1'}
                    onPress={this.selectGenderMale}
                  />
                  <Text text={'Nam'} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={this.selectGenderFemale}>
                  <RadioButton
                    checked={gender === '2'}
                    onPress={this.selectGenderFemale}
                  />
                  <Text text={'Nữ'} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={this.selectGenderOther}>
                  <RadioButton
                    checked={gender === '3'}
                    onPress={this.selectGenderOther}
                  />
                  <Text text={'Khác'} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.itemContainer}>
              <TextInfo
                styleContainer={styles.itemTitle}
                text={'Quốc tịch'}
                star
              />
              <SelectPicker
                data={countries}
                valueDefault={'Viet Nam'}
                placeholder={'Quốc tịch'}
              />
            </View>

            <FormInput
              title={'Số hộ chiếu hoặc giấy thông hành hợp pháp khác'}
              star={true}
              placeholder={'Nhập số CMT/CCCD/Hộ chiếu'}
              keyboardType={'phone-pad'}
              onChangeText={this.onChangName}
            />

            <View style={styles.itemContainer}>
              <TextInfo
                styleContainer={styles.itemTitle}
                text={'Thông tin đi lại'}
                star
              />
              <View>
                <TouchableOpacity
                  style={styles.vehicleItemContainer}
                  onPress={() => this.onChangeStatusVehicle('vehicle_Planes')}>
                  <CheckBox
                    value={vehicle_Planes}
                    onValueChange={this.onCheckBoxChange_Planes}
                    style={{marginLeft: -7}}
                  />
                  <Text style={styles.vehicleItemText} text={'Máy bay'} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.vehicleItemContainer}
                  onPress={() => this.onChangeStatusVehicle('vehicle_Boat')}>
                  <CheckBox
                    value={vehicle_Boat}
                    onValueChange={this.onCheckBoxChange_Boat}
                    style={{marginLeft: -7}}
                  />
                  <Text style={styles.vehicleItemText} text={'Tàu thuyền'} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.vehicleItemContainer}
                  onPress={() => this.onChangeStatusVehicle('vehicle_Car')}>
                  <CheckBox
                    value={vehicle_Car}
                    onValueChange={this.onCheckBoxChange_Car}
                    style={{marginLeft: -7}}
                  />
                  <Text style={styles.vehicleItemText} text={'Ô tô'} />
                </TouchableOpacity>
              </View>
              <Text>Khác (Ghi rõ)</Text>
              <TextInput style={styles.textInput} />
            </View>
            <View style={{flexDirection: 'row'}}>
              <FormInput
                containerStyle={{flex: 1, marginRight: 10}}
                title={'Số hiệu phương tiện'}
                onChangeText={this.onChangName}
              />
              <FormInput
                containerStyle={{flex: 1, marginLeft: 10}}
                title={'Số ghế'}
                onChangeText={this.onChangName}
              />
            </View>

            <View style={styles.itemContainer}>
              <TextInfo
                styleContainer={styles.itemTitle}
                text={'Ngày khởi hành'}
                star
              />
              <Text style={styles.date} onPress={this.showPickerStartDate}>
                {startDateString}
              </Text>
              <DateTimePickerModal
                isVisible={isPickerStartDateVisible}
                mode="date"
                onConfirm={this.confirmPickerStartDate}
                onCancel={this.cancelPickerStartDate}
                date={startDate}
              />
            </View>

            <View style={styles.itemContainer}>
              <TextInfo
                styleContainer={styles.itemTitle}
                text={'Ngày nhập cảnh'}
                star
              />
              <Text style={styles.date} onPress={this.showPickerEndDate}>
                {endDateString}
              </Text>
              <DateTimePickerModal
                isVisible={isPickerEndDateVisible}
                mode="date"
                onConfirm={this.confirmPickerEndDate}
                onCancel={this.cancelPickerEndDate}
                date={endDate}
              />
            </View>

            <TextInfo
              styleContainer={styles.itemTitle}
              text={'Địa điểm khởi hành (tỉnh/ quốc gia)'}
            />

            <View style={styles.itemContainer}>
              <TextInfo
                styleContainer={styles.itemTitle}
                text={'Quốc gia/ Vùng lãnh thổ'}
                star
              />
              <SelectPicker data={countries} valueDefault={'Viet Nam'} />
            </View>

            <View style={styles.itemContainer}>
              <TextInfo styleContainer={styles.itemTitle} text={'Tỉnh'} star />
              {2 > 1 ? (
                <SelectPicker data={countries} valueDefault={'Viet Nam'} />
              ) : (
                <TextInput style={styles.textInput} />
              )}
            </View>

            <TextInfo
              styleContainer={styles.itemTitle}
              text={'Địa điểm nơi đến (tỉnh/ quốc gia)'}
            />

            <View style={styles.itemContainer}>
              <TextInfo
                styleContainer={styles.itemTitle}
                text={'Quốc gia/ Vùng lãnh thổ'}
                star
              />
              <View
                style={{
                  borderColor: '#dddddd',
                  borderWidth: 1,
                  borderRadius: 6,
                  height: 40,
                  paddingHorizontal: 12,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text>Việt Nam</Text>
              </View>
            </View>

            <View style={styles.itemContainer}>
              <TextInfo styleContainer={styles.itemTitle} text={'Tỉnh'} star />
              <SelectPicker data={provinces} placeholder={'Chọn tỉnh'} />
            </View>

            <FormInput
              title={
                'Trong vòng 21 ngày qua, anh/chị đã đến quốc gia/vùng lãnh thổ nào ?'
              }
              onChangeText={this.onChangName}
              star
            />

            <TextInfo
              styleContainer={styles.itemTitle}
              text={'Địa chỉ liên lạc tại Việt Nam'}
            />

            <View style={styles.itemContainer}>
              <TextInfo
                styleContainer={styles.itemTitle}
                text={'Tỉnh thành'}
                star
              />
              <SelectPicker data={countries} valueDefault={'Viet Nam'} />
            </View>

            <View style={styles.itemContainer}>
              <TextInfo
                styleContainer={styles.itemTitle}
                text={'Quận / Huyện'}
                star
              />
              <SelectPicker data={countries} valueDefault={'Viet Nam'} />
            </View>

            <View style={styles.itemContainer}>
              <TextInfo
                styleContainer={styles.itemTitle}
                text={'Phường / Xã'}
                star
              />
              <SelectPicker data={countries} valueDefault={'Viet Nam'} />
            </View>

            <FormInput
              title={'Địa chỉ nơi ở tại Việt Nam'}
              onChangeText={this.onChangName}
              star
            />

            <FormInput
              title={'Địa thoại'}
              onChangeText={this.onChangName}
              star
            />

            <FormInput title={'Email'} onChangeText={this.onChangName} />

            <View style={styles.itemContainer}>
              <TextInfo
                styleContainer={styles.itemTitle}
                text={
                  'Trong vòng 21 ngày. Anh/Chị có thấy xuất hiện dấu hiệu nào sau đây'
                }
                star
              />
              <View>
                <View style={styles.rowSymptom}>
                  <Text style={{flex: 1}}>Triệu chứng</Text>
                  <Text style={styles.nameSymptom}>Có</Text>
                  <Text style={styles.nameSymptom}>Không</Text>
                </View>

                {symptomData.map(symptomItem => (
                  <View key={symptomItem.id} style={styles.rowSymptom}>
                    <Text style={{flex: 1}}>
                      {symptomItem.name}
                      <Text style={styles.star}> *</Text>
                    </Text>
                    <TouchableOpacity
                      style={styles.checkboxSymptom}
                      activeOpacity={1}
                      onPress={() =>
                        this.onSelectSymptom(symptomItem.id, true)
                      }>
                      <RadioButton
                        checked={symptom[symptomItem.id] === true}
                        onPress={() =>
                          this.onSelectSymptom(symptomItem.id, true)
                        }
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.checkboxSymptom}
                      activeOpacity={1}
                      onPress={() =>
                        this.onSelectSymptom(symptomItem.id, false)
                      }>
                      <RadioButton
                        checked={symptom[symptomItem.id] === false}
                        onPress={() =>
                          this.onSelectSymptom(symptomItem.id, false)
                        }
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
            <FormInput
              title={'Danh sách vắc-xin hoặc sinh phẩm được sử dụng'}
              onChangeText={this.onChangName}
            />

            <View style={styles.itemContainer}>
              <TextInfo
                styleContainer={styles.itemTitle}
                text={'Lịch sử phơi nhiễm: Trong vòng 21 ngày qua, Anh/Chị có'}
                star
              />
              <View>
                <View style={styles.rowSymptom}>
                  <Text style={{flex: 1}} />
                  <Text style={styles.nameSymptom}>Có</Text>
                  <Text style={styles.nameSymptom}>Không</Text>
                </View>

                {exposureHistoryData.map(exposureItem => (
                  <View key={exposureItem.id} style={styles.rowSymptom}>
                    <Text style={{flex: 1}}>
                      {exposureItem.name}
                      <Text style={styles.star}> *</Text>
                    </Text>
                    <TouchableOpacity
                      style={styles.checkboxSymptom}
                      activeOpacity={1}
                      onPress={() =>
                        this.onSelectExposureHistory(exposureItem.id, true)
                      }>
                      <RadioButton
                        checked={exposureHistory[exposureItem.id] === true}
                        onPress={() =>
                          this.onSelectExposureHistory(exposureItem.id, true)
                        }
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.checkboxSymptom}
                      activeOpacity={1}
                      onPress={() =>
                        this.onSelectExposureHistory(exposureItem.id, false)
                      }>
                      <RadioButton
                        checked={exposureHistory[exposureItem.id] === false}
                        onPress={() =>
                          this.onSelectExposureHistory(exposureItem.id, false)
                        }
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>

            <View>
              <TextInfo
                styleContainer={styles.itemTitle}
                text={'Phiếu kết quả xét nghiệm'}
              />
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={this.onSelectTestResultImage}
                  style={
                    !testResultImage
                      ? styles.testResultBtn
                      : styles.testResultImageBtn
                  }>
                  <Image
                    style={styles.testResultImage}
                    source={{
                      uri: `data:image/png;base64,${testResultImage}`,
                    }}
                  />
                </TouchableOpacity>

                <View>
                  <TouchableOpacity
                    style={styles.rowSymptom}
                    onPress={() => this.selectTestResut(true)}>
                    <RadioButton
                      checked={testResult === true}
                      onPress={() => this.selectTestResut(true)}
                    />
                    <Text>Âm tính</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.rowSymptom}
                    onPress={() => this.selectTestResut(false)}>
                    <RadioButton
                      checked={testResult === false}
                      onPress={() => this.selectTestResut(true)}
                    />
                    <Text>Dương tính</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <Text style={{marginVertical: 10, color: 'red'}}>
              Dữ liệu bạn cung cấp hoàn toàn bảo mật và chỉ phục vụ cho việc
              phòng chống dịch, thuộc quản lý của Ban chỉ đạo quốc gia về Phòng
              chống dịch Covid-19. Khi bạn nhấn nút "Gửi" là bạn đã hiểu và đồng
              ý.
            </Text>

            <View style={styles.btnSendContainer}>
              <TouchableOpacity style={styles.btnSend}>
                <Text style={styles.btnSendContent}>Gửi tờ khai</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

Declaration.propTypes = {
  intl: intlShape.isRequired,
};

Declaration.defaultProps = {};

Declaration.contextTypes = {
  language: PropTypes.string,
};

export default injectIntl(Declaration);
