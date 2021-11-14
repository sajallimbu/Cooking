const express = require("express");
const app = express();
const dbo = require("./connect");
const upload = require("express-fileupload");
const { users, products, doctors, departments, prescriptions, advertisements, file } = require("./routes");

dbo.connectToServer();

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload())

//ROUTES
app.use("/users", users);
app.use("/products", products);
app.use("/doctors", doctors);
app.use("/departments", departments);
app.use("/prescriptions", prescriptions);
app.use("/advertisements", advertisements);
app.use("/file", file);

app.listen(process.env.PORT, function () {
  console.log("Listening on http://localhost:" + process.env.PORT);
});
