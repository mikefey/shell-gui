const configData = [
  {
    title: 'My Project',
    project_dir: '../my-project-dir',
    sections: [
      {
        title: 'Section 1',
        commands: [
          {
            title: 'List NPM Modules',
            action: 'npm ls',
          },
          {
            title: 'test',
            action: 'npm test',
          },
        ],
      },
      {
        title: 'Section 2',
        commands: [
          {
            title: 'List NPM Modules',
            action: 'npm ls',
          },
          {
            title: 'test',
            action: 'npm test',
          },
        ],
      },
    ],
  },
];

module.exports = configData;
