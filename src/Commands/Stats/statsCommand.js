const getPlayer = require('./getPlayer');
const getStatsImage = require('../../ImageBuilder/getStatsImage');

const statsCommand = (msg, command) => {
  //Make sure battletag is in the command
  if(command.length <= 2){
    msg.reply("The stats command must be invoked with a BattleTag. `!o stats Krusher99#1234`");
    return;
  }
  //Split name and discriminator
  let player = command[2].split('#');
  //If we don't have 2 parts of the battletag or the second part is not a number, display message
  if(player.length !== 2 || isNaN(player[1])){
    msg.reply("BattleTag must be in the format of Name#Discriminator (e.g. Krusher99#1234)");
  }else{
    //Get player info
    getPlayer(player, (playerInfo) => {
      getStatsImage(playerInfo, (imageBuffer) => {
        msg.reply('', {file: imageBuffer});
      });
    });
  }
}

module.exports = statsCommand;