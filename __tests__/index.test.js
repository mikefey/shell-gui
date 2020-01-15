
const { assert } = require('chai');
const request = require('supertest');
const server = require('../index.js');

describe('index.js', () => {
  beforeEach(async () => {
    // do something before anything else runs
    console.log('Jest starting!');
  });

  afterEach(() => {
    server.close();
    console.log('server closed!');
  });

  it('should render the UI at the "/" route', async () => {
    /* const configData = [
      {
        title: 'My Project',
        project_dir: './',
        sections: [
          {
            section: null,
            title: 'Section 1',
            commands: [
               {
                command: null,
                title: 'List NPM Modules',
                action: 'npm ls',
                _id: '23b9717d-8878-439e-aa96-86ed7e8d1073'
              },
              {
                command: null,
                title: 'Test',
                action: 'npm test',
                _id: '97a30bb4-b0df-40e2-8588-dd85bc400073'
              }
            ]
          }
        ],
      },
    ] */
    const response = await request(server).get('/');

    assert.equal(response.text.includes('My Project'), true);
    assert.equal(response.text.includes('Section 1'), true);
  });
});
