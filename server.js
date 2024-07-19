const express = require("express");
const app = express();
const db = require("./db");
const Person = require("./models/Person");
const MenuItem = require("./models/MenuItem");
const bodyParser = require("body-parser");
//Importing Router Files -
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");
app.use(bodyParser.json()); //stores all data in req.body
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

//Using the Person Router
app.use("/person", personRoutes);
//Using the Menu Router
app.use("/menu", menuRoutes);
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
