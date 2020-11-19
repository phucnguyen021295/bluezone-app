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

import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {NativeEventEmitter, NativeModules} from 'react-native';

// Components
import LoadingScreen from './app/main/components/LoadingScreen';
import Home from './app/main/components/MainScreen';
import Welcome from './app/main/components/WelcomeScreen';
import WatchScan from './app/main/components/WatchScanScreen';
import HistoryScan from './app/main/components/HistoryScanScreen';
import NotifyDetail from './app/main/components/NotifyDetail';
import PhoneNumberRegister from './app/main/components/PhoneNumberRegisterScreen';
import PhoneNumberVerifyOTP from './app/main/components/PhoneNumberVerifyOTPScreen';
import HistoryUploadOTP from './app/main/components/HistoryUploadOTPScreen';
import PageView from './app/main/components/PageViewScreen';
import DetailNew from './app/main/components/DetailNewScreen';
import ViewLog from './app/main/components/ViewLog';
import DownloadLatestVersion from './app/main/components/DownloadLatestVersionScreen';
import Introduction from './app/main/components/IntroductionScreen';
import StartUse from './app/main/components/StartScreen';
import RegisterInformation from './app/main/components/RegisterInformationScreen';
import ContactHistory from './app/main/components/ContactHistoryScreen';
// import ScanScreen from './app/main/components/ScanScreen';
import FAQ from './app/main/components/FAQScreen';
// import DailyDeclaration from './app/main/components/DailyDeclarationScreen';
// import DomesticDeclaration from './app/main/components/DomesticDeclarationScreen';
// import EntryDeclaration from './app/main/components/EntryDeclarationScreen';
import EntryDeclareSuccess from './app/main/components/EntryDeclareSuccess';
import Entry from './app/main/components/EntryScreen';
import EntryVerifyOTP from './app/main/components/EntryVerifyOTPScreen';

import ContextProvider from './LanguageContext';
import LanguageProvider from './app/base/LanguageProvider';
import {translationMessages} from './app/i18n';
import {remoteMessageListener} from './app/core/push';
import decorateMainAppStart from './app/main/decorateMainAppStart';
import {navigationRef, navigate} from './RootNavigation';
import {registerMessageHandler, registerNotification} from './app/core/fcm';
import {removeNotificationLimit} from './app/core/db/SqliteDb';

// Api
import {registerResourceLanguageChange} from './app/core/language';

const isLastStepOfWizard = name => {
  return wizard.indexOf(name) + 1 === wizard.length;
};

const nextStepName = name => {
  if (wizard.indexOf(name) + 1 >= wizard.length) {
    throw new Error('nexStepName: Khong ton tai buoc tiep theo');
  }
  return wizard[wizard.indexOf(name) + 1];
};

const prevStepName = name => {
  if (wizard.indexOf(name) - 1 < 0) {
    throw new Error('prevStepName: Khong ton tai buoc tiep theo');
  }
  return wizard[wizard.indexOf(name) - 1];
};

// Const
import {NOTIFICATION_TYPE} from './app/const/notification';
import SCREEN from './app/main/nameScreen';

let wizard = [
  SCREEN.LOADING,
  SCREEN.INTRODUCTION_WIZARD,
  SCREEN.PHONE_NUMBER_REGISTER_WIZARD,
  SCREEN.PHONE_NUMBER_VERITY_OTP_WIZARD,
  SCREEN.REGISTER_INFORMATION_WIZARD,
  SCREEN.START_USE_WIZARD,
];
const LOADING_INITIAL_ROUTE = SCREEN.LOADING;
const MAIN_INITIAL_ROUTE = SCREEN.HOME;
const WELCOME_INITIAL_ROUTE = SCREEN.WELCOME_WIZARD;

import {
  registerNotificationOpened,
  registerInitialNotification,
  removeDeliveredNotification,
} from './app/core/fcm';
import {getIsFirstLoading, setIsFirstLoading} from './app/core/storage';
import {readNotification} from './app/core/announcement';

// Components
const HomeScreen = decorateMainAppStart(Home);
const Stack = createStackNavigator();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      isHome: false,
      isFirstLoading: '',
      translationMessagesState: translationMessages,
    };

    this.onResourceLanguageChange = this.onResourceLanguageChange.bind(this);
    this.onChangeStackHome = this.onChangeStackHome.bind(this);

    registerResourceLanguageChange(this.onResourceLanguageChange);

    this.LoadingProps = propsComponent => (
      <LoadingScreen
        name={SCREEN.LOADING}
        onFinished={this.handleFinishedWork}
        {...propsComponent}
      />
    );

    this.IntroducationProps = propsComponent => (
      <Introduction
        name={SCREEN.INTRODUCTION_WIZARD}
        onFinished={this.handleFinishedWork}
        {...propsComponent}
      />
    );

    this.PhoneNumberRegisterProps = propsComponent => (
      <PhoneNumberRegister
        name={SCREEN.PHONE_NUMBER_REGISTER_WIZARD}
        onFinished={this.handleFinishedWork}
        {...propsComponent}
      />
    );

    this.PhoneNumberVerifyOTPProps = propsComponent => (
      <PhoneNumberVerifyOTP
        name={SCREEN.PHONE_NUMBER_VERITY_OTP_WIZARD}
        onFinished={this.handleFinishedWork}
        {...propsComponent}
      />
    );

    this.RegisterInformationProps = propsComponent => (
      <RegisterInformation
        name={SCREEN.REGISTER_INFORMATION_WIZARD}
        onFinished={this.handleFinishedWork}
        {...propsComponent}
      />
    );

    this.StartUseProps = propsComponent => (
      <StartUse
        name={SCREEN.START_USE_WIZARD}
        onFinished={this.handleFinishedWork}
        {...propsComponent}
      />
    );

    this.WelcomeProps = propsComponent => (
      <Welcome
        name={SCREEN.WELCOME_WIZARD}
        onFinished={this.onChangeStackHome}
        {...propsComponent}
      />
    );

    this.HomeProps = propsComponent => (
      <HomeScreen name={MAIN_INITIAL_ROUTE} {...propsComponent} />
    );
  }

  async componentDidMount() {
    // Check trạng thái lần đầu tiên vào app => hien: Dang khoi tao. Lan sau: Dang dong bo
    const isFirstLoading = await getIsFirstLoading();
    this.setState({isFirstLoading: isFirstLoading === null});
    if (isFirstLoading === null) {
      setIsFirstLoading(false);
    }

    this.removeNotificationOpenedListener = registerNotificationOpened(
      this.onNotificationOpened,
    );

    // Check whether an initial notification is available
    registerInitialNotification(this.onNotificationOpened);

    const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);
    this.eventListener = eventEmitter.addListener(
      'notifications_notification_opened',
      event => {
        debugger;
      },
    );

    this.removeMessageListener = registerMessageHandler(async notifyObj => {
      // TODO can sua ve dung dev trong server.js het => Khong duoc, __DEV__ nay chi dung cho debugger thoi
      if (__DEV__) {
        alert(JSON.stringify(notifyObj));
      }
      await remoteMessageListener(notifyObj);
    });

    this.removeNotificationListener = registerNotification(notifyObj => {
      if (__DEV__) {
        alert(JSON.stringify(notifyObj.data));
      }
      remoteMessageListener(notifyObj);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.loading && !this.state.loading) {
      if (this.screenOpenNotification && !this.openedScreenNotification) {
        navigate(this.screenOpenNotification, this.paramsOpenNotification);
        this.openedScreenNotification = true;
      }
    }
  }

  componentWillUnmount() {
    this.removeNotificationOpenedListener &&
      this.removeNotificationOpenedListener();
    this.removeMessageListener && this.removeMessageListener();
    this.removeNotificationListener && this.removeNotificationListener();
  }

  /**
   * Xu ly khi 1 buoc trong wizard ket thuc
   * @param name
   * @param result la ket qua cua buoc truoc co the chuyen cho buoc sau. VD: PhoneNumberRegister tra ve result = {phoneNumber: '0988888888'}
   * @param gotoMainScreen
   * @param goBack
   */
  handleFinishedWork = (
    name = '',
    result = {},
    gotoMainScreen = false,
    goBack = false,
  ) => {
    const {isFirstLoading, loading} = this.state;

    console.log(
      'handleFinishedWork',
      name,
      gotoMainScreen,
      goBack,
      loading,
      isFirstLoading,
    );

    if (goBack) {
      navigate(prevStepName(name));
      return;
    }

    // Neu khong phai la lan dau vao app hoac khong the hoan thanh 1 buoc trong wizard hoac la buoc cua wizard thi chuyen luon vao giao dien chinh.
    if (!isFirstLoading || isLastStepOfWizard(name)) {
      this.setState({loading: false});
      return;
    }

    // Trường hợp lấy TokenFirebase === null thì check wizard còn 3 màn hình.
    if (gotoMainScreen) {
      wizard = [
        SCREEN.LOADING,
        SCREEN.INTRODUCTION_WIZARD,
        SCREEN.START_USE_WIZARD,
      ];
      name =
        name !== SCREEN.LOADING ? SCREEN.INTRODUCTION_WIZARD : SCREEN.LOADING;
    }

    navigate(nextStepName(name), result);
  };

  onChangeStackHome() {
    this.setState({isHome: true});
  }

  onResourceLanguageChange(resource) {
    this.setState({translationMessagesState: resource});
  }

  onNotificationOpened = remoteMessage => {
    const {loading, isHome} = this.state;
    console.log('onNotificationOpened');
    debugger;
    if (!remoteMessage) {
      return;
    }
    const obj = remoteMessage.notification;
    if (obj.data.unRead !== 1) {
      readNotification(obj.data.notifyId);
    }
    if (
      (obj && obj.data._group === 'INFO') ||
      (obj && obj.data._group === NOTIFICATION_TYPE.SEND_SHORT_NEWS)
    ) {
      if (loading) {
        this.screenOpenNotification = SCREEN.NOTIFY_DETAIL;
        this.paramsOpenNotification = {
          item: {
            title: obj.title,
            bigText: obj.body,
            timestamp: obj.data.timestamp,
            text: obj.data.text,
            largeIcon: obj.data.largeIcon,
          },
        };
      } else {
        navigate(SCREEN.NOTIFY_DETAIL, {
          item: {
            title: obj.title,
            bigText: obj.body,
            timestamp: obj.data.timestamp,
            text: obj.data.text,
            largeIcon: obj.data.largeIcon,
          },
        });
      }
    } else if (obj && obj.data._group === 'MOBILE') {
      if (loading) {
        this.screenOpenNotification = SCREEN.PHONE_NUMBER_REGISTER;
      } else {
        navigate(SCREEN.PHONE_NUMBER_REGISTER);
      }
    } else if (obj && obj.data._group === 'ADD_INFO') {
      if (loading) {
        this.screenOpenNotification = SCREEN.REGISTER_INFORMATION;
      } else {
        navigate(SCREEN.REGISTER_INFORMATION);
      }
    } else if (
      obj &&
      (obj.data._group === NOTIFICATION_TYPE.SEND_URL_NEW ||
        obj.data._group === NOTIFICATION_TYPE.SEND_HTML_NEWS)
    ) {
      const params = {
        item: {
          title: obj.title,
          data: obj?.data?.data,
        },
      };
      if (obj.data._group === NOTIFICATION_TYPE.SEND_HTML_NEWS) {
        if (loading) {
          this.screenOpenNotification = SCREEN.DETAIL_NEW_WELCOME;
          this.paramsOpenNotification = params;
        } else if (isHome) {
          navigate(SCREEN.DETAIL_NEW, params);
        } else {
          navigate(SCREEN.DETAIL_NEW_WELCOME, params);
        }
      } else {
        if (loading) {
          this.screenOpenNotification = SCREEN.PAGE_WEBVIEW_WELCOME;
          this.paramsOpenNotification = params;
        } else if (isHome) {
          navigate(SCREEN.PAGE_WEBVIEW, params);
        } else {
          navigate(SCREEN.PAGE_WEBVIEW_WELCOME, params);
        }
      }
    } else if (
      obj &&
      (obj.data.Type === NOTIFICATION_TYPE.UPDATE_VERSION ||
        obj.data._group === NOTIFICATION_TYPE.UPDATE_VERSION)
    ) {
      this.setState({loading: false, isHome: true});
    }
    // getNotifications().cancelNotification(remoteMessage.notification._notificationId);
    removeDeliveredNotification(remoteMessage.notification._notificationId);
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification._notificationId,
    );
  };

  render() {
    const {translationMessagesState, loading, isHome} = this.state;
    return (
      <ContextProvider>
        <LanguageProvider messages={translationMessagesState}>
          <NavigationContainer ref={navigationRef}>
            {loading ? (
              <Stack.Navigator
                id="auth"
                headerMode="none"
                mode="card"
                initialRouteName={LOADING_INITIAL_ROUTE}>
                <Stack.Screen
                  name={LOADING_INITIAL_ROUTE}
                  component={this.LoadingProps}
                />
                <Stack.Screen
                  name={SCREEN.INTRODUCTION_WIZARD}
                  component={this.IntroducationProps}
                />
                <Stack.Screen
                  name={SCREEN.PHONE_NUMBER_REGISTER_WIZARD}
                  component={this.PhoneNumberRegisterProps}
                />
                <Stack.Screen
                  name={SCREEN.PHONE_NUMBER_VERITY_OTP_WIZARD}
                  component={this.PhoneNumberVerifyOTPProps}
                />
                <Stack.Screen
                  name={SCREEN.REGISTER_INFORMATION_WIZARD}
                  component={this.RegisterInformationProps}
                />
                <Stack.Screen
                  name={SCREEN.START_USE_WIZARD}
                  component={this.StartUseProps}
                />
              </Stack.Navigator>
            ) : !isHome ? (
              <Stack.Navigator
                id="Welcome"
                headerMode="none"
                mode="card"
                initialRouteName={WELCOME_INITIAL_ROUTE}>
                <Stack.Screen
                  name={WELCOME_INITIAL_ROUTE}
                  component={this.WelcomeProps}
                />
                <Stack.Screen
                  name={SCREEN.NOTIFY_DETAIL_WELCOME}
                  component={NotifyDetail}
                />
                <Stack.Screen
                  name={SCREEN.DETAIL_NEW_WELCOME}
                  component={DetailNew}
                />
                <Stack.Screen
                  name={SCREEN.PAGE_WEBVIEW_WELCOME}
                  component={PageView}
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
                <Stack.Screen name={SCREEN.ENTRY} component={Entry} />
                <Stack.Screen
                  name={SCREEN.ENTRY_VERIFY_OTP}
                  component={EntryVerifyOTP}
                />
              </Stack.Navigator>
            ) : (
              <Stack.Navigator
                id="home"
                headerMode="none"
                mode="card"
                initialRouteName={MAIN_INITIAL_ROUTE}>
                <Stack.Screen
                  name={MAIN_INITIAL_ROUTE}
                  component={this.HomeProps}
                />
                <Stack.Screen name={SCREEN.WATCH_SCAN} component={WatchScan} />
                <Stack.Screen
                  name={SCREEN.HISTORY_SCAN}
                  component={HistoryScan}
                />
                <Stack.Screen
                  name={SCREEN.NOTIFY_DETAIL}
                  component={NotifyDetail}
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
                <Stack.Screen name={SCREEN.PAGE_WEBVIEW} component={PageView} />
                <Stack.Screen name={SCREEN.DETAIL_NEW} component={DetailNew} />
                <Stack.Screen
                  name={SCREEN.HISTORY_UPLOAD_OTP}
                  component={HistoryUploadOTP}
                />
                <Stack.Screen name={SCREEN.VIEW_LOG} component={ViewLog} />
                <Stack.Screen
                  name={SCREEN.DOWNLOAD_LATEST_VERSION}
                  component={DownloadLatestVersion}
                />
                <Stack.Screen
                  name={SCREEN.CONTACT_HISTORY}
                  component={ContactHistory}
                />
                <Stack.Screen name={SCREEN.WELCOME} component={Welcome} />
                {/*<Stack.Screen*/}
                {/*  name={SCREEN.DAILY_DECLARATION}*/}
                {/*  component={DailyDeclaration}*/}
                {/*/>*/}
                {/*<Stack.Screen*/}
                {/*  name={SCREEN.DOMESTIC_DECLARATION}*/}
                {/*  component={DomesticDeclaration}*/}
                {/*/>*/}
                {/*<Stack.Screen*/}
                {/*  name={SCREEN.ENTRY_DECLARATION}*/}
                {/*  component={EntryDeclaration}*/}
                {/*/>*/}
                <Stack.Screen
                  name={SCREEN.ENTRY_DECLARATION_SUCCESS}
                  component={EntryDeclareSuccess}
                />
                <Stack.Screen name={SCREEN.ENTRY} component={Entry} />
                <Stack.Screen
                  name={SCREEN.ENTRY_VERIFY_OTP}
                  component={EntryVerifyOTP}
                />
                <Stack.Screen name={SCREEN.FAQ}>
                  {props => <FAQ {...props} showBack={true} />}
                </Stack.Screen>
              </Stack.Navigator>
            )}
          </NavigationContainer>
        </LanguageProvider>
      </ContextProvider>
    );
  }
}

export default App;
