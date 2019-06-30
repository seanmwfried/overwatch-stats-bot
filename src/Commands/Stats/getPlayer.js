const overwatch = require('overwatch-api');
const formatPlayerStats = require('./formatPlayerStats');

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
      playerStats = formatPlayerStats(json);
    }

    //Send stats to callback
    callback(playerStats);
  })
}

module.exports = getPlayer;