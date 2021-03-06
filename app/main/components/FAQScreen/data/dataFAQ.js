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

import {getQuestionFAQ as getQuestionFAQAPI} from '../../../../core/apis/bluezone';
import {setQuestionFAQ, getQuestionFAQ} from '../../../../core/storage';
import dataFAQ from '../dataFAQ.json';
import {versionCompare} from '../../../../core/version';

const _defaultFunc = () => {};

const syncQuestionFAQ = async (success = _defaultFunc) => {
  const FAQStorage = await getQuestionFAQ();
  let syncFAQ = dataFAQ;
  if (FAQStorage) {
    syncFAQ = FAQStorage;
  }

  success(syncFAQ);

  const _success = FAQApi => {
    // >
    if (!FAQApi.version) {
      return;
    }

    if (versionCompare(FAQApi.version, syncFAQ.version) === 1) {
      setQuestionFAQ(FAQApi);
      syncFAQ = FAQApi;
    }

    success(syncFAQ);
  };

  return getQuestionFAQAPI(_success);
};

export default dataFAQ;

export {syncQuestionFAQ};
