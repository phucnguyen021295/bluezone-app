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

import {defineMessages} from 'react-intl';

export default defineMessages({
  header: {
    id: 'bluezone.entryForm.header',
    defaultMessage: 'Tờ khai Y tế đối với người nhập cảnh',
  },
  content1: {
    id: 'bluezone.entryForm.content1',
    defaultMessage:
      'Đây là tài liệu quan trọng, thông tin của Anh/Chị sẽ giúp cơ quan y tế liên lạc khi cần thiết để phòng trống dịch bệnh truyền nhiễm',
  },
  content2: {
    id: 'bluezone.entryForm.content2',
    defaultMessage:
      'Khuyến cáo: Khai báo thông tin sai là vi phạm pháp luật Việt Nam và có thể xử lý hình sự',
  },
  content3: {
    id: 'bluezone.entryForm.content3',
    defaultMessage:
      'Dữ liệu bạn cung cấp hoàn toàn bảo mật và chỉ phục vụ cho việc phòng chống dịch, thuộc quản lý của Ban chỉ đạo quốc gia về Phòng chống dịch Covid-19. Khi bạn nhấn nút "Gửi" là bạn đã hiểu và đồng ý.',
  },
  portrait: {
    id: 'bluezone.entryForm.portrait',
    defaultMessage: 'Ảnh chân dung',
  },
  gate: {
    id: 'bluezone.entryForm.gate',
    defaultMessage: 'Cửa khẩu',
  },
  selectGate: {
    id: 'bluezone.entryForm.selectGate',
    defaultMessage: 'Chọn cửa khẩu',
  },
  fullName: {
    id: 'bluezone.entryForm.fullName',
    defaultMessage: 'Họ tên',
  },
  yearOfBirth: {
    id: 'bluezone.entryForm.yearOfBirth',
    defaultMessage: 'Năm sinh',
  },
  selectYearOfBirth: {
    id: 'bluezone.entryForm.selectYearOfBirth',
    defaultMessage: 'Chọn năm sinh',
  },
  gender: {
    id: 'bluezone.entryForm.gender',
    defaultMessage: 'Giới tính',
  },
  male: {
    id: 'bluezone.entryForm.male',
    defaultMessage: 'Nam',
  },
  female: {
    id: 'bluezone.entryForm.female',
    defaultMessage: 'Nữ',
  },
  genderOther: {
    id: 'bluezone.entryForm.genderOther',
    defaultMessage: 'Khác',
  },
  nationality: {
    id: 'bluezone.entryForm.nationality',
    defaultMessage: 'Quốc tịch',
  },
  select: {
    id: 'bluezone.entryForm.select',
    defaultMessage: 'Chọn',
  },
  selectNationality: {
    id: 'bluezone.entryForm.selectNationality',
    defaultMessage: 'Chọn quốc tịch',
  },
  passportNumber: {
    id: 'bluezone.entryForm.passportNumber',
    defaultMessage: 'Số hộ chiếu hoặc giấy thông hành hợp pháp khác',
  },
  passportPlaceholder: {
    id: 'bluezone.entryForm.passportPlaceholder',
    defaultMessage: 'Nhập số CMT/CCCD/Hộ chiếu',
  },
  vehicleInformation: {
    id: 'bluezone.entryForm.vehicleInformation',
    defaultMessage: 'Thông tin đi lại',
  },
  planes: {
    id: 'bluezone.entryForm.planes',
    defaultMessage: 'Máy bay',
  },
  ship: {
    id: 'bluezone.entryForm.ship',
    defaultMessage: 'Tàu thuyền',
  },
  car: {
    id: 'bluezone.entryForm.car',
    defaultMessage: 'Ô tô',
  },
  vehicleOther: {
    id: 'bluezone.entryForm.vehicleOther',
    defaultMessage: 'Khác (Ghi rõ)',
  },
  vehicleNumber: {
    id: 'bluezone.entryForm.vehicleNumber',
    defaultMessage: 'Số hiệu phương tiện',
  },
  vehicleSeat: {
    id: 'bluezone.entryForm.vehicleSeat',
    defaultMessage: 'Số ghế',
  },
  startDay: {
    id: 'bluezone.entryForm.startDay',
    defaultMessage: 'Ngày khởi hành',
  },
  endDay: {
    id: 'bluezone.entryForm.endDay',
    defaultMessage: 'Ngày nhập cảnh',
  },
  startPlace: {
    id: 'bluezone.entryForm.startPlace',
    defaultMessage: 'Địa điểm khởi hành (tỉnh/ quốc gia)',
  },
  country: {
    id: 'bluezone.entryForm.country',
    defaultMessage: 'Quốc gia/ Vùng lãnh thổ',
  },
  selectCountry: {
    id: 'bluezone.entryForm.selectCountry',
    defaultMessage: 'Chọn quốc gia',
  },
  province: {
    id: 'bluezone.entryForm.province',
    defaultMessage: 'Tỉnh',
  },
  selectProvince: {
    id: 'bluezone.entryForm.selectProvince',
    defaultMessage: 'Chọn tỉnh',
  },
  endPlace: {
    id: 'bluezone.entryForm.endPlace',
    defaultMessage: 'Địa điểm nơi đến (tỉnh/ quốc gia)',
  },
  vietnam: {
    id: 'bluezone.entryForm.vietnam',
    defaultMessage: 'Việt Nam',
  },
  country21Day: {
    id: 'bluezone.entryForm.country21Day',
    defaultMessage:
      'Trong vòng 21 ngày qua, anh/chị đã đến quốc gia/vùng lãnh thổ nào ?',
  },
  vnContactAddress: {
    id: 'bluezone.entryForm.vnContactAddress',
    defaultMessage: 'Địa chỉ liên lạc tại Việt Nam',
  },
  vnProvince: {
    id: 'bluezone.entryForm.vnProvince',
    defaultMessage: 'Tỉnh / Thành',
  },
  vnSelectProvince: {
    id: 'bluezone.entryForm.vnSelectProvince',
    defaultMessage: 'Chọn tỉnh/thành',
  },
  vnDistrict: {
    id: 'bluezone.entryForm.vnDistrict',
    defaultMessage: 'Quận / Huyện',
  },
  vnSelectDistrict: {
    id: 'bluezone.entryForm.vnSelectDistrict',
    defaultMessage: 'Chọn quận/huyện',
  },
  vnWard: {
    id: 'bluezone.entryForm.vnWard',
    defaultMessage: 'Phường / Xã',
  },
  vnSelectWard: {
    id: 'bluezone.entryForm.vnSelectWard',
    defaultMessage: 'Chọn phường xã',
  },
  vnAddress: {
    id: 'bluezone.entryForm.vnAddress',
    defaultMessage: 'Địa chỉ nơi ở tại Việt Nam',
  },
  phoneNumber: {
    id: 'bluezone.entryForm.phoneNumber',
    defaultMessage: 'Điện thoại',
  },
  email: {
    id: 'bluezone.entryForm.email',
    defaultMessage: 'Email',
  },
  symptom21Day: {
    id: 'bluezone.entryForm.symptom21Day',
    defaultMessage:
      'Trong vòng 21 ngày (tính đến thời điểm làm thủ tục xuất cảnh, nhập cảnh, quá cảnh) Anh/chị có thấy xuất hiện dấu hiệu nào sau đây',
  },
  symptom: {
    id: 'bluezone.entryForm.symptom',
    defaultMessage: 'Triệu chứng',
  },
  yes: {
    id: 'bluezone.entryForm.yes',
    defaultMessage: 'Có',
  },
  no: {
    id: 'bluezone.entryForm.no',
    defaultMessage: 'Không',
  },
  vacxinContent: {
    id: 'bluezone.entryForm.vacxinContent',
    defaultMessage: 'Danh sách vắc-xin hoặc sinh phẩm được sử dụng',
  },
  exposureHistory21Day: {
    id: 'bluezone.entryForm.exposureHistory21Day',
    defaultMessage: 'Lịch sử phơi nhiễm: Trong vòng 21 ngày qua, Anh/Chị có',
  },
  testResult: {
    id: 'bluezone.entryForm.testResult',
    defaultMessage: 'Phiếu kết quả xét nghiệm',
  },
  negative: {
    id: 'bluezone.entryForm.negative',
    defaultMessage: 'Âm tính',
  },
  positive: {
    id: 'bluezone.entryForm.positive',
    defaultMessage: 'Dương tính',
  },
  sendContent: {
    id: 'bluezone.entryForm.sendContent',
    defaultMessage: 'Gửi tờ khai',
  },
  declareSuccess: {
    id: 'bluezone.entryForm.declareSuccess',
    defaultMessage: 'Khai báo nhập cảnh thành công',
  },
  // sendContent: {
  //   id: 'bluezone.entryForm.cancel',
  //   defaultMessage: 'Gửi tờ khai',
  // },
  // sendContent: {
  //   id: 'bluezone.entryForm.selectPortrait',
  //   defaultMessage: 'Gửi tờ khai',
  // },
  // sendContent: {
  //   id: 'bluezone.entryForm.selectTestResult',
  //   defaultMessage: 'Gửi tờ khai',
  // },
  // sendContent: {
  //   id: 'bluezone.entryForm.takePhoto',
  //   defaultMessage: 'Gửi tờ khai',
  // },
  // sendContent: {
  //   id: 'bluezone.entryForm.sendContent',
  //   defaultMessage: 'Gửi tờ khai',
  // },
  // sendContent: {
  //   id: 'bluezone.entryForm.sendContent',
  //   defaultMessage: 'Gửi tờ khai',
  // },
  // sendContent: {
  //   id: 'bluezone.entryForm.sendContent',
  //   defaultMessage: 'Gửi tờ khai',
  // },
});
