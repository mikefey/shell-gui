# Shell GUI
Run Shell Commands from a GUI instead of the command line.

This is a work in progress.

# TO DO
- Stream commands to the output panel (currently only displays the ouput after the command has finished running)

## Requirements
- Node 12.x
- NPM 6.x

## Run locally
- Rename configs/config.sample.yml to whatever you would like and fill out the appropriate fields with your data/commands:
```yml
title: "My Project" # your project title
project_dir: "./" # the root directory of the where you want to run the commands, relative to the root of this app
sections: # there can be an unlimited number of sections
  - section:
    title: "Section 1" # the section title
    commands: # each "command" will generate a button with text containing the "title", that will run "action" when clicked
      - command: 
        title: "List NPM Modules"
        action: "npm ls"
      - command:
        title: "Test"
        action: "npm test"
```
- then `npm start`

## Run tests
`npm test`
