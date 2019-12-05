const validateConfig = (fileData) => {
  const defaultError = 'See configs/configs.sample.yml for an example of the correct format.';

  if (!fileData.title) {
    throw new Error(`\x1b[91mA "title" key must be present ${defaultError}\x1b[39m`);
  }

  if (!fileData.sections) {
    throw new Error(`\x1b[91mA "sections" key must be present ${defaultError}\x1b[39m`);
  }

  if (!fileData.sections || !fileData.sections.length) {
    throw new Error(`\x1b[91mThere must be at least one "section" as a child of the "sections" key/value pair. ${defaultError}\x1b[39m`);
  }

  fileData.sections.forEach((section) => {
    if (!section.title) {
      throw new Error(`\x1b[91mEach section must have a "title" key/value pair. ${defaultError}\x1b[39m`);
    }

    if (!section.commands) {
      throw new Error(`\x1b[91mEach section must have a "commands" key/value pair. ${defaultError}\x1b[39m`);
    }

    section.commands.forEach((command) => {
      if (!command.title) {
        throw new Error(`\x1b[91mEach command must have a "title" key/value pair. ${defaultError}\x1b[39m`);
      }

      if (!command.action) {
        throw new Error(`\x1b[91mEach command must have an "action" key/value pair. ${defaultError}\x1b[39m`);
      }
    });
  });
};

module.exports = validateConfig;
