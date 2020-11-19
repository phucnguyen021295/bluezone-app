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
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import {WebView} from 'react-native-webview';
import Error from './Error';
import Header from '../../../base/components/Header';
import {reportScreenAnalytics} from '../../../core/analytics';
import SCREEN from '../../nameScreen';

class PageViewScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.reload = this.reload.bind(this);
  }

  componentDidMount() {
    reportScreenAnalytics(SCREEN.PAGE_WEBVIEW);
  }

  setRef = ref => {
    this._bridge = ref;
  };

  reload() {
    if (this._bridge) {
      this._bridge.reload();
    }
  }

  ActivityIndicatorLoadingView() {
    return (
      <ActivityIndicator
        color={'#3f51b5'}
        size={'large'}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    );
  }

  renderError = () => <Error onPress={this.reload} />;

  render() {
    const {route} = this.props;
    const item = route.params?.item;
    const data = item?.data;

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
        <StatusBar hidden={true} />
        <Header
          colorIcon={'#000000'}
          styleTitle={{paddingHorizontal: 50, color: '#000000'}}
          title={item.title}
        />
        <WebView
          ref={this.setRef}
          source={{
            uri: data?.Link,
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={false}
          thirdPartyCookiesEnabled={true}
          javaScriptEnabledAndroid={true}
          renderLoading={this.ActivityIndicatorLoadingView}
          onLoad={this.ActivityIndicatorLoadingView}
          geolocationEnabled={true}
          renderError={this.renderError}
        />
      </SafeAreaView>
    );
  }
}

PageViewScreen.propTypes = {
  navigation: PropTypes.object,
  token: PropTypes.string,
  domain: PropTypes.string,
};
export default PageViewScreen;
