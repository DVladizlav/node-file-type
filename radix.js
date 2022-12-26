const templates = {
  avi: {
    ext: 'avi',
    mime: 'video/x-msvideo',
  },
  gif: {
    ext: 'gif',
    mime: 'image/gif',
  },
  jpg: {
    ext: 'jpg',
    mime: 'image/jpeg',
  },
  mp3: {
    ext: 'mp3',
    mime: 'audio/mpeg',
  },
  mp4: {
    ext: 'mp4',
    mime: 'video/mp4',
  },
  midi: {
    ext: 'midi',
    mime: 'audio/midi',
  },
  mpg: {
    ext: 'mpg',
    mime: 'video/mpeg',
  },
  pdf: {
    ext: 'pdf',
    mime: 'application/pdf',
  },
  png: {
    ext: 'png',
    mime: 'image/png',
  },
  psd: {
    ext: 'psd',
    mime: 'image/vnd.adobe.photoshop',
  },
  tiff: {
    ext: 'tif',
    mime: 'image/tiff',
  },
  wav: {
    ext: 'wav',
    mime: 'audio/wav',
  },
  webm: {
    ext: 'webm',
    mime: 'video/webm',
  },
  webp: {
    ext: 'webp',
    mime: 'image/webp',
  },
  woff: {
    ext: 'woff',
    mime: 'font/woff',
  },
  woff2: {
    ext: 'woff2',
    mime: 'font/woff2',
  },
  zip: {
    ext: 'zip',
    mime: 'application/zip',
  },
};

const input = {
  '?? ?? ?? ?? 66 74 79 70': 'mp4',
  '49 44 33': 'mp3',
  '00 00 01 B3': 'mpg',
  '4D 54 68 64': 'midi',
  'FF D8 FF E0': 'jpg',
  'FF D8 FF E1 ?? ?? 45 78 69 66 00 00': 'jpg',
  'FF D8 FF EE': 'jpg',
  'FF D8 FF DB': 'jpg',
  '47 49 46 38 37 61': 'gif',
  '47 49 46 38 39 61': 'gif',
  '89 50 4E 47 0D 0A 1A 0A': 'png',
  '38 42 50 53': 'psd',
  '52 49 46 46 ?? ?? ?? ?? 41 56 49 20': 'avi',
  '52 49 46 46 ?? ?? ?? ?? 57 41 56 45': 'wav',
  '52 49 46 46 ?? ?? ?? ?? 57 45 42 50': 'webp',
  '25 50 44 46 2D': 'pdf',
  '1A 45 DF A3': 'webm',
  '49 49 2A 00': 'tiff', // little-endian
  '4D 4D 00 2A': 'tiff', // big-endian
  '50 4B 03 04': 'zip',
  '50 4B 05 06': 'zip', // empty
  '50 4B 07 08': 'zip', // spanned,
  '77 4F 46 46': 'woff',
  '77 4F 46 32': 'woff2',
};

const root = {};

for (const hexString in input) {
  let node = root;
  const hexArray = hexString.toLowerCase().split(' ');
  for (const hex of hexArray) {
    if (node.children === undefined) node.children = {};
    if (node.children[hex] === undefined) node.children[hex] = {};
    node = node.children[hex];
  }
  const data = templates[input[hexString]];
  node.ext = data.ext;
  node.mime = data.mime;
}

require('fs').writeFileSync('radix.json', JSON.stringify(root));
