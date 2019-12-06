const assert = require('assert');
const getConfigData = require('../get-config-data');

describe('getConfigData', () => {
  it('should load and parse config files', async () => {
    const configData = await getConfigData('../../support/config/');
    console.log(configData);
  });
});
