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

import ContextProvider, {
  EntryLanguageContext,
} from './components/LanguageContext';
import LanguageProvider from './components/LanguageProvider';
import EntryForm from './EntryForm';

import {translationMessages} from '../../../i18n';
import decorateEntry from './decorateEntry';

// const Entry = () => {
//   const {language} = useContext(EntryLanguageContext);
//   return <EntryDeclarationScreen language={language} {...this.props} />;
// };

const Entry = decorateEntry(EntryForm, EntryLanguageContext);

class Declaration extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ContextProvider>
        <LanguageProvider messages={translationMessages}>
          <Entry {...this.props} />
        </LanguageProvider>
      </ContextProvider>
    );
  }
}

export default Declaration;
