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
import {IntlProvider} from 'react-intl';

import Text from '../../../../../app/base/components/Text';
import {EntryLanguageContext} from './LanguageContext';

export class EntryLanguageProvider extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {language} = this.context;
    const _language = !language || language === 'vi' ? 'vi' : 'en';
    const {messages, children} = this.props;

    return (
      <IntlProvider
        locale={_language}
        key={_language}
        messages={messages[_language]}
        textComponent={Text}>
        {React.Children.only(children)}
      </IntlProvider>
    );
  }
}

EntryLanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired,
};

EntryLanguageProvider.contextType = EntryLanguageContext;

export default EntryLanguageProvider;
