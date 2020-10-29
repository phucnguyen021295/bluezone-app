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
import {View, SafeAreaView, TextInput} from 'react-native';
import {injectIntl, intlShape} from 'react-intl';

// Components
import Text, {MediumText} from '../../../base/components/Text';
import Header from '../../../base/components/Header';
import InputScrollView from '../../../base/components/InputScrollView';
import FormInput from '../../../base/components/FormInput';
import RadioButton from '../../../base/components/RadioButton';
import SelectPicker from '../../../base/components/SelectPicker';

// Data
import {countryList, cityList} from './data';

import {reportScreenAnalytics} from '../../../core/analytics';
import SCREEN from '../../nameScreen';

// Styles
import styles from './styles/index.css';

class Declaration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstLastName: '',
      cmnd: '',
      checked: 1,
    };

    this.onChangName = this.onChangName.bind(this);
    this.onCheckedSex = this.onCheckedSex.bind(this);
  }

  componentDidMount() {
    reportScreenAnalytics(SCREEN.DOMESTIC_DECLARATION);
  }

  onChangName(value) {
    this.setState({firstLastName: value});
  }

  onCheckedSex() {
    this.setState(prevState => ({checked: prevState.checked ? 0 : 1}));
  }

  render() {
    const {firstLastName, cmnd, checked} = this.state;
    const {intl} = this.props;
    const {formatMessage} = intl;
    return (
      <SafeAreaView style={styles.container}>
        <Header
          styleTitle={styles.textHeader}
          title={'Khai báo y tế tự nguyện'}
        />
        <InputScrollView style={{paddingHorizontal: 20, marginBottom: 34}}>
          <View style={styles.sexStyle}>
            <MediumText text={'Ảnh chân dung'} style={styles.titleSex} />
          </View>

          <FormInput
            title={'Họ và tên:'}
            value={firstLastName}
            placeholder={'Nhập họ và tên:'}
            onChangeText={this.onChangName}
          />
          <FormInput
            title={'Số CMT/CCCD/Hộ chiếu:'}
            value={cmnd}
            placeholder={'Nhập số CMT/CCCD/Hộ chiếu'}
            keyboardType={'phone-pad'}
            onChangeText={this.onChangName}
          />
          <FormInput
            title={
              'Mã số BHXH(Đây là thông tin quan trọng để cơ quan chức năng kiểm soát, hỗ trợ bạn tốt hơn):'
            }
            value={firstLastName}
            placeholder={'Nhập Mã số BHXH'}
            onChangeText={this.onChangName}
          />
          <FormInput
            title={'Ngày tháng năm sinh:'}
            value={firstLastName}
            placeholder={'Ngày/Tháng/Năm(VD 02/12/1995)'}
            onChangeText={this.onChangName}
          />
          <View style={styles.sexStyle}>
            <MediumText text={'Giới tính'} style={styles.titleSex} />
            <View style={{flexDirection: 'row'}}>
              <RadioButton checked={checked} onPress={this.onCheckedSex} />
              <Text text={'Nam'} />
              <RadioButton checked={!checked} onPress={this.onCheckedSex} />
              <Text text={'Nữ'} />
            </View>
          </View>

          <View style={styles.sexStyle}>
            <MediumText text={'Quốc tịch'} style={styles.titleSex} />
            <SelectPicker
              data={countryList}
              valueDefault={'Viet Nam'}
              placeholder={'Quốc tịch'}
            />
          </View>
          <View style={styles.sexStyle}>
            <MediumText text={'Địa chỉ hiện tại'} style={styles.titleSex} />
            <SelectPicker
              data={cityList}
              valueDefault={''}
              placeholder={'Chọn Tỉnh/ Thành phố'}
              containerStyle={{marginBottom: 8}}
            />
            <SelectPicker
              data={cityList}
              valueDefault={''}
              placeholder={'Chọn Quận/Huyện'}
              containerStyle={{marginBottom: 8}}
            />
            <SelectPicker
              data={cityList}
              valueDefault={''}
              placeholder={'Chọn Xã/Phường'}
              containerStyle={{marginBottom: 8}}
            />
            <TextInput
              placeholder={'Số nhà, đường...'}
              style={styles.inputNumberHome}
            />
          </View>

          <FormInput
            title={'Số điện thoại'}
            value={firstLastName}
            placeholder={'Nhập số điện thoại'}
            onChangeText={this.onChangName}
          />

          <FormInput
            title={'Email'}
            value={firstLastName}
            placeholder={'Nhập email'}
            onChangeText={this.onChangName}
          />
        </InputScrollView>
      </SafeAreaView>
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
