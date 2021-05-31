const express = require("express");
const router = express.Router();
const TransPost = require("../models/Transaction");

// Routes
router.get("/", (req, res) => {
  TransPost.find({})
    .then((data) => {
      console.log("Data: ", data);
      res.json(data);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
});

router.post("/checkbook", (req, res) => {
  const data = req.body;
  const newTransPost = new TransPost(data);

  newTransPost.save((error) => {
    if (error) {
      res.status(500).json({ msg: "Internal server error." });
      return;
    }

    // Transaction Post
    return res.json({
      msg: "Transaction has been saved.",
    });
  });
});

module.exports = router;