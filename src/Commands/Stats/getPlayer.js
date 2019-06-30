const overwatch = require('overwatch-api');
const formatPlayerStats = require('./formatPlayerStats');

const getPlayer = (playerArray, callback) => {
  //overwatch api requires battletag to look like Krusher99-1234 where - replaces the usual #
  const player = playerArray.join('-');
  overwatch.getProfile('pc', 'us', player, (err, json) => {
    if(err)throw err;

    //Format player stats into a string
    const playerStats = formatPlayerStats(json);

    //Send stats to callback
    callback(playerStats);
  })
}

module.exports = getPlayer;