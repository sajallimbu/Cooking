const express = require("express");
const dbo = require("../connect");
const products = express.Router();
const uuid = require("uuid");

products.get("/", (req, res) => {
  const dbConnect = dbo.getDb();
  dbConnect
    .db("products")
    .collection("productList")
    .find({})
    .toArray((err, result) => {
      if (err) {
        res.status(400).send("Error fetching");
      } else {
        res.status(200).json({ status: 200, message: "success", data: result });
      }
    });
});

products.get("/:id", (req, res) => {
  const dbConnect = dbo.getDb();
  const query = { id: req.params.id };

  dbConnect
    .db("products")
    .collection("productList")
    .findOne(query, (err, result) => {
      if (err) {
        res.status(400).json({ status: 400, message: "fail", data: err });
      } else {
        res.status(200).json({ status: 200, message: "success", data: result });
      }
    });
});

products.post("/addProduct", (req, res) => {
  try {
    const dbConnect = dbo.getDb();
    const document = {
      id: uuid.v4(),
      vendor_id: req.body.vendor_id,
      name: req.body.name,
      price: req.body.price,
      discount: req.body.discount,
      category: req.body.category,
      commission: req.body.commission,
      description: req.body.description,
      stock_count: req.body.stock_count,
      item_unit: req.body.item_unit,
      deliverable_location: req.body.deliverable_location,
      additional_attributes: req.body.additional_attributes,
    };

    dbConnect
      .db("products")
      .collection("productList")
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

module.exports = products;
