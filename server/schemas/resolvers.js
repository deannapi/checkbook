const { AuthenticationError } = require("apollo-server-express");
const { User, Transaction } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.User) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("transactions");
        return userData;
      }
      throw new AuthenticationError("You need to be logged in.");
    },
    user: async (parent, { email }) => {
      return User.findOne({ email })
        .select("-__v -password")
        .populate("transactions");
    },

    // get all transactions
    transactions: async (parent, args, context) => {
      console.log(context.user.firstName);
      return transaction.find({ firstName: context.user.firstName }).sort({
        createdAt: -1,
      });
    },

    // get a transaction by id
    transaction: async (parent, { _id }) => {
      return Transaction.findOne({ _id });
    },
  },

  Mutation: {
      addUser: async (parent, args) => {
          const user = await User.create(args);
          const token = signToken(user);

          return { token, user };
      },

      login: async(parent, { email, password }) => {
          const user = await User.findOne({ email });
          console.log('email: ', email);

          if (!user) {
              throw new AuthenticationError("Incorrect credentials.")
          }
          const token = signToken(user);
          return { token, user };
      },

      addTransaction: async (parent, args, context) => {
          if (context.user) {
              const transaction = await Transaction({
                  ...args,
                  firstName: context.user.firstName
              });
              await User.findByIdAndUpdate(
                  { _id: context.user._id },
                  { $push: { transactions: transaction._id } },
                  { new: true }
              );
              return transaction;
          }
          throw new AuthenticationError("You need to be logged in.")
      }
  },
};

module.exports = resolvers;
