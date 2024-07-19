const mongoose = require("mongoose");

//Define the Person Schema

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, //makes the field mandatory to fill
  },
  age: {
    type: Number,
    required: false,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
});

//Create Person Model

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
