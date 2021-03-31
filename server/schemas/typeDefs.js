const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    username: String
    email: String
    password: String
    transactions: [Transaction]
  }

  type Query {
    me: User
    users: [User]
    user(email: String!): User
    transactions: [Transaction]
    transaction(_id: ID!): Transaction
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      username: String!
      email: String!
      password: String!
    ): User
    login(email: String!, password: String!): Auth
    addTransaction(transactionName: String!): Transaction
  }

  type Auth {
    token: ID!
    user: User
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    username: String
    email: String
    password: String
    transactions: [Transaction]
  }

  type Transaction {
    _id: ID
    transactionName: String
    amount: Float
    createdAt: String
    username: String
    user: [User]
  }
`;

module.exports = typeDefs;
