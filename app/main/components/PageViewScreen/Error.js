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

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity} from 'react-native';

// Components
import Text, {MediumText} from '../../../base/components/Text';

class Error extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPress = () => {
    const {onPress} = this.props;
    onPress();
  };

  render() {
    return (
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <MediumText style={{color: '#000', marginBottom: 10}}>
          Đã có lỗi xảy ra. Vui lòng thử lại sau.!
        </MediumText>
        <TouchableOpacity onPress={this.onPress}>
          <Text style={{padding: 20, color: '#015cd0'}}>Tại lại</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Error.propTypes = {
  onPress: PropTypes.func,
};

export default Error;
