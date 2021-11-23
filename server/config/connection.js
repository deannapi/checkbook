// const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;

const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _db;

// mongoose
//   .connect(process.env.MONGODB_URI || "mongodb://localhost/checkbook", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then(() => {
//     console.log("✅ MongoDB connection successful.".green);
//   })
//   .catch((e) => {
//     console.log("❌ MongoDB connection error: ".bgRed, e.message);
//   });

// mongoose.set("debug", true);

// module.exports = mongoose.connection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // verify we have a good "db" object
      if (db) {
        _db = db.db("Checkbook");
        console.log("✅ MongoDB connection successful.".green);
      }
      return callback(err);
    });
  },

  getDb: function () {
    return _db;
  },
};
