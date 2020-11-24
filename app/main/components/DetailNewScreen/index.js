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

import React, {PureComponent} from 'react';
import {
  ScrollView,
  SafeAreaView,
  Dimensions,
  Linking,
  View,
  Animated,
  Platform,
} from 'react-native';
import {injectIntl, intlShape} from 'react-intl';
import HTML from 'react-native-render-html';
import 'moment/locale/vi'; // without this line it didn't work

// Api
import {getNews} from '../../../core/apis/bluezone';

// Components
import Header from '../../../base/components/Header';
import Text from '../../../base/components/Text';

// Styles
import styles, {CUSTOM_STYLES, HEADER_HEIGHT} from './styles/index.css';
import configuration from '../../../configuration';
import {reportScreenAnalytics} from '../../../core/analytics';
import SCREEN from '../../nameScreen';
import moment from 'moment';

const HEADER_MAX_HEIGHT = HEADER_HEIGHT;
const ScrollViewAnimated = Animated.createAnimatedComponent(ScrollView);

class DetailNewScreen extends PureComponent {
  constructor(props) {
    super(props);
    const headerAnimated = new Animated.Value(0);
    this.state = {
      news: {},
      headerAnimated: headerAnimated,
    };

    this.clampedScroll = Animated.diffClamp(
      headerAnimated.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: 'clamp',
      }),
      0,
      HEADER_MAX_HEIGHT,
    );
    this.formatDate = this.formatDate.bind(this);
    this.formatHours = this.formatHours.bind(this);
  }

  componentDidMount() {
    const {route} = this.props;
    const item = route.params?.item;
    const data = item?.data;
    this.BzNewId = data?.BzNewId;
    getNews(
      this.BzNewId,
      data => {
        this.setState({
          news: data?.BzEntry?.[this.BzNewId],
        });
      },
      this.getNewFail,
    );

    reportScreenAnalytics(SCREEN.DETAIL_NEW);
  }

  getNewFail(repponse) {}

  onLinkPress = (e, url) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url);
      }
    });
  };

  formatDate(time) {
    const {Language} = configuration;
    if (Language === 'en') {
      return moment(time).format('MM/DD/YYYY');
    }
    return moment(time).format('DD/MM/YYYY');
  }

  formatHours(time) {
    return moment(time).format('HH:mm');
  }

  render() {
    const {news, headerAnimated} = this.state;
    const {Language} = configuration;
    const data = news?.data;

    const animationHeader = this.clampedScroll.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT],
      outputRange: [0, -HEADER_MAX_HEIGHT],
      extrapolate: 'clamp',
    });

    return (
      <SafeAreaView style={styles.container}>
        <Animated.View
          style={[
            {
              height: HEADER_MAX_HEIGHT,
              backgroundColor: '#ffffff',
              zIndex: 99,
            },
            Platform.OS === 'android'
              ? {
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  transform: [{translateY: animationHeader}],
                }
              : {
                  borderBottomColor: '#efefef',
                  borderBottomWidth: 1,
                },
          ]}>
          <Header title={Language === 'vi' ? 'Tin tức' : 'New'} />
        </Animated.View>
        <ScrollViewAnimated
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: headerAnimated}}}],
            {
              useNativeDriver: true,
            },
          )}
          contentContainerStyle={styles.contentContainerStyle}>
          <Text text={data?.title} style={styles.titleStyle} />
          <View style={styles.info}>
            <Text text={data?.creator} style={styles.creator} />
            <Text text={' | '} style={styles.creator} />
            <Text
              text={this.formatDate(data?.createDate)}
              style={styles.creator}
            />
            <Text text={' | '} style={styles.creator} />
            <Text
              text={this.formatHours(data?.createDate)}
              style={styles.creator}
            />
          </View>
          <HTML
            onLinkPress={this.onLinkPress}
            html={data?.content}
            tagsStyles={CUSTOM_STYLES}
            imagesMaxWidth={Dimensions.get('window').width - 40}
            allowFontScaling={false}
          />
        </ScrollViewAnimated>
      </SafeAreaView>
    );
  }
}

DetailNewScreen.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(DetailNewScreen);
