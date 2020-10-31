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

// Icon
import Home from './styles/images/Home';
import Notify from './styles/images/Notify';
import Utilities from './styles/images/Utilities';
import Faq from './styles/images/Faq';
import Info from './styles/images/Info';

// Icon Active
import HomeActive from './styles/images/HomeActive';
import NotifyActive from './styles/images/NotifyActive';
import UtilitiesActive from './styles/images/UtilitiesActive';
import FaqActive from './styles/images/FaqActive';
import InfoActive from './styles/images/InfoActive';

const Icon = {
  Home: () => <Home width={21.2} height={18.9} />,
  Notify: () => <Notify width={16.7} height={20.4} />,
  Info: () => <Info width={20} height={20} />,
  Faq: () => <Faq width={27} height={20} />,
  Utilities: () => <Utilities width={18.9} height={18.9} />,
};

const IconActive = {
  Home: () => <HomeActive width={21.2} height={18.9} />,
  Notify: () => <NotifyActive width={16.7} height={20.4} />,
  Info: () => <InfoActive width={20} height={20} />,
  Faq: () => <FaqActive width={27} height={20} />,
  Utilities: () => <UtilitiesActive width={18.9} height={18.9} />,
};

function BarIcon(props) {
  const {name, focused} = props;

  if (name === 'Notify') {
    return (
      <CountNotifications
        focused={focused}
        icon={Icon.Notify}
        iconActive={IconActive.Notify}
      />
    );
  }

  const Svg = focused ? IconActive[name] : Icon[name];

  return <Svg />;
}

BarIcon.propTypes = {
  focused: PropTypes.bool,
  name: PropTypes.string,
};

export default BarIcon;
