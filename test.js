const { readFileSync, readdir } = require('fs');
const { fileTypeFromBuffer, fileTypeFromFile, fileType } = require('.');
const folder = 'example';

readdir(folder, (err, files) => {
  for (const file of files) {
    const filePath = `${folder}/${file}`;
    const buffer = readFileSync(filePath);

    const results = {
      buffer: fileTypeFromBuffer(buffer),
      file: fileTypeFromFile(filePath),
      anyBuffer: fileType(buffer),
      anyFile: fileType(filePath),
    };

    console.log(file, results, '\n');
  }
});
