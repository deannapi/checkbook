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

// router.post("/checkbook", (req, res) => {
//   const data = req.body;
//   const newTransPost = new TransPost(data);

//   newTransPost.save((error) => {
//     if (error) {
//       res.status(500).json({ msg: "Internal server error." });
//       return;
//     }

//     // TransPost
//     return res.json({
//       msg: "Transaction has been saved.",
//     });
//   });
// });

router.post('/checkbook', (req, res) => {
  console.log('Body: ', req.body);
  res.json({
    msg: 'Transaction received.'
  })
})

router.get('/transactions', (req, res) => {
  const data = {
    transactionName: 'Start Balance',
    amount: 3999
  };
  res.json(data);
});

module.exports = router;
