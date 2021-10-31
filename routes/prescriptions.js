const express = require("express");
const dbo = require("../connect");
const prescriptions = express.Router();
const uuid = require("uuid");

prescriptions.get("/", (req, res) => {
  const dbConnect = dbo.getDb();
  dbConnect
    .db("prescriptions")
    .collection("prescriptionList")
    .find({})
    .toArray((err, result) => {
      if (err) {
        res.status(400).send("Error fetching");
      } else {
        res.status(200).json({ status: 200, message: "success", data: result });
      }
    });
});

prescriptions.get("/:id", (req, res) => {
  const dbConnect = dbo.getDb();
  const query = { id: req.params.id };

  dbConnect
    .db("prescriptions")
    .collection("prescriptionList")
    .findOne(query, (err, result) => {
      if (err) {
        res.status(400).json({ status: 400, message: "fail", data: err });
      } else {
        res.status(200).json({ status: 200, message: "success", data: result });
      }
    });
});

prescriptions.post("/addPrescription", (req, res) => {
  try {
    const dbConnect = dbo.getDb();
    const document = {
      id: uuid.v4(),
      products: req.body.products,
      additional_attributes: req.body.additional_attributes,
    };

    dbConnect
      .db("prescriptions")
      .collection("prescriptionList")
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

module.exports = prescriptions;
