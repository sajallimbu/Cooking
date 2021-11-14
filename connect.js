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
        console.log("Database connection failed!");;
      } else {
        dbConnection = db;
        console.log("Database connected");
      }
    });
  },
  getDb: function () {
    return dbConnection;
  },
};

setInterval(() => {
  if (!dbConnection) {
    dbo.connectToServer();
  }
}, 1000 * 60 * 60);

module.exports = dbo;
