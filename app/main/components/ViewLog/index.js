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

// Components
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Clipboard,
} from 'react-native';
import {injectIntl, intlShape} from 'react-intl';

// Components
import Text from '../../../base/components/Text';
import Header from '../../../base/components/Header';

// Log
import log from '../../../core/log';
import {reportScreenAnalytics} from '../../../core/analytics';
import SCREEN from '../../nameScreen';

// Styles
import styles from './styles/index.css';

class ViewLogScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLog: [],
      dataString: '',
    };
    this.lastTimestamp = 0;
    this.processGetDB = false;
    this.timeRequestLast = 0;
  }

  componentDidMount() {
    this.onGet();

    reportScreenAnalytics(SCREEN.VIEW_LOG);
  }

  onGet = timestampGet => {
    const {dataLog} = this.state;
    log.get(
      timestampGet,
      dataGet => {
        const n = dataLog.concat(dataGet);
        const s = n.map(({timestamp, key, data}) => {
          return `${this.formatDate(timestamp)}: ${key}${
            data ? `\n${data}` : ''
          }\n------------------------------------------------------------------`;
        });
        this.setState({
          dataString: s.join('\n'),
          dataLog: n,
        });
        this.processGetDB = false;
      },
      () => {
        this.processGetDB = false;
      },
    );
  };

  handleOnScroll = event => {
    const {dataLog} = this.state;
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const currentOffset = contentOffset.y;
    const isScrollDown = currentOffset > this.offset;
    this.offset = currentOffset;
    const timeNow = new Date().getTime();
    if (
      this.processGetDB ||
      !isScrollDown ||
      timeNow < this.timeRequestLast + 200
    ) {
      return;
    }
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 50) {
      this.lastTimestamp = dataLog[dataLog.length - 1].timestamp;
      this.processGetDB = true;
      this.timeRequestLast = timeNow;
      this.onGet(this.lastTimestamp);
    }
  };

  formatDate = m => {
    if (!m) {
      return 'Not time';
    }
    const n = new Date(m);
    return (
      n.getUTCFullYear() +
      '/' +
      (n.getUTCMonth() + 1) +
      '/' +
      n.getUTCDate() +
      ' ' +
      n.getHours() +
      ':' +
      n.getMinutes() +
      ':' +
      n.getSeconds()
    );
  };

  copyLog = () => {
    Clipboard.setString(JSON.stringify(this.state.data));
  };

  render() {
    const {dataString} = this.state;

    return (
      <SafeAreaView style={{flex: 1}}>
        <Header
          styleTitle={styles.titleHeader}
          styleHeader={styles.header}
          title={'View Log'}
        />
        <ScrollView onScroll={this.handleOnScroll}>
          <TouchableOpacity onPress={this.copyLog}>
            <Text>COPY</Text>
          </TouchableOpacity>
          <Text style={{color: '#000000'}}>{dataString}</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

ViewLogScreen.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(ViewLogScreen);
