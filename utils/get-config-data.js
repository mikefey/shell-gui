const yaml = require('js-yaml');
const readFiles = require('./read-files');
const validateConfig = require('./validate-config');
const addIdsToCommands = require('./add-ids-to-commands');

const getConfigData = async () => {
  const configFileData = await readFiles('./configs/');
  let inc = 0;

  configFileData.sort((a, b) => ((a.filename > b.filename) ? 1 : -1));

  return new Promise((resolve) => {
    const sections = [];

    configFileData.forEach((configFile) => {
      const parsedContent = yaml.safeLoad(configFile.content);

      validateConfig(parsedContent);
      parsedContent.sections = addIdsToCommands(parsedContent.sections);

      sections.push(parsedContent);
      inc += 1;

      if (inc === sections.length) {
        resolve(sections);
      }
    });
  });
};

module.exports = getConfigData;
