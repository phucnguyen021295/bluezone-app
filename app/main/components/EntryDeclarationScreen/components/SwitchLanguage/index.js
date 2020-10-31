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
import {ScrollView, TouchableOpacity, View, Image} from 'react-native';
import * as PropTypes from 'prop-types';

// Components
import {EntryLanguageContext} from '../LanguageContext';
import {setEntryLanguage} from '../../../../../configuration';

// Styles
import styles from './styles/index.css';

const languages = [
  {
    id: 'vi',
    image: require('./images/vietnamese.jpg'),
  },
  {
    id: 'en',
    image: require('./images/english.jpg'),
  },
  // {
  //   id: 'en',
  //   image: require('./images/english.jpg'),
  // },
  // {
  //   id: 'en',
  //   image: require('./images/english.jpg'),
  // },
  // {
  //   id: 'en',
  //   image: require('./images/english.jpg'),
  // },
  // {
  //   id: 'en',
  //   image: require('./images/english.jpg'),
  // },
  // {
  //   id: 'en',
  //   image: require('./images/english.jpg'),
  // },
  // {
  //   id: 'en',
  //   image: require('./images/english.jpg'),
  // },
  // {
  //   id: 'vi',
  //   image: '',
  // },
  // {
  //   id: 'vi',
  //   image: '',
  // },
  // {
  //   id: 'vi',
  //   image: '',
  // },
  // {
  //   id: 'vi',
  //   image: '',
  // },
  // {
  //   id: 'vi',
  //   image: '',
  // },
  // {
  //   id: 'vi',
  //   image: '',
  // },
  // {
  //   id: 'vi',
  //   image: '',
  // },
  // {
  //   id: 'vi',
  //   image: '',
  // },
  // {
  //   id: 'vi',
  //   image: '',
  // },
  // {
  //   id: 'vi',
  //   image: '',
  // },
];

class SwitchLanguage extends React.Component {
  constructor(props) {
    super(props);
  }

  changeLanguage = (context, language) => {
    if (context.language === language) {
      return;
    }

    setEntryLanguage(language);
    context.updateLanguage(language);
  };

  render() {
    return (
      <EntryLanguageContext.Consumer>
        {context => {
          return (
            <View>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingTop: 16, paddingHorizontal: 5}}
                horizontal={true}>
                {languages.map(item => {
                  return (
                    <TouchableOpacity
                      key={item.id}
                      activeOpacity={1}
                      style={[
                        {
                          width: 70,
                          height: 70,
                          borderRadius: 36,
                          backgroundColor: '#FFF',
                          marginHorizontal: 2,
                          justifyContent: 'center',
                          alignItems: 'center',
                        },
                        context.language === item.id
                          ? {
                              borderWidth: 2,
                              borderColor: '#015cd0',
                            }
                          : {},
                      ]}
                      onPress={() => this.changeLanguage(context, item.id)}>
                      <Image
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 24,
                        }}
                        source={item.image}
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          );
        }}
      </EntryLanguageContext.Consumer>
    );
  }
}

export default SwitchLanguage;
