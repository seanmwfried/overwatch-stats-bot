const jimp = require('jimp');

const getStatsImage = (playerInfo, callback) => {
  console.log(playerInfo);
  //Create promises and store in an array
  const promises = [];
  promises.push(
    jimp.read('./images/playercardBG.png'),               //0  Background
    jimp.read(playerInfo.portrait),                       //1  Player portrait
    jimp.read('./images/iconmask.png'),                   //2  Mask to keep portrait from overflowing out of frame border
    jimp.read(playerInfo.levelFrame),                     //3  Level frame
    (playerInfo.star) ? jimp.read(playerInfo.star) : null,//4  Level stars (only try to read if string isn't empty)
    jimp.loadFont('./fonts/name/font.fnt'),               //5  White font for name (big)
    jimp.loadFont('./fonts/blue/font.fnt'),               //6  Blue font for header (medium)
    jimp.loadFont('./fonts/purple/font.fnt'),             //7  Purple font for header (medium)
    jimp.loadFont('./fonts/green/font.fnt'),              //8  Green font for wins (small)
    jimp.loadFont('./fonts/white/font.fnt'),              //9  White font for draws and other (small)
    jimp.loadFont('./fonts/red/font.fnt'),                //10 Red font for losses (small)
    (playerInfo.competitive.tank.rank_img) ? jimp.read(playerInfo.competitive.tank.rank_img) : null,       //11 Tank Rank Image
    (playerInfo.competitive.damage.rank_img) ? jimp.read(playerInfo.competitive.damage.rank_img) : null,   //12 Damage Rank Image
    (playerInfo.competitive.support.rank_img) ? jimp.read(playerInfo.competitive.support.rank_img) : null, //13 Support Rank Image
    jimp.read('https://static.playoverwatch.com/img/pages/career/icon-tank-8a52daaf01.png'),               //14 Tank Role Icon
    jimp.read('https://static.playoverwatch.com/img/pages/career/icon-offense-6267addd52.png'),            //15 Damage Role Icon
    jimp.read('https://static.playoverwatch.com/img/pages/career/icon-support-46311a4210.png'),            //16 Support Role Icon
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
    // //Quickplay header
    // promises[0].print(promises[6],
    //             775 - jimp.measureText(promises[6], 'quickplay'),
    //             10,
    //             'quickplay');
    // //Competitive header
    // promises[0].print(promises[7],
    //             250,
    //             10,
    //             'competitive');

    //If private, stop here
    if(playerInfo.private){
      //Write 'private profile'
      promises[0].print(promises[9],
        275,
        125,
        'private profile');
      //Return
      promises[0].getBufferAsync(jimp.MIME_PNG).then((buffer) => {callback(buffer)});

    } else {
      //If public, draw profile
      //Comp rank & W-D-L-%
      let wins              = (playerInfo.games.competitive.won) ? playerInfo.games.competitive.won : '0';
      let draws             = (playerInfo.games.competitive.draw) ? playerInfo.games.competitive.draw : '0';
      let losses            = (playerInfo.games.competitive.lost) ? playerInfo.games.competitive.lost : '0';
      let rankTank          = (playerInfo.competitive.tank.rank) ? playerInfo.competitive.tank.rank : 'unranked';
      let rankTankImage     = (playerInfo.competitive.tank.rank_img) ? playerInfo.competitive.tank.rank_img : null;
      let rankDamage        = (playerInfo.competitive.damage.rank) ? playerInfo.competitive.damage.rank : 'unranked';
      let rankDamageImage   = (playerInfo.competitive.damage.rank_img) ? playerInfo.competitive.damage.rank_img : null;
      let rankSupport       = (playerInfo.competitive.support.rank) ? playerInfo.competitive.support.rank : 'unranked';
      let rankSupportIimage = (playerInfo.competitive.support.rank_img) ? playerInfo.competitive.support.rank_img : null;
      let dash              = ' - ';
      //Get lengths of strings
      let competitiveLength = jimp.measureText(promises[7], 'competitive');
      let rankLength        = jimp.measureText(promises[9], rankTank);
      
      
      //Set position
      let wdlPosition = {
        x: 275,
        y: 140
      };

      let rankTankPosition = {
        x: 275,
        y: 15
      }

      let rankDamagePosition = {
        x: 275,
        y: 55
      }

      let rankSupportPosition = {
        x: 275,
        y: 95
      }
      
      //Resize role icons
      promises[14].resize(40,40); //Tank
      promises[15].resize(40,40); //Damage
      promises[16].resize(40,40); //Support

      //Tank Rank
      promises[0].composite(promises[14], rankTankPosition.x, rankTankPosition.y);
      if(promises[11]){
        promises[11].resize(64, 64);
        promises[0].composite(promises[11], rankTankPosition.x + 32, rankTankPosition.y - 10);
      }
      promises[0].print(promises[9], rankTankPosition.x + 32 + 58, rankTankPosition.y + 3, rankTank);

      //Damage Rank
      promises[0].composite(promises[15], rankDamagePosition.x, rankDamagePosition.y);
      if(promises[12]){
        promises[12].resize(64, 64);
        promises[0].composite(promises[12], rankDamagePosition.x + 32, rankDamagePosition.y - 10);
      }
      promises[0].print(promises[9], rankDamagePosition.x + 32 + 58, rankDamagePosition.y + 3, rankDamage);

      //Support Rank
      promises[0].composite(promises[16], rankSupportPosition.x, rankSupportPosition.y);
      if(promises[13]){
        promises[13].resize(64, 64);
        promises[0].composite(promises[13], rankSupportPosition.x + 32, rankSupportPosition.y - 10);
      }
      promises[0].print(promises[9], rankSupportPosition.x + 32 + 58, rankSupportPosition.y + 3, rankSupport);

      //Wins
      promises[0].print(promises[8],
        wdlPosition.x,
        wdlPosition.y,
        wins,
        (err, image, {x, y}) => {
          //Draws
          image.print(promises[9], x, wdlPosition.y, dash + draws + dash,
            (err, image, {x, y}) => {
              //Losses
              image.print(promises[10], x, wdlPosition.y, losses,
                (err, image, {x, y}) => {
                  //If percentage, draw it
                  if(!!playerInfo.games.competitive.win_rate){
                    promises[0].print(promises[9], x, wdlPosition.y, ' - ' + Math.trunc(playerInfo.games.competitive.win_rate) + '%');
                  }
                });
            })
        });
      
      
      // if(!!playerInfo.games.competitive.win_rate){        
      //   //Dash
      //   promises[0].print(promises[9],
      //     wdlPosition.x + winLength + dashLength + drawLength + dashLength + lossLength,
      //     wdlPosition.y,
      //     '   -  ');
      //   //Win percentage
      //   promises[0].print(promises[9],
      //     wdlPosition.x + winLength + dashLength + drawLength + dashLength + lossLength + dashLength,
      //     wdlPosition.y,
      //     playerInfo.games.competitive.win_rate + '%');
      // }
          

      //Quickplay W
      promises[0].print(promises[8],
        575,
        15,
        'quickplay wins');
      //Quickplay Win count
      promises[0].print(promises[9],
        625,
        60,
        `${(playerInfo.games.quickplay.won) ? playerInfo.games.quickplay.won : 'N/A'}`);
      
      
      promises[0].getBufferAsync(jimp.MIME_PNG).then((buffer) => {callback(buffer)});
    }
  });
}

module.exports = getStatsImage;