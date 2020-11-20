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
import PropTypes from 'prop-types';
import {View} from 'react-native';

// Components
import ButtonBase from '../../../../../base/components/ButtonBase';
import {MediumText} from '../../../../../base/components/Text';
import ModalBase from '../../../../../base/components/ModalBase';

import {injectIntl, intlShape} from 'react-intl';

import styles from './styles/index.css';

function ModalNotify(props) {
  const {isVisible, content, onPress, btnText} = props;
  return (
    <ModalBase
      isVisibleModal={isVisible}
      description={content}
      styleDescription={styles.textContent}>
      <View style={styles.container}>
        <ButtonBase
          title={btnText}
          onPress={onPress}
          buttonStyle={styles.buttonConfirm}
          titleStyle={styles.textButtonConfirm}
          titleComponent={<MediumText text={btnText} style={styles.textBtn} />}
        />
      </View>
    </ModalBase>
  );
}

ModalNotify.propTypes = {
  btnText: PropTypes.string,
  intl: intlShape.isRequired,
};

ModalNotify.defaultProps = {
  btnText: 'OK',
  onPress: () => {},
};

export default injectIntl(ModalNotify);
