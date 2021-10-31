const express = require("express");
const dbo = require("../connect");
const advertisements = express.Router();
const uuid = require("uuid");

advertisements.get("/", (req, res) => {
  const dbConnect = dbo.getDb();
  dbConnect
    .db("advertisements")
    .collection("advertisementList")
    .find({})
    .toArray((err, result) => {
      if (err) {
        res.status(400).send("Error fetching");
      } else {
        res.status(200).json({ status: 200, message: "success", data: result });
      }
    });
});

advertisements.get("/:id", (req, res) => {
  const dbConnect = dbo.getDb();
  const query = { id: req.params.id };

  dbConnect
    .db("advertisements")
    .collection("advertisementList")
    .findOne(query, (err, result) => {
      if (err) {
        res.status(400).json({ status: 400, message: "fail", data: err });
      } else {
        res.status(200).json({ status: 200, message: "success", data: result });
      }
    });
});

advertisements.post("/addAdvertisement", (req, res) => {
  try {
    const dbConnect = dbo.getDb();
    const document = {
      id: uuid.v4(),
      url: req.body.url,
      locations: req.body.locations,
      refrence: req.body.refrence,
      additional_attributes: req.body.additional_attributes,
    };

    dbConnect
      .db("advertisements")
      .collection("advertisementList")
      .insertOne(document, (err, result) => {
        if (err) {
          res.status(400).json({ status: 400, message: "fail", data: err });
        } else {
          res
            .status(200)
            .json({ status: 200, message: "success", data: result });
        }
      });
  } catch (error) {
    res.status(500).json({ status: 500, message: "fail", data: error });
    console.log(error);
  }
});

module.exports = advertisements;
