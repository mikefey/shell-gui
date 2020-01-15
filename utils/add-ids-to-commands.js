const { uuidv4 } = require('./uuidv4');

const addIdsToCommands = (sections) => sections.map((section) => {
  const newCommands = section.commands.map((command) => ({
    ...command,
    _id: command.id || uuidv4(),
  }));

  return {
    ...section,
    commands: newCommands,
  };
});

module.exports = { addIdsToCommands };
