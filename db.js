const mongoose = require("mongoose");

//Define the MongoDB connection url

const mongoURL = "mongodb://localhost:27017/hotels"; // it will create a db named hotels if not present

//Set up MongoDB connection

mongoose.connect(mongoURL, {
  //useNewParser: true,   don't use it as it's not required in newer versions of MongoDB
  //useUnifiedTopology: true, // these parameters ensure that we're working with new version of mongoDB
});

//Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;

//Define event listeners for database connection

db.on("connected", () => {
  console.log("connected to MongoDB server");
});

db.on("error", (err) => {
  console.log("MongoDB connection error: ", err);
});

db.on("disconnected", () => {
  console.log("MongoDb disconnected");
});

//Export the database connection
module.exports = db;
