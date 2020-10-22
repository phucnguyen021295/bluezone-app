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

'use strict';

import React, {Component} from 'react';

import {StyleSheet, Text, TouchableOpacity, Linking} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {reportScreenAnalytics} from '../../../core/analytics';

class ScanScreen extends Component {
  componentDidMount() {
    reportScreenAnalytics('ScanScreen');
  }

  onSuccess(e) {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err),
    );
  }

  render() {
    return (
      <QRCodeScanner
        reactivate={true}
        showMarker={true}
        ref={node => {
          this.scanner = node;
        }}
        onRead={this.onSuccess.bind(this)}
        // topContent={
        //   <Text style={styles.centerText}>
        //     Go to{' '}
        //     <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
        //     your computer and scan the QR code.
        //   </Text>
        // }
        // bottomContent={
        //   <TouchableOpacity style={styles.buttonTouchable}>
        //     <Text style={styles.buttonText}>OK. Got it!</Text>
        //   </TouchableOpacity>
        // }
        containerStyle={styles.containerStyle}
        markerStyle={{borderColor: 'red'}}
        cameraStyle={styles.containerStyle}
        topViewStyle={styles.containerStyle}
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  containerStyle: {
    margin: 0,
    padding: 0,
    backgroundColor: 'rgba(255,255,255,0)',
  },
});

export default ScanScreen;
