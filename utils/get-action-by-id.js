const getActionById = (id, data) => {
  let action;

  data.forEach((app) => {
    app.sections.forEach((section) => {
      section.commands.forEach((actn) => {
        if (actn._id === id) {
          action = actn.action;
        }
      });
    });
  });

  return action;
};

module.exports = { getActionById };
