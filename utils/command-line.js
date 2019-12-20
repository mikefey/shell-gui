const getEnvVars = (command) => {
  const actionArray = command.split(' ');

  return actionArray
    .filter((item) => item.indexOf('=') > -1 && item.indexOf('--') === -1)
    .reduce((acc, item) => {
      const [key, val] = item.split('=');

      const updated = {
        ...acc,
        [key]: val,
      };

      return updated;
    }, {});
};

const getActionsWithoutEnvVars = (command) => {
  const actionArray = command.split(' ');
  return actionArray.filter((item) => item.indexOf('=') === -1 || item.indexOf('--') > -1);
};

module.exports = {
  getEnvVars,
  getActionsWithoutEnvVars,
};
