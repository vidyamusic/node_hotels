const express = require("express");
const app = express();
const db = require("./db");
const Person = require("./models/Person");
const MenuItem = require("./models/MenuItem");
const bodyParser = require("body-parser");
//const passport = require("./auth");
//Initializing passport
//app.use(passport.initialize());
//Importing Router Files -
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");
//Importing .env for sensitive info
require("dotenv").config();
app.use(bodyParser.json()); //stores all data in req.body
//Middleware example function -
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`
  );
  next(); //Move on to the next phase.
};
//pass the logRequest (middleware function) to the get function.
//const localAuthMiddleware = passport.authenticate("local", { session: false });
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
//in order for the whole app to use the middleware we use -
app.use(logRequest);
//in order to use only for one route , we can add middleware into the given use
//Using the Person Router
app.use("/person", personRoutes);
//Using the Menu Router
app.use("/menu", menuRoutes);
//using .env variable
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
