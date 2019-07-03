const jimp = require('jimp');
const getImage = require('./getImage');

const composite = (url1, url2, callback) => {
  getImage(url1, (image1) => {
    getImage(url2, (image2) => {
      image1.composite(image2, 0, 0);

      image1.getBufferAsync(jimp.MIME_PNG).then(buffer => {callback(buffer);});
    })
  })
}

module.exports = composite;