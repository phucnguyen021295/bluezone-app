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

import React, {useContext} from 'react';
import {intlShape, injectIntl} from 'react-intl';
import {
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CheckBox from '../../../../../base/components/CheckBox';

// Components
import Text, {MediumText} from '../../../../../base/components/Text';
import TextInfo from '../TextInfo';

// core
import messages from '../../../../../core/msg/entryForm';

// styles
import styles from '../../styles/index.css';
import FormInput from '../../../../../base/components/FormInput';
import {
  exposureHistoryData,
  quarantinePlaceData,
  symptomData,
  yearBirth,
} from '../../data';
import RadioButton from '../../../../../base/components/RadioButton';
import {CheckBox as CheckBox1} from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {LanguageContext} from '../../../../../../LanguageContext';

const Declaration = props => {
  const {intl, data} = props;
  const {formatMessage} = intl;

  const {language} = useContext(LanguageContext);
  const vietnamese = language === 'vi';
  const {
    portraitURL,
    portraitBase64,
    gateID,
    gateName,
    fullName,
    yearOfBirth,
    gender,
    nationalityID,
    nationalityName,
    passport,
    vehicle_Planes,
    vehicle_Ship,
    vehicle_Car,
    otherVehicles,
    vehicleNumber,
    vehicleSeat,
    isPickerStartDateVisible,
    startDateString,
    startDate,
    isPickerEndDateVisible,
    endDateString,
    endDate,
    startCountryID,
    startCountryName,
    startProvince,
    startProvinceID,
    startProvinceName,
    country21Day,
    endProvinceID,
    endProvinceName,
    afterQuarantine_ProvinceID,
    afterQuarantine_ProvinceName,
    afterQuarantine_DistrictID,
    afterQuarantine_DistrictName,
    afterQuarantine_WardID,
    afterQuarantine_WardName,
    afterQuarantine_Address,
    vn_ProvinceID,
    vn_ProvinceName,
    vn_DistrictID,
    vn_DistrictName,
    vn_WardID,
    vn_WardName,
    vn_Address,
    numberPhone,
    email,
    symptom,
    vacxin,
    exposureHistory,
    testResultImageURL,
    testResultImageBase64,
    testResult,
    testDateString,
    testDate,
    isPickerTestDateVisible,
    gates,
    countries,
    provinces,
    vn_Districts,
    vn_Wards,
    afterQuarantine_Districts,
    afterQuarantine_Wards,
    quarantinePlace,
    otherQuarantinePlace,
  } = data;

  const portraitSource =
    portraitBase64 || portraitURL
      ? {
          uri: portraitBase64
            ? `data:image/png;base64,${portraitBase64}`
            : portraitURL,
        }
      : require('../..//images/avatar.png');

  const testResultImageSource =
    testResultImageURL || testResultImageBase64
      ? {
          uri: testResultImageBase64
            ? `data:image/png;base64,${testResultImageBase64}`
            : testResultImageURL,
        }
      : null;

  return (
    <ScrollView style={styles.scroll}>
      <Text style={styles.label1}>{formatMessage(messages.content1)}</Text>
      <Text style={styles.labelRed}>{formatMessage(messages.content2)}</Text>

      {/*Anh chan dung*/}
      <View style={styles.itemContainer}>
        <TextInfo
          styleContainer={styles.itemTitle}
          text={formatMessage(messages.portrait)}
          star
        />

        <View style={styles.portraitContainer}>
          <Image style={styles.portraitImage} source={portraitSource} />
        </View>
      </View>

      {/*Cua khau*/}
      <View style={styles.itemContainer}>
        <TextInfo
          styleContainer={styles.itemTitle}
          text={formatMessage(messages.gate)}
          star
        />
        <Text text={gateName} />
      </View>

      {/*Ho ten*/}
      <FormInput
        title={formatMessage(messages.fullName)}
        star={true}
        autoCapitalize="characters"
        value={fullName}
        disable
      />

      {/*Nam sinh*/}
      <View style={styles.itemContainer}>
        <TextInfo
          styleContainer={styles.itemTitle}
          text={formatMessage(messages.yearOfBirth)}
          star
        />
        <Text text={yearOfBirth} />
      </View>

      {/*Gioi tinh*/}
      <View style={styles.itemContainer}>
        <TextInfo
          text={formatMessage(messages.gender)}
          styleContainer={styles.itemTitle}
          star
        />
        <View style={styles.flexRow}>
          <TouchableOpacity style={styles.genderFirstItemContainer}>
            <RadioButton checked={gender === '1'} />
            <MediumText
              style={styles.gender}
              text={formatMessage(messages.male)}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.genderItemContainer}>
            <RadioButton checked={gender === '2'} />
            <MediumText
              style={styles.gender}
              text={formatMessage(messages.female)}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.genderItemContainer}>
            <RadioButton checked={gender === '3'} />
            <MediumText
              style={styles.gender}
              text={formatMessage(messages.genderOther)}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/*Quoc tich*/}
      <View style={styles.itemContainer}>
        <TextInfo
          styleContainer={styles.itemTitle}
          text={formatMessage(messages.nationality)}
          star
        />
        <Text text={nationalityName} />
      </View>

      {/*So ho chieu / giay thong hanh*/}
      <FormInput
        title={formatMessage(messages.passportNumber)}
        star={true}
        placeholder={formatMessage(messages.passportPlaceholder)}
        keyboardType={'phone-pad'}
        value={passport}
        disable
      />

      {/*Thong tin di lai*/}
      <View style={styles.itemContainer}>
        <TextInfo
          styleContainer={styles.itemTitle}
          text={formatMessage(messages.vehicleInformation)}
          star
        />
        <View style={styles.flexRow}>
          <CheckBox
            checked={vehicle_Planes}
            title={formatMessage(messages.planes)}
            containerStyle={styles.checkboxContainer}
            textStyle={styles.checkBoxText}
          />
          <CheckBox
            checked={vehicle_Ship}
            title={formatMessage(messages.ship)}
            containerStyle={styles.checkboxContainer}
            textStyle={styles.checkBoxText}
          />
          <CheckBox
            checked={vehicle_Car}
            title={formatMessage(messages.car)}
            containerStyle={styles.checkboxContainer}
            textStyle={styles.checkBoxText}
          />
        </View>

        <TextInfo
          styleContainer={[styles.headerTwoContainer, {marginTop: 10}]}
          style={styles.headerTwo}
          text={formatMessage(messages.vehicleOther)}
        />
        <Text>{otherVehicles}</Text>
      </View>

      {/*So hieu phuong tien*/}
      <FormInput
        containerStyle={styles.vehicleNumber}
        title={formatMessage(messages.vehicleNumber)}
        value={vehicleNumber}
        disable
      />

      {/*So ghe*/}
      <FormInput
        containerStyle={styles.vehicleSeat}
        title={formatMessage(messages.vehicleSeat)}
        value={vehicleSeat}
        disable
      />

      {/*Ngay khoi hanh*/}
      <View style={styles.itemContainer}>
        <TextInfo
          styleContainer={styles.itemTitle}
          text={formatMessage(messages.startDay)}
          star
        />
        <Text text={startDateString} />
      </View>

      {/*Ngay nhap canh*/}
      <View style={styles.itemContainer}>
        <TextInfo
          styleContainer={styles.itemTitle}
          text={formatMessage(messages.endDay)}
          star
        />
        <Text text={endDateString} />
      </View>

      {/*Dia diem khoi hanh*/}
      <View>
        <TextInfo
          styleContainer={[styles.itemTitle, {paddingTop: 10}]}
          text={formatMessage(messages.startPlace)}
        />
        <View style={styles.item2Container}>
          <TextInfo
            styleContainer={styles.headerTwoContainer}
            style={styles.headerTwo}
            text={formatMessage(messages.country)}
            star
          />
          <Text text={startCountryName} />
        </View>
        <View style={styles.item2Container}>
          <TextInfo
            styleContainer={styles.headerTwoContainer}
            style={styles.headerTwo}
            text={formatMessage(messages.province)}
            star
          />
          <Text text={startProvinceName} />
        </View>
      </View>

      {/*Dia diem noi den*/}
      <View>
        <TextInfo
          styleContainer={[styles.itemTitle, {paddingTop: 10}]}
          text={formatMessage(messages.endPlace)}
        />

        <View style={styles.item2Container}>
          <TextInfo
            styleContainer={styles.headerTwoContainer}
            style={styles.headerTwo}
            text={formatMessage(messages.country)}
            star
          />
          <View>
            <Text>{formatMessage(messages.vietnam)}</Text>
          </View>
        </View>

        <View style={styles.item2Container}>
          <TextInfo
            styleContainer={styles.headerTwoContainer}
            style={styles.headerTwo}
            text={formatMessage(messages.province)}
            star
          />
          <Text text={endProvinceName} />
        </View>
        <FormInput
          title={formatMessage(messages.country21Day)}
          textStyle={styles.headerTwo}
          value={country21Day}
          star
          disable
        />
      </View>

      {/*Dia chi luu tru sau khi cach ly*/}
      <View>
        <TextInfo
          styleContainer={[styles.itemTitle, {paddingTop: 10}]}
          text={formatMessage(messages.afterQuarantinePlace)}
        />

        <View style={styles.item2Container}>
          <TextInfo
            styleContainer={styles.headerTwoContainer}
            style={styles.headerTwo}
            text={formatMessage(messages.vnProvince)}
          />
          <Text text={afterQuarantine_ProvinceName} />
        </View>

        <View style={styles.item2Container}>
          <TextInfo
            styleContainer={styles.headerTwoContainer}
            style={styles.headerTwo}
            text={formatMessage(messages.vnDistrict)}
          />
          <Text text={afterQuarantine_DistrictName} />
        </View>

        <View style={styles.item2Container}>
          <TextInfo
            styleContainer={styles.headerTwoContainer}
            style={styles.headerTwo}
            text={formatMessage(messages.vnWard)}
          />
          <Text text={afterQuarantine_WardName} />
        </View>

        <FormInput
          title={formatMessage(messages.afterQuarantineAddress)}
          textStyle={styles.headerTwo}
          containerStyle={styles.headerTwoContainer}
          value={afterQuarantine_Address}
          disable
        />
      </View>

      {/*Dia chi lien lac tai viet nam*/}
      <View>
        <TextInfo
          styleContainer={[styles.itemTitle, {paddingTop: 10}]}
          text={formatMessage(messages.vnContactAddress)}
        />

        <View style={styles.item2Container}>
          <TextInfo
            styleContainer={styles.headerTwoContainer}
            style={styles.headerTwo}
            text={formatMessage(messages.vnProvince)}
            star
          />
          <Text text={vn_ProvinceName} />
        </View>

        <View style={styles.item2Container}>
          <TextInfo
            styleContainer={styles.headerTwoContainer}
            style={styles.headerTwo}
            text={formatMessage(messages.vnDistrict)}
            star
          />
          <Text text={vn_DistrictName} />
        </View>

        <View style={styles.item2Container}>
          <TextInfo
            styleContainer={styles.headerTwoContainer}
            style={styles.headerTwo}
            text={formatMessage(messages.vnWard)}
            star
          />
          <Text text={vn_WardName} />
        </View>

        <FormInput
          title={formatMessage(messages.vnAddress)}
          textStyle={styles.headerTwo}
          containerStyle={styles.headerTwoContainer}
          value={vn_Address}
          star
          disable
        />

        <FormInput
          title={formatMessage(messages.phoneNumber)}
          textStyle={styles.headerTwo}
          containerStyle={styles.headerTwoContainer}
          star
          value={numberPhone}
          disable
        />

        <FormInput
          title={formatMessage(messages.email)}
          textStyle={styles.headerTwo}
          containerStyle={styles.headerTwoContainer}
          value={email}
          disable
        />
      </View>

      {/*Trieu chung trong 21 ngay*/}
      <View style={styles.itemContainer}>
        <TextInfo
          styleContainer={styles.itemTitle}
          text={formatMessage(messages.symptom21Day)}
          star
        />
        <View style={{paddingBottom: 10}}>
          <View style={styles.rowSymptom0}>
            <MediumText style={styles.nameSymptom}>
              {formatMessage(messages.symptom)}
            </MediumText>
            <MediumText style={styles.buttonSymptom}>
              {formatMessage(messages.yes)}
            </MediumText>
            <MediumText style={styles.buttonSymptom}>
              {formatMessage(messages.no)}
            </MediumText>
          </View>

          {symptomData.map((symptomItem, index) => (
            <View
              key={symptomItem.id}
              style={index % 2 === 0 ? styles.rowSymptom1 : styles.rowSymptom2}>
              <Text style={styles.nameSymptom}>
                {vietnamese ? symptomItem.name : symptomItem.nameEn}
                <Text style={styles.star}> *</Text>
              </Text>
              <TouchableOpacity
                style={styles.checkboxSymptom}
                activeOpacity={1}
                disabled>
                <RadioButton
                  disabled
                  checked={symptom[symptomItem.id] === true}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.checkboxSymptom}
                activeOpacity={1}
                disabled>
                <RadioButton
                  disabled
                  checked={symptom[symptomItem.id] === false}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <FormInput
          textStyle={styles.headerTwo}
          containerStyle={{
            paddingTop: 0,
            paddingBottom: 0,
          }}
          title={formatMessage(messages.vacxinContent)}
          value={vacxin}
          disable
        />
      </View>

      {/*Lich su phoi nhiem trong 21 ngay*/}
      <View style={styles.itemContainer}>
        <TextInfo
          styleContainer={styles.itemTitle}
          text={formatMessage(messages.exposureHistory21Day)}
          star
        />
        <View>
          <View style={styles.rowSymptom0}>
            <MediumText style={styles.nameSymptom} />
            <MediumText style={styles.buttonSymptom}>
              {formatMessage(messages.yes)}
            </MediumText>
            <MediumText style={styles.buttonSymptom}>
              {formatMessage(messages.no)}
            </MediumText>
          </View>

          {exposureHistoryData.map(exposureItem => (
            <View key={exposureItem.id} style={styles.rowSymptom1}>
              <Text style={styles.nameSymptom}>
                {vietnamese ? exposureItem.name : exposureItem.nameEn}
                <Text style={styles.star}> *</Text>
              </Text>
              <TouchableOpacity
                disabled
                style={styles.checkboxSymptom}
                activeOpacity={1}>
                <RadioButton
                  disabled
                  checked={exposureHistory[exposureItem.id] === true}
                />
              </TouchableOpacity>
              <TouchableOpacity
                disabled
                style={styles.checkboxSymptom}
                activeOpacity={1}>
                <RadioButton
                  disabled
                  checked={exposureHistory[exposureItem.id] === false}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/*Co so cach ly*/}
      <View style={styles.itemContainer}>
        <TextInfo
          styleContainer={styles.itemTitle}
          text={formatMessage(messages.quarantinePlace)}
          star
        />
        {quarantinePlaceData.map(item => {
          return (
            <CheckBox1
              key={item.id}
              title={language === 'vi' ? item.name : item.nameEn}
              containerStyle={styles.checkboxContainer}
              textStyle={styles.checkBoxText}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              size={18}
              checked={item.id === quarantinePlace}
              disabled
            />
          );
        })}

        {quarantinePlace === 'quarantineOther' && (
          <TextInput style={[styles.textInput]} value={otherQuarantinePlace} />
        )}
      </View>

      {/*Phieu ket qua xet nghiem*/}
      <View>
        <TextInfo
          styleContainer={styles.itemTitle}
          text={formatMessage(messages.testResult)}
        />
        <View
          style={[
            styles.flexRow,
            {paddingTop: 8, paddingBottom: 10, alignItems: 'center'},
          ]}>
          <TouchableOpacity
            style={
              testResultImageBase64 || testResultImageURL
                ? styles.testResultImageBtn
                : styles.testResultBtn
            }>
            {testResultImageBase64 || testResultImageURL ? (
              <Image
                style={styles.testResultImage}
                source={testResultImageSource}
              />
            ) : null}
          </TouchableOpacity>

          <View style={{marginLeft: 20}}>
            <TouchableOpacity style={styles.rowSymptom1} disabled>
              <RadioButton disabled checked={testResult === true} />
              <MediumText>{formatMessage(messages.negative)}</MediumText>
            </TouchableOpacity>
            <TouchableOpacity disabled style={styles.rowSymptom1}>
              <RadioButton disabled checked={testResult === false} />
              <MediumText>{formatMessage(messages.positive)}</MediumText>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/*Ngay xet nghiem*/}
      <View style={styles.itemContainer}>
        <TextInfo
          styleContainer={styles.itemTitle}
          text={formatMessage(messages.testDate)}
        />
        <Text>{testDateString}</Text>
      </View>

      <Text style={styles.labelRed}>{formatMessage(messages.content3)}</Text>
    </ScrollView>
  );
};

Declaration.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Declaration);
