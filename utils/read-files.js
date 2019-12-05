const fs = require('fs');

const readFiles = (dirname) => new Promise((resolve, reject) => {
  fs.readdir(dirname, (fsErr, filenames) => {
    if (fsErr) {
      reject(fsErr);
    }

    const files = [];
    let inc = 0;

    filenames.forEach((filename) => {
      fs.readFile(`${dirname}${filename}`, 'utf-8', (err, content) => {
        if (err) {
          reject(err);
        }

        files.push({ filename, content });
        inc += 1;

        if (inc === filenames.length) {
          resolve(files);
        }
      });
    });
  });
});

module.exports = readFiles;
