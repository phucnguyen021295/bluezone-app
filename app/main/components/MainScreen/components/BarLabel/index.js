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
import {injectIntl, intlShape} from 'react-intl';
import * as PropTypes from 'prop-types';

// Components
import Text from '../../../../../base/components/Text';

// Core
import message from '../../../../../core/msg/tab';
import styles from './styles/index.css';

const label = {
  Home: message.home,
  Notify: message.report,
  Info: message.about,
  Faq: message.faq,
  Utilities: message.utilities,
};

function BarLabel(props) {
  const {intl, name, focused} = props;
  const {formatMessage} = intl;

  const styleColor = {color: focused ? '#015cd0' : '#747474'};
  return (
    <Text
      numberOfLines={1}
      text={formatMessage(label[name])}
      style={[styles.labelStyle, styleColor]}
    />
  );
}

BarLabel.propTypes = {
  intl: intlShape.isRequired,
  focused: PropTypes.bool,
  name: PropTypes.string,
};

export default injectIntl(BarLabel);
