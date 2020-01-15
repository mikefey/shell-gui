const { assert } = require('chai');
const { uuidv4 } = require('../uuidv4');

describe('uuidv4', () => {
  it('should create a uuid', async () => {
    const id = uuidv4();
    const regexTest = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);

    assert.equal(regexTest, true);
  });
});
