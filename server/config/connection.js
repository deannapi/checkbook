const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/checkbook", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("✅ MongoDB connection successful.".green);
  })
  .catch((e) => {
    console.log("❌ MongoDB connection error: ".bgRed, e.message);
  });

mongoose.set("debug", true);

module.exports = mongoose.connection;
