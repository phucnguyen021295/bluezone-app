/*
 * @Project Bluezone
 * @Author Bluezone Global (contact@bluezone.ai)
 * @Createdate 04/28/2020, 21:55
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
import {intlShape} from 'react-intl';
import {Image, ScrollView, View} from 'react-native';

// Components
import Text from '../../../../../base/components/Text';
import TextInfo from '../TextInfo';

// core
import messages from '../../../../../core/msg/entryForm';

// styles
import styles from './styles/index.css';

class Declaration extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {intl, data} = this.props;
    const {formatMessage} = intl;
    return (
      <ScrollView style={styles.scroll}>
        <Text style={styles.label1}>{formatMessage(messages.content1)}</Text>
        <Text style={styles.labelRed}>{formatMessage(messages.content2)}</Text>

        {/*Anh chan dung*/}
        <View style={styles.itemContainer}>
          <TextInfo
            styleContainer={styles.itemTitle}
            text={formatMessage(messages.portrait)}
            star
          />

          <View style={styles.portraitContainer}>
            <Image style={styles.portraitImage} source={portraitSource} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

Declaration.propTypes = {
  intl: intlShape.isRequired,
};

export default Declaration;
