const express = require("express");
const dbo = require("../connect");
const uuid = require("uuid");

const users = express.Router();

users.get("/", function (req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .db("users")
    .collection("userList")
    .find({})
    .toArray((err, result) => {
      if (err) {
        res.status(400).send("Error fetching");
      } else {
        res.json(result);
      }
    });
});

users.post("/addUser", function (req, res) {
  const dbConnect = dbo.getDb();
  const document = {
    username: req.body.username,
    password: req.body.password,
    date_created: new Date(),
    uuid: uuid.v4(),
  };

  dbConnect
    .db("users")
    .collection("userList")
    .insertOne(document, (err, result) => {
      if (err) {
        res.status(400).send("Error on post");
      } else {
        console.log(`Added a new user: ${req.body.username}`);
        res.status(204).send("User added");
      }
    });
});

users.get("/:userId", function (req, res) {
  const dbConnect = dbo.getDb();
  const query = { uuid: req.params.userId };

  dbConnect
    .db("users")
    .collection("userList")
    .find(query)
    .toArray((err, result) => {
      if (err) {
        res.status(400).send("Error fetching");
      } else {
        res.json(result);
      }
    });
});

users.patch("/updateUser", function (req, res) {
  const dbConnect = dbo.getDb();
  const query = { uuid: req.body.uuid };
  const update = {
    $set: {
      username: req.body.username,
      password: req.body.password,
    },
  };

  dbConnect
    .db("users")
    .collection("userList")
    .updateOne(query, update, (err, result) => {
      if (err) {
        res.status(400).send("User update failed");
      } else {
        console.log(`User updated: ${req.body.uuid}`);
        res.status(204).send(`User updated: ${req.body.uuid}`);
      }
    });
});

users.delete("/deleteUser", function (req, res) {
  const dbConnect = dbo.getDb();
  const query = { uuid: req.body.uuid };

  dbConnect
    .db("users")
    .collection("userList")
    .deleteOne(query, (err, result) => {
      if (err) {
        res.status(400).send("Error on delete");
      } else {
        console.log(`User deleted: ${req.body.uuid}`);
        res.status(200).send(`User deleted: ${req.body.uuid}`);
      }
    });
});

module.exports = users;
