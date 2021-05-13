const mongoose = require("mongoose");
const { Schema } = mongoose;
// var Schema = mongoose.Schema;
const moment = require("moment");
// require('mongoose-currency').loadType(mongoose);
// var Currency = mongoose.Types.Currency;

const transactionSchema = new Schema(
  {
    transactionName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 30,
    },
    transactionAmount: {
      type: Number,
      require: true,
      trim: true,
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

// // GETTER
// transactionSchema.path("amount").get(function (num) {
//   return (num / 100).toFixed(2);
// });

// // SETTER
// transactionSchema.path("amount").set(function (num) {
//   return num * 100;
// });

module.exports = mongoose.model("Transaction", transactionSchema);
