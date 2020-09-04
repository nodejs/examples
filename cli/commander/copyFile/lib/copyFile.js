const path = require('path');
const fs = require('fs');

const exist = (dir) => {
  try {
    fs.accessSync(
      dir,
      fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK
    ); //tests a user's permissions for the file or directory specified by path
    return true; //if dir exists, return true.
  } catch (e) {
    return false; //if dir not exists, return false.
  }
};

const mkdirp = (dir) => {
  const dirname = path
    .relative('.', path.normalize(dir))
    .split(path.sep)
    .filter((p) => !!p);
  dirname.forEach((d, idx) => {
    const pathBuilder = dirname.slice(0, idx + 1).join(path.sep);
    if (!exist(pathBuilder)) {
      fs.mkdirSync(pathBuilder); //make directory
    }
  });
};

const copyFile = (name, directory) => {
  if (exist(name)) {
    mkdirp(directory);
    fs.copyFileSync(name, path.join(directory, name));
    console.log(`${name} file is copied.`);
  } else {
    console.error('File does not exist.');
  }
};

module.exports = copyFile;
