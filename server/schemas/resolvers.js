const { AuthenticationError } = require("apollo-server-express");
const { User, Transaction } = require("../models");
const { signToken } = require("../utils/auth");
// const jwt = require('jsonwebtoken');
// const { user } = require("../config/connection");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("transactions");
        return userData;
      }
      throw new AuthenticationError("You need to be logged in.");
    },

    // get a user by username
    user(parent, { username }) {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("transactions");
    },

    // get all users
    users() {
      return User.find()
        .select('-__v -password')
        .populate('transactions')
    },
    // user(parent, { _id }) {
    //   return users.find(user => user._id === _id);
    // },

    // users() {
    //   return users;
    // },

    // get all transactions
    transactions: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Transaction.find(params).sort({ createdAt: -1 });
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
          // return user;
      },

      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError("Incorrect credentials");
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError("Incorrect credentials");
        }
  
        const token = signToken(user);
        return { token, user };
        // return user;
      },

      addTransaction: async (parent, args, context) => {
          if (context.user) {
              const transaction = await Transaction.create({
                  ...args,
                  username: context.user.username
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
