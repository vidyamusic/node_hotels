const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

personSchema.pre("save", async function (next) {
  const person = this;
  //Hash the password only if it has been modified (or it's new)
  if (!person.isModified("password")) return next();
  try {
    //hash password generation
    const salt = await bcrypt.genSalt(10);
    //hash password
    const hashedPassword = await bcrypt.hash(person.password, salt);
    //override the plain password with the hashed one
    person.password = hashedPassword;
  } catch (err) {
    return next(err);
  }
});
//creating comparison function for the auth.js
personSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    //use bcrypt to compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};
//Create Person Model

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
