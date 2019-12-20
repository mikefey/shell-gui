const getCwdById = (id, data) => {
  let cwd;

  data.forEach((app) => {
    app.sections.forEach((section) => {
      section.commands.forEach((actn) => {
        if (actn._id === id) {
          cwd = app.project_dir;
        }
      });
    });
  });

  return cwd;
};

module.exports = getCwdById;
