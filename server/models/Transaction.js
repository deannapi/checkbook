const mongoose = require("mongoose");
// const { Schema } = mongoose;
const moment = require("moment");

const transactionSchema = new mongoose.Schema(
  {
    transactionName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 30,
    },
    amount: {
      type: Number,
      require: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: (timestamp) =>
        moment(timestamp).format("MMMM Do, YYYY [at] hh:mm a"),
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const TransPost = mongoose.model("TransPost", transactionSchema);
module.exports = TransPost;
