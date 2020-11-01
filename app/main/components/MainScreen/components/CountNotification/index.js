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

import * as React from 'react';
import * as PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import {withNavigation} from '@react-navigation/compat';

// Component
import Badge from '../Badge';

import {
  registerNotificationDisplay,
  registerNotificationOpened,
  setBadge,
} from '../../../../../core/fcm';
import {
  getTimespanNotification,
  setTimespanNotification,
} from '../../../../../core/storage';
import {getNewsNotification} from '../../../../../core/db/SqliteDb';

// Styles
import styles from './styles/index.css';

const handleFocusChangeList = [];

const registerFocusTabBar = handleChange => {
  for (let i = 0; i < handleFocusChangeList.length; i++) {
    if (handleFocusChangeList[i] === handleChange) {
      return;
    }
  }
  handleFocusChangeList.push(handleChange);
};

export const broadcastFocusChange = () => {
  for (let i = 0; i < handleFocusChangeList.length; i++) {
    handleFocusChangeList[i]();
  }
};

class CountNotification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };

    this.getCount = this.getCount.bind(this);
    this.onNotificationOpened = this.onNotificationOpened.bind(this);
    this.getNotificationsSuccess = this.getNotificationsSuccess.bind(this);
  }

  componentDidMount() {
    // Lấy số count thông báo
    this.getCount();

    // Đăng kí event nhận notify
    this.removeNotificationDisplayedListener = registerNotificationDisplay(
      this.getCount,
    );

    // Đăng kí event click vào tab notify
    // this.props.navigation.addListener('focus', () => {
    //   this.resetCount();
    // });

    this.removeNotificationOpenedListener = registerNotificationOpened(
      this.onNotificationOpened,
    );

    registerFocusTabBar(this.resetCount);
  }

  componentWillUnmount() {
    this.removeNotificationDisplayedListener();
    this.removeNotificationOpenedListener();
  }

  onNotificationOpened(remoteMessage) {
    if (!remoteMessage) {
      return;
    }
    const obj = remoteMessage.notification;
    const notifyId = obj.data.notifyId;
    if (!notifyId) {
      return;
    }
    this.notifications = this.notifications.filter(
      item => item.notifyId !== notifyId,
    );
    this.showCount(this.notifications.length);
  }

  async getCount() {
    const timespanNotification = await getTimespanNotification();
    getNewsNotification(
      timespanNotification || 0,
      this.getNotificationsSuccess,
    );
  }

  // addCount = count => {
  //   this.setState(prevState => {
  //     setBadge(prevState.count + count);
  //     return {
  //       count: prevState.count + count,
  //     };
  //   });
  // };

  getNotificationsSuccess(list) {
    this.notifications = list;
    this.showCount(list.length);
  }

  showCount = count => {
    setBadge(count);
    this.setState({
      count,
    });
  };

  resetCount = () => {
    if (this.state.count > 0) {
      setTimespanNotification(new Date());
      this.showCount(0);
    }
  };

  render() {
    const {count} = this.state;
    const {icon, iconActive, focused} = this.props;

    const Svg = focused ? iconActive : icon;
    return (
      <Badge count={count}>
        <Svg />
      </Badge>
    );
  }
}

CountNotification.propTypes = {
  icon: PropTypes.number,
  iconActive: PropTypes.number,
  focused: PropTypes.bool,
  count: PropTypes.number,
};

export default withNavigation(CountNotification);
