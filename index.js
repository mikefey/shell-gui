const yaml = require('js-yaml');
const readFiles = require('./utils/read-files');

const getFileData = async () => {
  const configFileData = await readFiles('./configs/')
  configFileData.forEach((configFile) => {
    console.log(JSON.stringify(yaml.safeLoad(configFile.content)));
  });
}

getFileData();
