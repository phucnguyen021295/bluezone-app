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

import * as fontSize from '../../../../core/fontSize';

const CUSTOM_STYLES = {
  p: {
    color: '#000',
    fontSize: fontSize.normal,
    lineHeight: 30,
    fontFamily: 'Roboto-Regular',
    marginBottom: 7,
    marginHorizontal: 20,
    textAlign: 'justify',
    // textAlignVertical: 'bottom',
  },
  br: {
    display: 'none',
  },
  strong: {
    // lineHeight: 32,
    fontFamily: 'Roboto-Medium',
  },
  h1: {
    marginVertical: 10,
    color: '#000',
    marginHorizontal: 20,
    textAlign: 'justify',
  },
  h2: {
    marginVertical: 7,
    color: '#000',
    marginHorizontal: 20,
    textAlign: 'justify',
  },

  h3: {
    marginBottom: 7,
    lineHeight: 30,
    marginHorizontal: 20,
    textAlign: 'justify',
  },
  h4: {
    marginVertical: 7,
    marginHorizontal: 20,
    textAlign: 'justify',
  },
  ul: {
    paddingLeft: 5,
  },
  li: {
    lineHeight: 24,
    color: '#000',
    fontSize: fontSize.normal,
  },
  a: {
    fontSize: fontSize.normal,
  },

  figure: {
    marginHorizontal: 20,
  },

  img: {
    borderRadius: 6,
    marginBottom: 8,
  }
};
export {CUSTOM_STYLES};
