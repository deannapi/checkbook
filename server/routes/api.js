const router = require("express").Router();
const Checkbook = require("../models/Transaction");

router.post("/api/checkbook", ({ body }, res) => {
  Checkbook.create(body)
    .then((dbCheckbook) => {
      res.json(dbCheckbook);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.post("/api/checkbook/bulk", ({ body }, res) => {
  Checkbook.insertMany(body)
    .then((dbCheckbook) => {
      res.json(dbCheckbook);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.get("/api/checkbook", (req, res) => {
  Checkbook.find({})
    .sort({ date: -1 })
    .then((dbCheckbook) => {
      res.json(dbCheckbook);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

module.exports = router;