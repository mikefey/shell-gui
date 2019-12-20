const { assert } = require('chai');
const addIdsToCommands = require('../add-ids-to-commands');
const configData = require('../../support/fixtures/config-data');

describe('addIdsToCommands', () => {
  it('should add an _id property to each command object', () => {
    const withIds = addIdsToCommands(configData[0].sections);

    withIds.forEach((section) => {
      section.commands.forEach((command) => {
        assert.equal(typeof command._id, 'string');
        assert.equal(command._id.length, 36);
      });
    });
  });
});
