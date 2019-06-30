const mongo = require('../../Mongo/getMongo');

const showCommand = (msg, command) => {
  //Create Mongo Client
  const client = mongo.getMongoClient();

  //Connect to server
  client.connect((err) => {
    if(err)throw err;

    //Set up db and collection
    const db = client.db(mongo.dbName);
    const collection = db.collection(mongo.collectionName);
    let record;

    try{
      //Find record. Document ID is Discord ID
      record = collection.find({_id: msg.author.id}).toArray((err, res) => {
        if(err)throw err;

        //Send message
        if(res[0]){
          msg.reply("The BattleTag on file for you is `" +res[0].battleTag + '`');
        }else{
          msg.reply("No BattleTag on file for you. Link your BattleTag using `!o link Name#1234`. Keep in mind that BattleTags are case sensitive!")
        }
      });
      // msg.reply("Linked your account!");
    }
    catch(err){
      msg.reply("There was an error.");
      msg.reply(err);
    }

    client.close();
  });
}

module.exports = showCommand;