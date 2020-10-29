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

// Components
import LoadingScreen from './app/main/components/LoadingScreen';
import Home from './app/main/components/MainScreen';
import Welcome from './app/main/components/WelcomeScreen';
import WatchScan from './app/main/components/WatchScanScreen';
import HistoryScan from './app/main/components/HistoryScanScreen';
import NotifyDetail from './app/main/components/NotifyDetail';
import PhoneNumberRegister from './app/main/components/PhoneNumberRegisterScreen';
import PhoneNumberVerifyOTP from './app/main/components/PhoneNumberVerifyOTPScreen';
import HistoryUploadedByOTPScreen from './app/main/components/HistoryUploadedByOTPScreen';
import PageView from './app/main/components/PageViewScreen';
import DetailNew from './app/main/components/DetailNewScreen';
import ViewLog from './app/main/components/ViewLog';
import DownloadLatestVersionScreen from './app/main/components/DownloadLatestVersionScreen';
import Introduction from './app/main/components/IntroductionScreen';
import StartUse from './app/main/components/StartScreen';
import RegisterInformation from './app/main/components/RegisterInformationScreen';
import ContactHistory from './app/main/components/ContactHistoryScreen';
// import ScanScreen from './app/main/components/ScanScreen';
import FAQScreen from './app/main/components/FAQScreen';
import DailyDeclaration from './app/main/components/DailyDeclarationScreen';
import DomesticDeclaration from './app/main/components/DomesticDeclarationScreen';
import EntryDeclaration from './app/main/components/EntryDeclarationScreen';

import ContextProvider from './LanguageContext';
import LanguageProvider from './app/base/LanguageProvider';
import {translationMessages} from './app/i18n';
import {remoteMessageListener} from './app/core/push';
import decorateMainAppStart from './app/main/decorateMainAppStart';
import {navigationRef, navigate} from './RootNavigation';
import {registerMessageHandler} from './app/core/fcm';

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
  SCREEN.INTRODUTION_WIZARD,
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
        name={SCREEN.INTRODUTION_WIZARD}
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

    this.removeMessageListener = registerMessageHandler(async notifyObj => {
      // TODO can sua ve dung dev trong server.js het => Khong duoc, __DEV__ nay chi dung cho debugger thoi
      if (__DEV__) {
        alert(JSON.stringify(notifyObj));
      }
      await remoteMessageListener(notifyObj);
    });
  }

  componentWillUnmount() {
    this.removeNotificationOpenedListener &&
      this.removeNotificationOpenedListener();
    this.removeMessageListener && this.removeMessageListener();
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
        SCREEN.INTRODUTION_WIZARD,
        SCREEN.START_USE_WIZARD,
      ];
      name =
        name !== SCREEN.LOADING ? SCREEN.INTRODUTION_WIZARD : SCREEN.LOADING;
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
      navigate('SCREEN.NOTIFY_DETAIL', {
        item: {
          title: obj.title,
          bigText: obj.body,
          timestamp: obj.data.timestamp,
          text: obj.data.text,
          largeIcon: obj.data.largeIcon,
        },
      });
    } else if (obj && obj.data._group === 'MOBILE') {
      if (loading) {
        navigate(SCREEN.PHONE_NUMBER_REGISTER_WIZARD);
      } else {
        navigate(SCREEN.PHONE_NUMBER_REGISTER);
      }
    } else if (obj && obj.data._group === 'ADD_INFO') {
      if (loading) {
        navigate(SCREEN.REGISTER_INFORMATION_WIZARD);
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
          navigate(SCREEN.DETAIL_NEW_LOADING, params);
        } else if (isHome) {
          navigate('DetailNew', params);
        } else {
          navigate(SCREEN.DETAIL_NEW_WELCOME, params);
        }
      } else {
        if (loading) {
          navigate(SCREEN.PAGE_WEBVIEW_LOADING, params);
        } else if (isHome) {
          navigate('PageView', params);
        } else {
          navigate(SCREEN.PAGE_WEBVIEW_WELCOME, params);
        }
      }
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
                  name={SCREEN.INTRODUTION_WIZARD}
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
                  path="NotifyDetail"
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
                  path="NotifyDetail"
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
                <Stack.Screen name="PageView" component={PageView} />
                <Stack.Screen name="DetailNew" component={DetailNew} />
                <Stack.Screen
                  name="HistoryUploadedByOTP"
                  component={HistoryUploadedByOTPScreen}
                />
                <Stack.Screen name="ViewLog" component={ViewLog} />
                <Stack.Screen
                  name="DownloadLatestVersionScreen"
                  component={DownloadLatestVersionScreen}
                />
                <Stack.Screen
                  name="ContactHistory"
                  component={ContactHistory}
                />
                {/*<Stack.Screen name="ScanScreen" component={ScanScreen} />*/}
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen
                  name="DailyDeclaration"
                  component={DailyDeclaration}
                />
                <Stack.Screen
                  name="DomesticDeclaration"
                  component={DomesticDeclaration}
                />
                <Stack.Screen
                  name="EntryDeclaration"
                  component={EntryDeclaration}
                />
                <Stack.Screen name="FAQScreen">
                  {props => <FAQScreen {...props} showBack={true} />}
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
