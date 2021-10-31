const express = require("express");
const app = express();
const dbo = require("./connect");
const { users, products, doctors, departments, prescriptions, advertisements } = require("./routes/index");

dbo.connectToServer(() => {
  console.log("Database connected");
});

//MIDDLEWARES
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use("/users", users);
app.use("/products", products);
app.use("/doctors", doctors);
app.use("/departments", departments);
app.use("/prescriptions", prescriptions);
app.use("/advertisements", advertisements);

//merge test

app.listen(process.env.PORT, function () {
  console.log("Listening on http://localhost:" + process.env.PORT);
});
