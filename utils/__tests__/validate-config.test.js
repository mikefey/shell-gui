const { expect } = require('chai');
const validateConfig = require('../validate-config');

/*

{
  title: 'My Project',
  sections: [
    {
      title: 'Section 1',
      commands: [
        {
          title: 'List NPM Modules',
          action: 'npm ls',
        },
        {
          title: 'Test',
          action: 'npm test',
        },
      ],
    },
  ],
}

*/

describe('validateConfig', () => {
  const defaultError = 'See configs/configs.sample.yml for an example of the correct format.';

  it('should throw an error if the data is missing a title', async () => {
    const dataWithoutTitle = {
      sections: [
        {
          title: 'Section 1',
          commands: [
            {
              title: 'List NPM Modules',
              action: 'npm ls',
            },
            {
              title: 'Test',
              action: 'npm test',
            },
          ],
        },
      ],
    };

    expect(() => { validateConfig(dataWithoutTitle); }).to.throw(`A "title" key must be present ${defaultError}`);
  });

  it('should throw an error if the data is missing sections', async () => {
    const dataWithoutSections = {
      title: 'My Project',
    };

    expect(() => { validateConfig(dataWithoutSections); }).to.throw(`A "sections" key must be present ${defaultError}`);
  });

  it('should throw an error if the sections are empty', async () => {
    const dataWithoutSections = {
      title: 'My Project',
      sections: [],
    };

    expect(() => { validateConfig(dataWithoutSections); }).to.throw(`There must be at least one "section" as a child of the "sections" key/value pair. ${defaultError}`);
  });

  it('should throw an error if any sections are missing a title', async () => {
    const dataWithoutSections = {
      title: 'My Project',
      sections: [
        {
          commands: [
            {
              title: 'List NPM Modules',
              action: 'npm ls',
            },
            {
              title: 'Test',
              action: 'npm test',
            },
          ],
        },
      ],
    };

    expect(() => { validateConfig(dataWithoutSections); }).to.throw(`Each section must have a "title" key/value pair. ${defaultError}`);
  });

  it('should throw an error if any sections are missing commands', async () => {
    const dataWithoutSectionCommands = {
      title: 'My Project',
      sections: [
        {
          title: 'Section 1',
        },
      ],
    };

    expect(() => { validateConfig(dataWithoutSectionCommands); }).to.throw(`Each section must have a "commands" key/value pair. ${defaultError}`);
  });

  it('should throw an error if any commands are missing a title', async () => {
    const dataWithoutCommandTitles = {
      title: 'My Project',
      sections: [
        {
          title: 'Section 1',
          commands: [
            {
              action: 'npm ls',
            },
            {
              title: 'Test',
              action: 'npm test',
            },
          ],
        },
      ],
    };

    expect(() => { validateConfig(dataWithoutCommandTitles); }).to.throw(`Each command must have a "title" key/value pair. ${defaultError}`);
  });

  it('should throw an error if any commands are missing an action', async () => {
    const dataWithoutCommandActions = {
      title: 'My Project',
      sections: [
        {
          title: 'Section 1',
          commands: [
            {
              title: 'List NPM Modules',
              action: 'npm ls',
            },
            {
              title: 'Test',
            },
          ],
        },
      ],
    };

    expect(() => { validateConfig(dataWithoutCommandActions); }).to.throw(`Each command must have an "action" key/value pair. ${defaultError}`);
  });
});
