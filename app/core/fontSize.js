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

import {/* RFPercentage,*/ RFValue} from 'react-native-responsive-fontsize';

const STANDARD_SCREEN_HEIGHT = 720 - 24; // Kích thước phông chữ được tính bằng tỷ lệ phần trăm của chiều cao (chiều rộng ở chế độ ngang) của thiết bị.

export const tiny = RFValue(8, STANDARD_SCREEN_HEIGHT);

export const smallest = RFValue(10, STANDARD_SCREEN_HEIGHT);

export const fontSize11 = RFValue(11, STANDARD_SCREEN_HEIGHT);

export const small = RFValue(12, STANDARD_SCREEN_HEIGHT);

export const smaller = RFValue(13, STANDARD_SCREEN_HEIGHT);

export const fontSize14 = RFValue(14, STANDARD_SCREEN_HEIGHT);

export const normal = RFValue(15, STANDARD_SCREEN_HEIGHT);

export const fontSize16 = RFValue(16, STANDARD_SCREEN_HEIGHT);

export const large = RFValue(17, STANDARD_SCREEN_HEIGHT);

export const larger = RFValue(18, STANDARD_SCREEN_HEIGHT);

export const fontSize19 = RFValue(19, STANDARD_SCREEN_HEIGHT);

export const fontSize20 = RFValue(20, STANDARD_SCREEN_HEIGHT);

export const huge = RFValue(21, STANDARD_SCREEN_HEIGHT);

export const huger = RFValue(22, STANDARD_SCREEN_HEIGHT);

export const bigger = RFValue(24, STANDARD_SCREEN_HEIGHT);

export const biggest = RFValue(30, STANDARD_SCREEN_HEIGHT);

export const biggest2 = RFValue(29, STANDARD_SCREEN_HEIGHT);

export const biggest3 = RFValue(35, STANDARD_SCREEN_HEIGHT);
