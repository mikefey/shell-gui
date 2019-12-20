const { assert } = require('chai');
const addIdsToCommands = require('../add-ids-to-commands');
const getCwdById = require('../get-cwd-by-id');
const configData = require('../../support/fixtures/config-data');

describe('getCwdById', () => {
  it('should return a directory path given an id', () => {
    const withIds = configData.map((app) => ({
      ...app,
      sections: addIdsToCommands(app.sections),
    }));
    const actionId = withIds[0].sections[0].commands[1]._id;
    assert.equal(getCwdById(actionId, withIds), '../my-project-dir');
  });
});
