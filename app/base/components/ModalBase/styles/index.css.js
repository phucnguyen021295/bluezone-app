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
import * as fontSize from '../../../../core/fontSize';
import {widthPercentageToDP} from '../../../../core/utils/dimension';

const CONTAINER_MARGIN = widthPercentageToDP((28 / 360) * 100);
const BODY_PADDING_HORIZONTAL = widthPercentageToDP((18 / 360) * 100);

const styles = StyleSheet.create({
  container: {
    margin: CONTAINER_MARGIN,
    justifyContent: 'center',
  },

  content: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
  },

  body: {
    paddingHorizontal: BODY_PADDING_HORIZONTAL,
  },

  title: {
    fontSize: fontSize.larger,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 12,
  },

  description: {
    fontSize: fontSize.fontSize16,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 16,
  },

  bottomHalfModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },

  contentStyle: {
    backgroundColor: '#ffffff',
  },
});

export default styles;
