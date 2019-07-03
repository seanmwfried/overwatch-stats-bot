const jimp = require('jimp');

const getImage = (url, callback) => {
  jimp.read(url)
  .then((image) => {
    callback(image);
  }).catch((err) => {
    console.log('Error loading image from' + url, err);
    callback(null);
  });
}

module.exports = getImage;