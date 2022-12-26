const { readFileSync, existsSync } = require('fs');
const radix = JSON.parse(readFileSync('radix.json'));

function fileTypeFromBuffer(buffer) {
  let hexString = buffer.toString('hex').slice(0, 32);
  let currentNode = radix;

  let i = 0;
  let fileSizeFound = false;
  // temporary condition until I input overlapping file types
  while (currentNode.ext === undefined) {
    const hex = hexString[i] + hexString[i + 1];
    i = i + 2;
    let nextNode = currentNode.children[hex] ?? currentNode.children['??'];
    if (nextNode !== undefined) {
      currentNode = nextNode;
      continue;
    }
    // temporary condition to check if file size was first 4 bytes
    if (fileSizeFound === false) {
      fileSizeFound = true;
      hexString = hexString.replace(hexString.slice(0, 8), '????????');
      i = 0;
      currentNode = radix;
      continue;
    }
    return undefined;
  }

  return currentNode;
}

function fileTypeFromFile(filePath) {
  return fileTypeFromBuffer(readFileSync(filePath));
}

function fileType(data) {
  if (typeof data === 'string' && existsSync(data)) {
    return fileTypeFromBuffer(readFileSync(data));
  }
  return fileTypeFromBuffer(Buffer.from(data));
}

module.exports = { fileTypeFromBuffer, fileTypeFromFile, fileType };
  