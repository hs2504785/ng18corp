const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');
const sourceDir = 'dist/apps/rochlab/browser';

// find the styles css file
const files = getFilesFromPath(sourceDir, '.css');
const data = [];

if (!files && files.length <= 0) {
  console.log('cannot find style files to purge');
  return;
}

for (let f of files) {
  // get original file size
  const originalSize = getFilesizeInKiloBytes(sourceDir + '/' + f) + 'kb';
  let o = { file: f, originalSize: originalSize, newSize: '' };
  data.push(o);
}

console.log('Run PurgeCSS...');

exec(`npm run purgecss`, function (error, stdout, stderr) {
  console.log('PurgeCSS done');
  console.log();

  for (let d of data) {
    // get new file size
    const newSize = getFilesizeInKiloBytes(sourceDir + '/' + d.file) + 'kb';
    d.newSize = newSize;
  }

  console.table(data);
});

function getFilesizeInKiloBytes(filename) {
  const stats = fs.statSync(filename);
  const fileSizeInBytes = stats.size / 1024;
  return fileSizeInBytes.toFixed(2);
}

function getFilesFromPath(dir, extension) {
  const files = fs.readdirSync(dir);
  return files.filter((e) => path.extname(e).toLowerCase() === extension);
}
