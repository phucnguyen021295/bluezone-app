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
import * as PropTypes from 'prop-types';
import {
  SafeAreaView,
  View,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Keyboard,
  Animated,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import Modal from 'react-native-modal';
import {injectIntl, intlShape} from 'react-intl';

import Header from '../../../base/components/Header';
import ButtonIconText from '../../../base/components/ButtonIconText';
import CountDown from './components/CountDown';
import Text from '../../../base/components/Text';
import ButtonBase from '../../../base/components/ButtonBase';
import ModalBase from '../../../base/components/ModalBase';

// Utils
import configuration, {
  setAppMode,
  setPhoneNumber,
  syncTokenFirebase,
} from '../../../configuration';
import {createPhoneNumberReminder} from '../../../core/announcement';
import {messageNotifyOTPSuccess} from '../../../core/data';
import message from '../../../core/msg/verifyOtp';

// Api
import {
  CreateAndSendOTPCode,
  checkModeEntry,
  verifyOTPEntry,
} from '../../../core/apis/bluezone';
import {ConfirmOTPCodeErrorCode} from '../../../core/apis/errorCode';
import {
  clearScheduleRegisterNotification,
  creatScheduleAddInfoNotification,
} from '../../../core/notifyScheduler';

// Styles
import styles from './styles/index.css';
import * as fontSize from '../../../core/fontSize';
import {
  ButtonClose,
  ButtonConfirm,
} from '../../../base/components/ButtonText/ButtonModal';
import {removeDeliveredNotification} from '../../../core/fcm';
import {reportScreenAnalytics} from '../../../core/analytics';
import SCREEN from '../../nameScreen';

const TIMEOUT_LOADING = 800;

const visibleModal = {
  isProcessing: false,
  isVisibleVerifySuccess: false,
  isVisibleVerifyOTPExpired: false,
  isVisibleVerifyOTPInvalid: false,
  isVisibleVerifyError: false,
};

class VerifyOTPScreen extends React.Component {
  constructor(props) {
    super(props);
    let _state = {};
    Object.assign(_state, visibleModal, {
      disabled: true,
      otp: '',
      visibleSendOTPBtn: false,
    });
    this.state = _state;

    this.marginTop = new Animated.Value(62);

    this.keyboardDidShow = this.keyboardDidShow.bind(this);
    this.keyboardDidHide = this.keyboardDidHide.bind(this);
    this.onOTPSuccessModalPress = this.onOTPSuccessModalPress.bind(this);
    this.onConfirmOTPPress = this.onConfirmOTPPress.bind(this);
    this.verifyOTPCodeApi = this.verifyOTPCodeApi.bind(this);
    this.stopLoading = this.stopLoading.bind(this);
    this.onVerifyOTPCodeSuccess = this.onVerifyOTPCodeSuccess.bind(this);
    this.onVerifyOTPCodeFail = this.onVerifyOTPCodeFail.bind(this);
    this.modalVerifyOTPError = this.modalVerifyOTPError.bind(this);
    this.alertVerifyOTPError = this.alertVerifyOTPError.bind(this);
    this.alertOTPInvalid = this.alertOTPInvalid.bind(this);
    this.alertOTPExpired = this.alertOTPExpired.bind(this);
    this.onOTPChange = this.onOTPChange.bind(this);
    this.onReGetOTP = this.onReGetOTP.bind(this);
    this.onRegetOTPByButtonModal = this.onRegetOTPByButtonModal.bind(this);
    this.createAndSendOTPCodeApi = this.createAndSendOTPCodeApi.bind(this);
    this.createAndSendOTPCodeSuccess = this.createAndSendOTPCodeSuccess.bind(
      this,
    );
    this.createAndSendOTPCodeFail = this.createAndSendOTPCodeFail.bind(this);
    this.onVisibleResetOTP = this.onVisibleResetOTP.bind(this);
    this.onCloseScreenPress = this.onCloseScreenPress.bind(this);
    this.onTryAgain = this.onTryAgain.bind(this);
    this.onResetModal = this.onResetModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  componentDidMount() {
    this.ref.focus();

    reportScreenAnalytics(SCREEN.PHONE_NUMBER_VERITY_OTP);

    this.keyboardWillShowSub = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow,
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
  }

  keyboardDidShow(event) {
    Animated.timing(this.marginTop, {
      duration: event.duration,
      toValue: 20,
    }).start();
  }

  keyboardDidHide(event) {
    Animated.timing(this.marginTop, {
      duration: event.duration,
      toValue: 62,
    }).start();
  }

  setCountDownRef = ref => {
    this.countDownRef = ref;
  };

  onOTPSuccessModalPress() {
    this.onResetModal(() => {
      this.props.navigation.goBack();
    });
  }

  onConfirmOTPPress() {
    const {otp} = this.state;
    this.setState({isVisibleVerifyOTPInvalid: false, isProcessing: true}, () =>
      this.verifyOTPCodeApi(this.PhoneNumber, otp),
    );
  }

  verifyOTPCodeApi(otp) {
    // verifyOTPEntry(otp, this.onVerifyOTPCodeSuccess, this.onVerifyOTPCodeFail);
    this.onVerifyOTPCodeSuccess();
  }

  stopLoading(callback) {
    this.setState({isProcessing: false}, callback);
  }

  onVerifyOTPCodeSuccess() {
    setAppMode('entry');
    this.stopLoading(() =>
      setTimeout(() => {
        this.setState({isVisibleVerifySuccess: true});
      }, TIMEOUT_LOADING),
    );
  }

  onVerifyOTPCodeFail(response) {
    const Status = response?.data?.Status || '0';

    if (Status === ConfirmOTPCodeErrorCode.MA_OTP_KHONG_HOP_LE) {
      this.stopLoading(() => {
        setTimeout(() => this.alertOTPInvalid(Status), TIMEOUT_LOADING);
      });
      // } else if (Status === ConfirmOTPCodeErrorCode.MA_OTP_DA_HET_HAN) {
      //   this.stopLoading(() => {
      //     setTimeout(() => this.alertOTPExpired(Status), TIMEOUT_LOADING);
      //   });
    } else {
      this.modalVerifyOTPError(Status);
    }
  }

  modalVerifyOTPError(codeString) {
    this.stopLoading(() => {
      setTimeout(() => this.alertVerifyOTPError(codeString), TIMEOUT_LOADING);
    });
  }

  alertVerifyOTPError(Status) {
    this.setState({codeString: Status, isVisibleVerifyError: true});
  }

  alertOTPInvalid(Status) {
    this.setState({codeString: Status, isVisibleVerifyOTPInvalid: true});
  }

  alertOTPExpired(Status) {
    this.setState({isVisibleVerifyOTPExpired: true, codeString: Status});
  }

  onOTPChange(value) {
    this.setState({otp: value, disabled: !(value.length === 6)});
  }

  onReGetOTP() {
    const {TokenFirebase} = configuration;
    const phoneNumber = this.props.route.params.phoneNumber;
    this.setState(
      {isVisibleVerifyOTPInvalid: false, isProcessing: true},
      () => {
        this.createAndSendOTPCodeApi(TokenFirebase, phoneNumber);
      },
    );
  }

  onRegetOTPByButtonModal() {
    this.onResetModal(() => {
      this.setState({
        visibleSendOTPBtn: false,
      });
      this.onReGetOTP();
    });
  }

  createAndSendOTPCodeApi(phoneNumber, TokenFirebase) {
    syncTokenFirebase(() => {
      CreateAndSendOTPCode(
        TokenFirebase,
        phoneNumber,
        this.createAndSendOTPCodeSuccess,
        this.createAndSendOTPCodeFail,
      );
    }, this.createAndSendOTPCodeFail);
  }

  createAndSendOTPCodeSuccess() {
    if (this.countDownRef && !this.state.visibleSendOTPBtn) {
      this.countDownRef.reset();
    }
    this.setState({isProcessing: false, visibleSendOTPBtn: false});
  }

  createAndSendOTPCodeFail() {
    this.setState({isProcessing: false, showErrorModal: true});
  }

  onCloseScreenPress() {
    this.props.navigation.goBack();
  }

  onVisibleResetOTP() {
    this.setState({visibleSendOTPBtn: true});
  }

  onTryAgain() {
    const {otp} = this.state;
    this.onResetModal(() => {
      setTimeout(
        () => this.verifyOTPCodeApi(this.PhoneNumber, otp),
        TIMEOUT_LOADING,
      );
    });
  }

  onResetModal(callback) {
    this.setState(visibleModal, callback);
  }

  onCloseModal() {
    this.onResetModal();
  }

  renderModal() {
    const {
      codeString,
      isProcessing,
      isVisibleVerifyOTPInvalid,
      isVisibleVerifyOTPExpired,
      isVisibleVerifySuccess,
      isVisibleVerifyError,
    } = this.state;
    const {intl} = this.props;
    const {formatMessage} = intl;
    return (
      <>
        <Modal isVisible={isProcessing} style={styles.center}>
          <ActivityIndicator size="large" color={'#fff'} />
        </Modal>

        {/* Mã OTP không đúng */}
        <ModalBase
          isVisibleModal={isVisibleVerifyOTPInvalid}
          title={formatMessage(message.optNotValid)}
          description={formatMessage(message.saveOTP)}>
          <View style={styles.lBtnModal}>
            <ButtonConfirm
              text={formatMessage(message.agree)}
              onPress={this.onCloseModal}
            />
          </View>
        </ModalBase>

        {/* Mã OTP đã hết hạn */}
        <ModalBase
          isVisibleModal={isVisibleVerifyOTPExpired}
          title={formatMessage(message.errorTitle)}
          description={`${formatMessage(message.otpdate)}`}>
          <View style={styles.lBtnModal}>
            <ButtonClose
              text={formatMessage(message.dong)}
              onPress={this.onCloseModal}
            />
            <View style={styles.borderBtn} />
            <ButtonConfirm
              text={formatMessage(message.btnTryAgain)}
              onPress={this.onRegetOTPByButtonModal}
            />
          </View>
        </ModalBase>

        {/* Xác thực OTP thành công */}
        <ModalBase
          isVisibleModal={isVisibleVerifySuccess}
          title={formatMessage(message.otpsuccess)}>
          <View style={styles.lBtnModal}>
            <ButtonConfirm
              text={formatMessage(message.btnAgree)}
              onPress={this.onOTPSuccessModalPress}
            />
          </View>
        </ModalBase>

        {/* Xác thực OTP thất bại */}
        <ModalBase
          isVisibleModal={isVisibleVerifyError}
          title={formatMessage(message.errorTitle)}
          description={`${formatMessage(message.errorServer)}[${codeString}]`}>
          <View style={styles.lBtnModal}>
            <ButtonConfirm
              text={formatMessage(message.agree)}
              onPress={this.onCloseModal}
            />
          </View>
        </ModalBase>
      </>
    );
  }

  render() {
    const {intl} = this.props;
    const {disabled, visibleSendOTPBtn} = this.state;
    const {formatMessage} = intl;
    return (
      <SafeAreaView style={styles.container}>
        <Header title={'Xác thực nhập cảnh'} />
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            ref={ref => {
              this.scrollView = ref;
            }}
            onLayout={() => {
              this.scrollView.scrollToEnd({animated: true});
            }}>
            <View style={styles.content}>
              <Text style={styles.text1}>
                {formatMessage(message.enterPin)}
              </Text>
            </View>
            <TextInput
              ref={ref => (this.ref = ref)}
              autoFocus={true}
              style={styles.inputOTPMax}
              maxLength={6}
              allowFontScaling={false}
              placeholder={formatMessage(message.pleaseEnterYourPhone)}
              placeholderTextColor={'#b5b5b5'}
              keyboardType={'number-pad'}
              onChangeText={this.onOTPChange}
            />
            <View style={styles.buttonConfirm}>
              <ButtonIconText
                disabled={disabled}
                onPress={this.onConfirmOTPPress}
                text={formatMessage(message.confirm)}
                styleBtn={[
                  disabled ? styles.btnConfim : styles.colorButtonConfirm,
                ]}
                styleText={{fontSize: fontSize.normal}}
                styleIcon={styles.iconButtonConfirm}
              />
            </View>
            {/*<View style={styles.layoutCountdown}>*/}
            {/*  {!visibleSendOTPBtn ? (*/}
            {/*    <>*/}
            {/*      <Text style={styles.text3}>*/}
            {/*        {formatMessage(message.validPin)}{' '}*/}
            {/*      </Text>*/}
            {/*      <CountDown*/}
            {/*        ref={this.setCountDownRef}*/}
            {/*        onVisibleResetOTP={this.onVisibleResetOTP}*/}
            {/*      />*/}
            {/*    </>*/}
            {/*  ) : (*/}
            {/*    <Text onPress={this.onReGetOTP} style={styles.textSendOTP}>*/}
            {/*      {formatMessage(message.resetOTP)}*/}
            {/*    </Text>*/}
            {/*  )}*/}
            {/*</View>*/}
          </ScrollView>
        </KeyboardAvoidingView>
        <ButtonBase
          title={`${formatMessage(message.skip)}`}
          onPress={this.onCloseScreenPress}
          containerStyle={styles.containerStyle}
          titleStyle={styles.textInvite}
        />
        {this.renderModal()}
      </SafeAreaView>
    );
  }
}

VerifyOTPScreen.propTypes = {
  intl: intlShape.isRequired,
  onFinished: PropTypes.func,
};

VerifyOTPScreen.defaultProps = {
  disabled: true,
};

export default injectIntl(VerifyOTPScreen);
