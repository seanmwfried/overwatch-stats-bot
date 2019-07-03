//File to be constantly rewritten to test functionality
const overwatch = require('overwatch-api');
const getStatsImage = require('../../ImageBuilder/getStatsImage');

const getPlayer = (playerArray, callback) => {
  //overwatch api requires battletag to look like Krusher99-1234 where - replaces the usual #
  const player = playerArray.join('-');
  overwatch.getProfile('pc', 'us', player, (err, json) => {
    let playerStats;
    if(err){
      //If can't find profile, display message. Usually can't find due to case, so we'll mention that here.
      playerStats = "Unable to find profile. (BattleTags are case sensitive! Check the case! If you're getting this message when using the `!o me` command, relink your account. `!o link Krusher99#1234`)";
    }else{
      //Format player stats into a string
      playerStats = json;
    }
    
    //Send stats to callback
    callback(playerStats);
  })
}

const testCommand = (msg, command) => {
  getPlayer(['StarMech', '1453'], (playerInfo) => {
    console.log(playerInfo);
    getStatsImage(playerInfo, (imageBuffer) => {
      msg.reply("test", {file: imageBuffer});
    });
  });
}

module.exports = testCommand;