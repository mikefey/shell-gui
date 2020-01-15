const { assert } = require('chai');
const { readFiles } = require('../read-files');

describe('readFiles', () => {
  it('should load files and return their contents', async () => {
    const expected = [
      {
        filename: 'config.sample.yml',
        content: "title: \"My Project\"\nproject_dir: './'\nsections:\n  - section:\n    title: \"Section 1\"\n    commands:\n      - command:\n        id: \"list-modules\"\n        title: \"List NPM Modules\"\n        action: \"echo 'hello'\"\n      - command:\n        id: \"run-test\"\n        title: \"Test\"\n        action: \"npm test\"\n\n",
      },
    ];

    const fileList = await readFiles(`${__dirname}/../../support/fixtures/config/`);
    assert.deepEqual(fileList, expected);
  });
});
