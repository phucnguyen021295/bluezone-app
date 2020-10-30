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

import {StyleSheet} from 'react-native';
import * as fontSize from '../../../../../../core/fontSize';

const styles = StyleSheet.create({
  dot: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#015cd0',
    zIndex: 99,
  },

  borderItem: {
    marginRight: 16.5,
    borderLeftColor: '#707070',
    borderLeftWidth: 1,
    marginLeft: 5,
  },

  body: {
    borderWidth: 1,
    borderColor: '#b2b2b2',
    flex: 1,
    padding: 10,
    borderRadius: 9,
    marginBottom: 47,
    marginTop: 7,
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 13,
  },

  containerStyleNCNB: {
    height: 33,
    backgroundColor: '#f8b123',
    borderRadius: 9,
    justifyContent: 'center',
  },

  textInviteNCNB: {
    color: '#ffffff',
    fontSize: fontSize.small,
  },
});

export default styles;
