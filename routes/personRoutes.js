const express = require("express");
const router = express.Router();
const Person = require("../models/Person");
//using the async instead of previously used callback function is industry practice
router.post("/", async (req, res) => {
  try {
    const data = req.body; //assuming the request body contains the person data
    //create a new person document using the Mongoose model
    const newPerson = new Person(data);

    //Save the new person to the database
    const savedPerson = await newPerson.save();
    console.log("data saved");
    res.status(200).json(savedPerson);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//Get method to get the person
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//Parameterized API calls - after writing colone before work we make it variable
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; //Extract the work type from URL parameter
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "Invalid work Type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//we're not writting _id as right now it's just the id variable
//document id is being send by parameter in URL, while the updates are
//beign send in the body.
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; //extracting id from url
    const updatedPersonData = req.body; //updated data for person
    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, //it returns the updated version of document, if false it will not return updated version
        runValidators: true, //run mongoose validation (schema/model)
      }
    );
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data deleted");
    res.status(200).json("person deleted successfully ");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
