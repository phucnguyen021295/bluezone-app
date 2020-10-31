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

import React from 'react';
import * as PropTypes from 'prop-types';
import configuration from './app/configuration';
import {getLanguage} from './app/core/storage';

export const LanguageContext = React.createContext();

class LanguageContextComponent extends React.Component {
  constructor(props) {
    super(props);
    // TODO can xem lai logic code cho nay
    let language = configuration.Language;
    this.state = {
      language: language,
    };
  }

  async componentDidMount() {
    const language = await getLanguage();
    if (language !== this.state.language) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({
        language: language || 'vi',
      });
    }
  }

  render() {
    if (!this.state.language) {
      return null;
    }
    return (
      <LanguageContext.Provider
        value={{
          ...this.state,
          updateLanguage: language => this.setState({language: language}),
        }}>
        {this.props.children}
      </LanguageContext.Provider>
    );
  }
}

LanguageContextComponent.childContextTypes = {
  language: PropTypes.string,
};

LanguageContextComponent.propTypes = {
  language: PropTypes.string,
};

export default LanguageContextComponent;
