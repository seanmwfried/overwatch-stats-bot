const mongo = require('../Mongo/getMongo');
const getStats = require('../Stats/statsCommand');

const meCommand = (msg, command) => {
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
      //Upsert BattleTag. Document ID is Discord ID
      //Store handle for easy identification
      record = collection.find({_id: msg.author.id}).toArray((err, res) => {
        if(err)throw err;

        //Store battle tag and add it to command to pass to stats modules
        const battleTag = res[0].battleTag;
        command[2] = battleTag;

        //Get and display stats
        getStats(msg, command);
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

module.exports = meCommand;