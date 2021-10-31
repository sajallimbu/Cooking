const { MongoClient } = require("mongodb");
require('dotenv').config();
const uri = process.env.DB_CONNECTION;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

var dbo = {
  connectToServer: function (callback) {
    client.connect((err, db) => {
      if (err || !db) {
        return callback(err);
      }
      dbConnection = db;

      return callback();
    });
  },
  getDb: function () {
    return dbConnection;
  },
};

module.exports = dbo;
