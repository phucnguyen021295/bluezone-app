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
import FastImage from 'react-native-fast-image';

// Core
import styles from './styles/index.css';
import CountNotifications from '../CountNotification';

const icon = {
  Home: require('./styles/images/home.png'),
  Notify: require('./styles/images/notify.png'),
  Info: require('./styles/images/info.png'),
  Faq: require('./styles/images/faq.png'),
  Utilities: require('./styles/images/faq.png'),
};

const iconActive = {
  Home: require('./styles/images/home_active.png'),
  Notify: require('./styles/images/notify_active.png'),
  Info: require('./styles/images/info_active.png'),
  Faq: require('./styles/images/faq_active.png'),
  Utilities: require('./styles/images/faq_active.png'),
};

const styleBarIcon = {
  Home: styles.iconSquare,
  Info: styles.iconSquare,
  Faq: styles.iconFaq,
  Utilities: styles.iconFaq,
};

function BarIcon(props) {
  const {name, focused} = props;

  if (name === 'Notify') {
    return (
      <CountNotifications
        focused={focused}
        icon={icon.Notify}
        iconActive={iconActive.Notify}
      />
    );
  }

  return (
    <FastImage
      source={focused ? iconActive[name] : icon[name]}
      style={styleBarIcon[name]}
    />
  );
}

BarIcon.propTypes = {
  focused: PropTypes.bool,
  name: PropTypes.string,
};

export default BarIcon;
