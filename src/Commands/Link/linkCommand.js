const mongo = require('../Mongo/getMongo');

const linkCommand = (msg, command) => {
  if(command.length <= 2 || command[2].split('#').length !== 2){
    msg.reply("The link command must be invoked with a BattleTag. `!o link Krusher99#1234`");
    return;
  }

  //Create Mongo Client
  const client = mongo.getMongoClient();

  //Connect to server
  client.connect((err) => {
    if(err)throw err;

    //Set up db and collection
    const db = client.db(mongo.dbName);
    const collection = db.collection(mongo.collectionName);

    try{
      //Upsert BattleTag. Document ID is Discord ID
      //Store handle for easy identification
      collection.update({_id: msg.author.id}, {
        discordHandle: msg.author.username + '#' + msg.author.discriminator,
        battleTag: command[2]
      }, {upsert: true});
      msg.reply("Linked your account!");
    }
    catch(err){
      msg.reply("There was an error.");
      msg.reply(err);
    }

    client.close();
  });

}

module.exports = linkCommand;