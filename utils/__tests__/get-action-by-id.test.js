const assert = require('assert');
const addIdsToCommands = require('../add-ids-to-commands');
const getActionById = require('../get-action-by-id');
const configData = require('../../support/fixtures/config-data');


describe('getActionById', () => {
  it('should return an action given an id', () => {
    const withIds = configData.map((app) => ({
      ...app,
      sections: addIdsToCommands(app.sections),
    }));
    const actionId = withIds[0].sections[0].commands[1]._id;
    assert.equal(getActionById(actionId, withIds), 'npm test');
  });
});
