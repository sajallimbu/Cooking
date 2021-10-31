const express = require("express");
const dbo = require("../connect");
const departments = express.Router();
const uuid = require("uuid");

departments.get("/", (req, res) => {
  const dbConnect = dbo.getDb();
  dbConnect
    .db("departments")
    .collection("departmentList")
    .find({})
    .toArray((err, result) => {
      if (err) {
        res.status(400).send("Error fetching");
      } else {
        res.status(200).json({ status: 200, message: "success", data: result });
      }
    });
});

departments.get("/:id", (req, res) => {
  const dbConnect = dbo.getDb();
  const query = { id: req.params.id };

  dbConnect
    .db("departments")
    .collection("departmentList")
    .findOne(query, (err, result) => {
      if (err) {
        res.status(400).json({ status: 400, message: "fail", data: err });
      } else {
        res.status(200).json({ status: 200, message: "success", data: result });
      }
    });
});

departments.post("/addDepartment", (req, res) => {
  try {
    const dbConnect = dbo.getDb();
    const document = {
      id: uuid.v4(),
      name: req.body.name,
      additional_attributes: req.body.additional_attributes,
    };

    dbConnect
      .db("departments")
      .collection("departmentList")
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

module.exports = departments;
