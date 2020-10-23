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
import moment from 'moment';

// Api
import {dev} from '../../../core/apis/server';

// Components
import {
  StatusBar,
  View,
  Dimensions,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  AppState,
} from 'react-native';
import HeaderFull from './Header/HeaderFull';
import ImageBackgroundBase from './ImageBackgroundBase';
import ButtonBase from '../../../base/components/ButtonBase';
import ButtonIconText from '../../../base/components/ButtonIconText';
import Text, {LightText} from '../../../base/components/Text';

// Styles
import styles, {HEIGHT_HEADER, HEIGHT_DEFAULT} from './styles/index.css';
import {injectIntl, intlShape} from 'react-intl';
import {Images, dataVi, dataEn, dayVi, dayEn, monthEn} from './styles/images';
import * as fontSize from '../../../core/fontSize';

// Utils
import configuration from '../../../configuration';
import getLunarDate from './utils/amlich-hnd';
import {can, canEn, chi, chiEn} from './utils/ConvertToCanchi';
import message from '../../../core/msg/welcome';
import {
  setDateOfWelcome,
  getDisplayOriginalImg,
  setDisplayOriginalImg,
} from '../../../core/storage';
import messageWarning from '../../../core/msg/warning';

import {reportScreenAnalytics} from '../../../core/analytics';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);
    const {width} = Dimensions.get('window');
    this.state = {
      width: width,
      date: new Date(),
      isVisible: false,
      setHeight: 0,
      heightImg: 0,
      images: {},
      info: {},
      display: 'fit',
      textF: this.getTextByLevel(),
    };
    this.onDimensionsChange = this.onDimensionsChange.bind(this);
    this.changeDisplay = this.changeDisplay.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.randomDisplay = this.randomDisplay.bind(this);
  }

  componentDidMount() {
    this.changeDisplay();
    this.randomDisplay();
    Dimensions.addEventListener('change', this.onDimensionsChange);
    AppState.addEventListener('change', this.handleAppStateChange);

    reportScreenAnalytics('Welcome');
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onDimensionsChange);
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  onDimensionsChange(e) {
    this.setState({
      width: e.window.width,
    });
  }

  handleAppStateChange(appState) {
    if (appState === 'active') {
      this.randomDisplay();
    }
  }

  randomDisplay() {
    const {Language} = configuration;
    const data = Language === 'vi' ? dataVi : dataEn;
    const imgNumber = this.getRandomInt(Images.length);
    const maximNumber = this.getRandomInt(data.length);
    this.setState({
      images: Images[imgNumber],
      info: data[maximNumber],
    });
  }

  async changeDisplay() {
    const displayImg = await getDisplayOriginalImg();
    if (displayImg) {
      this.setState({display: displayImg});
    }
  }

  getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  getDate = () => {
    const {Language} = configuration;
    const {date} = this.state;
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (Language === 'vi') {
      return `${day}/${month}/${year}`;
    }
    return `${monthEn[month - 1]} ${day}, ${year}`;
  };

  getLunar = () => {
    const {Language} = configuration;
    const {date} = this.state;
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const lunarDate = getLunarDate(day, month, year);
    if (Language === 'vi') {
      return `${lunarDate.day} tháng ${lunarDate.month} ${
        can[(year + 6) % 10]
      } ${chi[(year + 8) % 12]}`;
    }
    return `${monthEn[lunarDate.month - 1]} ${lunarDate.day}, ${
      canEn[(year + 6) % 10]
    } ${chiEn[(year + 8) % 12]} Year`;
  };

  onSelect = () => {
    this.setState({isVisible: true});
  };

  onClose = () => {
    this.setState({isVisible: false});
  };

  onLayout = e => {
    LayoutAnimation.configureNext({
      duration: 200,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.linear,
      },
    });
    if (e.nativeEvent.layout.height > HEIGHT_DEFAULT) {
      this.setState({setHeight: e.nativeEvent.layout.height - HEIGHT_DEFAULT});
    } else {
      this.setState({setHeight: 0});
    }
  };

  onGoBack = () => {
    const {onFinished} = this.props;

    if (onFinished) {
      onFinished();
      return;
    }

    this.props.navigation.goBack();
    return true;
  };

  onLoad = e => {
    LayoutAnimation.configureNext({
      duration: 300,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.linear,
      },
    });
    const {width} = this.state;
    this.setState({
      heightImg: width / (e.nativeEvent.width / e.nativeEvent.height),
    });
  };

  onChange = () => {
    const {width, images, setHeight} = this.state;
    const heightNatural = (width * images.height) / images.width;
    const bars = (HEIGHT_HEADER - setHeight - heightNatural) / HEIGHT_HEADER;
    if (bars > 0.15) {
      this.setState(prev => {
        const scale = prev.display === 'fit' ? 'full' : 'fit';
        setDisplayOriginalImg(scale);
        return {display: scale};
      });
    }
  };

  onChangeImg = () => {
    const {Language} = configuration;
    const {images, info} = this.state;
    const dayOfWeek = this.getDate();
    const data = Language === 'vi' ? dataVi : dataEn;
    const imgNumber =
      Images.length - 1 === Images.indexOf(images)
        ? 0
        : Images.indexOf(images) + 1;
    const maximNumber =
      data.length - 1 === data.indexOf(info) ? 0 : data.indexOf(info) + 1;
    setDateOfWelcome({
      date: dayOfWeek,
      image: imgNumber,
      maxim: maximNumber,
    });
    this.setState({
      images: Images[imgNumber],
      info: data[maximNumber],
    });
  };

  getTextByLevel = () => {
    const {intl} = this.props;
    const {formatMessage} = intl;
    return formatMessage(messageWarning.lableF);
  };

  render() {
    const {
      width,
      isVisible,
      images,
      info,
      setHeight,
      heightImg,
      display,
      textF,
    } = this.state;
    const {intl} = this.props;
    const {formatMessage} = intl;
    const {Language} = configuration;
    const dow = Language === 'vi' ? dayVi : dayEn;
    const dayOfWeek = dow[moment().weekday()];
    const heightNatural = (width * images.height) / images.width;
    const bars = (HEIGHT_HEADER - setHeight - heightNatural) / HEIGHT_HEADER;
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={{zIndex: 200}}>
          <ImageBackgroundBase
            uri={images.uri}
            style={{
              width: width,
              height: HEIGHT_HEADER - setHeight,
              position: 'absolute',
              top: 0,
            }}
          />
          {/*<TouchableOpacity activeOpacity={1} onPress={this.onChange}>*/}
          {/*  {display === 'fit' && bars > 0.15 ? (*/}
          {/*    <Header*/}
          {/*      styleImg={{*/}
          {/*        width: width,*/}
          {/*        height: HEIGHT_HEADER - setHeight,*/}
          {/*        zIndex: 100,*/}
          {/*      }}*/}
          {/*      uri={images.uri}*/}
          {/*      onLoad={this.onLoad}*/}
          {/*    />*/}
          {/*  ) : (*/}
          {/*    <HeaderFull*/}
          {/*      styleImg={{*/}
          {/*        width: width,*/}
          {/*        height: HEIGHT_HEADER - setHeight,*/}
          {/*        zIndex: 100,*/}
          {/*        backgroundColor: 'rgba(0,0,0,0.34)',*/}
          {/*      }}*/}
          {/*      uri={images.uri}*/}
          {/*      onLoad={this.onLoad}*/}
          {/*    />*/}
          {/*  )}*/}
          {/*</TouchableOpacity>*/}
          <HeaderFull
            styleImg={{
              width: width,
              height: HEIGHT_HEADER - setHeight,
              zIndex: 100,
              backgroundColor: 'rgba(0,0,0,0.34)',
            }}
            uri={images.uri}
            onLoad={this.onLoad}
          />
          <LightText
            style={[
              styles.titleImg,
              {
                bottom: 12,
              },
            ]}>
            {Language === 'vi' ? images.address : images.addressEn}
          </LightText>
        </View>
        <TouchableOpacity
          style={styles.maxim}
          activeOpacity={1}
          onPress={this.onChangeImg}
          disabled={!dev}>
          <LightText style={styles.title} onLayout={this.onLayout}>
            {info.content}
          </LightText>
          <LightText style={styles.note}>{info.user}</LightText>
        </TouchableOpacity>
        <View style={styles.body}>
          <View style={styles.announce}>
            <View style={styles.calendar}>
              {Language === 'vi' ? (
                <>
                  <Text style={styles.titleCalendar}>
                    {`${dayOfWeek} - ${this.getDate()}`}
                  </Text>
                  <Text style={styles.titleLunar}>{this.getLunar()}</Text>
                  <ButtonIconText
                    text={formatMessage(message.perpetualCalendar)}
                    onPress={this.onSelect}
                    styleText={styles.textInvite}
                    styleBtn={styles.btncalendar}
                  />
                </>
              ) : (
                <>
                  <Text style={styles.titleCalendar}>{dayOfWeek}</Text>
                  <Text style={styles.titleLunar}>{this.getDate()}</Text>
                </>
              )}
            </View>
          </View>
          <View style={styles.viewText}>
            <Text style={styles.titleAlert}>{textF}</Text>
          </View>
          <View style={styles.closeButtonContainer}>
            <ButtonBase
              title={formatMessage(message.close)}
              onPress={this.onGoBack}
              buttonStyle={styles.closeButton}
              titleStyle={{fontSize: fontSize.smaller, color: '#ffffff'}}
            />
          </View>
        </View>
      </View>
    );
  }
}

WelcomeScreen.propTypes = {
  intl: intlShape.isRequired,
};

WelcomeScreen.contextTypes = {
  language: PropTypes.string,
};

export default injectIntl(WelcomeScreen);
