const express = require("express");
const dbo = require("../connect");
const doctors = express.Router();
const uuid = require("uuid");

doctors.get("/", (req, res) => {
  const dbConnect = dbo.getDb();
  dbConnect
    .db("doctors")
    .collection("doctorsList")
    .find({})
    .toArray((err, result) => {
      if (err) {
        res.status(400).send("Error fetching");
      } else {
        res.status(200).json({ status: 200, message: "success", data: result });
      }
    });
});

doctors.get("/:id", (req, res) => {
  const dbConnect = dbo.getDb();
  const query = { id: req.params.id };

  dbConnect
    .db("doctors")
    .collection("doctorsList")
    .findOne(query, (err, result) => {
      if (err) {
        res.status(400).json({ status: 400, message: "fail", data: err });
      } else {
        res.status(200).json({ status: 200, message: "success", data: result });
      }
    });
});

doctors.post("/addDoctor", (req, res) => {
  try {
    const dbConnect = dbo.getDb();
    const document = {
      id: uuid.v4(),
      department_id: req.body.department_id,
      name: req.body.name,
      appointments: req.body.appointments,
      additional_attributes: req.body.additional_attributes,
      contact_no: req.body.contact_no
    };

    dbConnect
      .db("doctors")
      .collection("doctorsList")
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

module.exports = doctors;
