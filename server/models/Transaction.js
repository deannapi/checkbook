const mongoose = require("mongoose");
const { Schema } = mongoose;
const moment = require("moment");

const transactionSchema = new Schema(
  {
    transactionName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 30,
    },
    amount: {
      type: String,
      require: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
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

module.exports = mongoose.model("Transaction", transactionSchema);
