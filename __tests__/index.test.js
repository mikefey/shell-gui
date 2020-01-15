
const { assert } = require('chai');
const request = require('supertest');
const server = require('../index.js');

describe('index.js', () => {
  afterEach(() => {
    server.close();
  });

  it('should render the UI at the "/" route', async () => {
    const response = await request(server).get('/');

    assert.equal(response.text.includes('My Project'), true);
    assert.equal(response.text.includes('Section 1'), true);
    assert.equal(response.text.includes('List NPM Modules'), true);
  });

  it('should return the output of a shell command at /api/commands/:id', async () => {
    const response = await request(server).get('/api/commands/list-modules');

    assert.equal(response.body.toString('utf8'), '\'hello\'\n');
  });
});
