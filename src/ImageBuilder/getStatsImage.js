const jimp = require('jimp');

const getStatsImage = (playerInfo, callback) => {
  //Create promises and store in an array
  const promises = [];
  promises.push(
    jimp.read('./images/playercardBG.png'),  //0  Background
    jimp.read(playerInfo.portrait),          //1  Player portrait
    jimp.read('./images/iconmask.png'),      //2  Mask to keep portrait from overflowing out of frame border
    jimp.read(playerInfo.levelFrame),        //3  Level frame
    jimp.read(playerInfo.star),              //4  Level stars
    jimp.loadFont('./fonts/name/font.fnt'),  //5  White font for name (big)
    jimp.loadFont('./fonts/blue/font.fnt'),  //6  Blue font for header (medium)
    jimp.loadFont('./fonts/purple/font.fnt'),//7  Purple font for header (medium)
    jimp.loadFont('./fonts/green/font.fnt'), //8  Purple font for header (small)
    jimp.loadFont('./fonts/white/font.fnt'), //9  Purple font for header (small)
    jimp.loadFont('./fonts/red/font.fnt'),   //10 Purple font for header (small)
    );

  //When everything is loaded, composite image
  Promise.all(promises).then(promises => {
    promises[0].composite(promises[1], 68, 70); //Add portrait to background
    promises[0].composite(promises[2], 0, 0);   //Mask portrait
    promises[0].composite(promises[3], 5, 5);   //Add level border
    if(promises[4])
      promises[0].composite(promises[4], 5, 125); //Add stars if available
    //Print name relative to bottom right
    promises[0].print(promises[5], 
                775 - jimp.measureText(promises[5], playerInfo.username), 
                310 - jimp.measureTextHeight(promises[5], playerInfo.username), 
                playerInfo.username);
    //Quickplay header
    promises[0].print(promises[6],
                775 - jimp.measureText(promises[6], 'quickplay'),
                10,
                'quickplay');
    //Competitive header
    promises[0].print(promises[7],
                250,
                10,
                'competitive');

    //If private, stop here
    if(playerInfo.private){
      //Write 'private profile'
      promises[0].print(promises[9],
        300,
        150,
        'private profile');
      //Return
      promises[0].getBufferAsync(jimp.MIME_PNG).then((buffer) => {callback(buffer)});
    } else {
      //If public, draw profile
      //Comp W
      promises[0].print(promises[8],
        300,
        100,
        'w');
      //Comp D
      promises[0].print(promises[9],
        300,
        150,
        'd');
      //Comp L
      promises[0].print(promises[10],
        300,
        200,
        'l');
      //Comp Win count
      promises[0].print(promises[9],
        325,
        100,
        `- ${(playerInfo.games.competitive.won) ? playerInfo.games.competitive.won : 'N/A'}`);
      //Comp Draw count
      promises[0].print(promises[9],
        325,
        150,
        `- ${playerInfo.games.competitive.draw}`);
      //Comp Loss count
      promises[0].print(promises[9],
        325,
        200,
        `- ${(playerInfo.games.competitive.lost) ? playerInfo.games.competitive.lost : 'N/A'}`);
      //SR
      promises[0].print(promises[9],
        300,
        250,
        `${(playerInfo.competitive.rank) ? playerInfo.competitive.rank : '--'} SR`);
      //Quickplay W
      promises[0].print(promises[8],
        600,
        100,
        'w');
      //Quickplay Win count
      promises[0].print(promises[9],
        625,
        100,
        `- ${(playerInfo.games.quickplay.won) ? playerInfo.games.quickplay.won : 'N/A'}`);
      
      
      promises[0].getBufferAsync(jimp.MIME_PNG).then((buffer) => {callback(buffer)});
    }
  });
}

module.exports = getStatsImage;