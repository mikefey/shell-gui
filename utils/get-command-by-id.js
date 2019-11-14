const getCommandById = (id, data) => {
  let command;

  data.forEach((app) => {
    app.sections.forEach((section) => {
      section.commands.forEach((cmd) => {
        if (cmd.id === id) {
          command = cmd.command;
        }
      });
    })
  });

  return command;
}

module.exports = getCommandById;
