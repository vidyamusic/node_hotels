const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const savedMenuItem = await newMenuItem.save();
    console.log("data saved");
    res.status(200).json(savedMenuItem);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType; //Extract the work type from URL parameter
    if (tasteType == "Spicy" || tasteType == "Sweet" || tasteType == "Sour") {
      const response = await MenuItem.find({ taste: tasteType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "Invalid taste Type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//comment added for testing purposes
module.exports = router;
