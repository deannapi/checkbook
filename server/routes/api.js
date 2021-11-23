const express = require("express");
const router = express.Router();
const TransPost = require("../models/Transaction");

// connect to the database
const dbo = require("../config/connection");

// convert id from string to ObjectId for the _id
const ObjectId = require("mongodb").ObjectID;

// get a list of all the records
router.route("/").get(function (req, res) {
  let db_connect = dbo.getDb("transactions");
  db_connect
    .collection("transactions")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// get a single transaction by id
router.route("/checkbook/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("transactions")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// create new transaction
router.route("/checkbook/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    transactionName: req.body.transactionName,
    amount: req.body.amount,
  };
  db_connect.collection("transactions").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// update a record by id
router.route("/checkbook/:id").post(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      transactionName: req.body.transactionName,
      amount: req.body.amount,
    },
  };
  db_connect
    .collection("transactions")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("Transaction has been updated.");
      res.json(res);
    });
});

// delete a record
router.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("transactions").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("Transaction deleted.");
    response.status(obj);
  });
});

// Routes
// router.get("/checkbook", (req, res) => {
//   TransPost.find({})
//     .then((data) => {
//       console.log("Data: ", data);
//       res.json(data);
//     })
//     .catch((error) => {
//       console.log("Error: ", error);
//     });
// });

// router.post("/checkbook", (req, res) => {
//   console.log("Body: ", req.body);
//   const data = req.body;
//   const newTransPost = new TransPost(data);

//   newTransPost.save((error) => {
//     if (error) {
//       res.status(500).json({ msg: "Internal server error." });
//     } else {
//       // TransPost
//       res.json({
//         msg: "Transaction has been saved.",
//       });
//     }
//   });
// });

module.exports = router;
