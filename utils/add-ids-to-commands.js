const uuidv4 = require('./uuidv4');

const addIdsToCommands = (sections) => {
  sections.forEach((section) => {
    section.commands.forEach((command) => {
      command._id = uuidv4();
    })   
  })
};

module.exports = addIdsToCommands;
