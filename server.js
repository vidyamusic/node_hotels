const express = require("express");
const app = express();
const db = require("./db");
const Person = require("./models/Person");
const MenuItem = require("./models/MenuItem");
const bodyParser = require("body-parser");
//Importing Router Files -
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");
//Importing .env for sensitive info
require("dotenv").config();
app.use(bodyParser.json()); //stores all data in req.body
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

//Using the Person Router
app.use("/person", personRoutes);
//Using the Menu Router
app.use("/menu", menuRoutes);
//using .env variable
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
