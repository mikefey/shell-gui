const { assert } = require('chai');
const getConfigData = require('../get-config-data');

describe('getConfigData', () => {
  it('should load and parse config files', async () => {
    const configData = await getConfigData(`${__dirname}/../../support/fixtures/config/`);

    assert.equal(Array.isArray(configData), true);
    assert.equal(configData[0].title, 'My Project');
    assert.equal(configData[0].sections[0].title, 'Section 1');

    assert.equal(configData[0].sections[0].commands[0].title, 'List NPM Modules');
    assert.equal(configData[0].sections[0].commands[0].action, 'npm ls');

    assert.equal(configData[0].sections[0].commands[1].title, 'Test');
    assert.equal(configData[0].sections[0].commands[1].action, 'npm test');
  });
});
