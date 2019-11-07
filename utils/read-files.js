const fs = require('fs');

const readFiles = (dirname) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dirname, (err, filenames) => {
      if (err) {
        reject(err);
      }

      const files = [];
      let inc = 0;

      filenames.forEach((filename) => {
        fs.readFile(`${dirname}${filename}`, 'utf-8', (err, content) => {
          if (err) {
            reject(err);
          }

          files.push({ filename, content });
          inc++;

          if (inc === filenames.length) {
            resolve(files);
          }
        });
      });
    });
  });
}

module.exports = readFiles;
