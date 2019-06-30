/*
 *  Overwatch Stats Bot
 *  Sean Fried
 *  
 *  All commands prefixed with "!o"
 *  Commands:
 *  help (lists commands and how to use them)
 *  stats {battletag} (display stats for player)
 *  link {battletag} (links battletag to discord account, enables !o me)
 *  me (performs a stats command on battletag that's linked to discord profile)
 */

const discord = require('discord.js');
const client = new discord.Client();
const loginKey = require('./loginKey');
const commands = require('./commands');

//Log message when logged in
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
})

//Check messages
client.on('message', msg => {
  //If message begins with '!o', read command
  if(msg.content[0] === '!' && msg.content[1] === 'o'){
    //Split command into parts
    let command = msg.content.split(" ");

    switch(command[1]){
      case "help":
        console.log("help command");
        break;
      case "stats":
        commands.stats(msg, command);
        break;
      case "link":
        console.log("link command");
        break;
      case "me":
        console.log("me command");
        break;
      default:
        msg.reply("Command not recognized. Type `!o help` for list of commands.");
    }

  }
});

//Link start!
client.login(loginKey);