const mongoose = require("mongoose");
require("dotenv").config();
//Define the MongoDB connection url
// const mogoURL='mongodb://localhost:27017/hotels'
//console.log("MongoDB URI from .env file:", process.env.DB_URL);
// const mongoURL =
//   "mongodb+srv://vidya:qwerty12345@cluster0.qljjx1m.mongodb.net/";
//const mongoURL= process.env.DB_URL_LOCAL;
const mongoURL = process.env.DB_URL;
//Set up MongoDB connection

mongoose
  .connect(mongoURL, {
    //useNewParser: true,   don't use it as it's not required in newer versions of MongoDB
    //useUnifiedTopology: true, // these parameters ensure that we're working with new version of mongoDB
    ssl: true,
    tlsAllowInvalidCertificates: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error: ", err));

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
