const concat = require('concat');
const fs = require('fs');

const scripts = [];
const folder = 'lib';
fs.readdir(folder, (err, files) => {
  files.forEach((file) => {
    scripts.push(`./${folder}/${file}`);
  });
  console.log(scripts);
  concat(scripts, 'dist/gettour.js');
});
