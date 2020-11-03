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

import {getConfigComponentsApp as getConfigComponentsAppAPI} from '../../../../core/apis/bluezone';
import {
  setConfigComponentApp,
  getConfigComponentApp,
} from '../../../../core/storage';
import configComponentApp from '../configComponentApp';
import {versionCompare} from '../../../../core/version';

const _defaultFunc = () => {};

const syncConfigComponentApp = async (success = _defaultFunc) => {
  const configStorage = await getConfigComponentApp();
  let syncConfigApp = configComponentApp;
  if (configStorage) {
    syncConfigApp = configStorage;
  }

  success(syncConfigApp);

  const _success = configAppApi => {
    if (!configAppApi.version) {
      return;
    }
    if (versionCompare(configAppApi.version, syncConfigApp.version) === 1) {
      setConfigComponentApp(configAppApi);
      syncConfigApp = configAppApi;
    }

    success(syncConfigApp);
  };

  return getConfigComponentsAppAPI(_success);
};

export default configComponentApp;

export {syncConfigComponentApp};
