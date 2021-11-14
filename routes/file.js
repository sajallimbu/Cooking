const express = require("express");
const file = express.Router();
const upload_helper = require('../helper')

file.get("/", (req, res) => {
    res.sendFile(__dirname + "/uploadFile.html");
});
file.post("/upload", async function (req, res) {
    upload_helper(req, res);
});

module.exports = file;
