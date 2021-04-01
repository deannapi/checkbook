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
    user(username: String!): User
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
    ): Auth
    login(email: String!, password: String!): Auth
    addTransaction(transactionName: String!, amount: String!): Transaction
  }

  type Auth {
    token: ID!
    user: User
  }

  type Transaction {
    _id: ID
    transactionName: String
    amount: String
    createdAt: String
    username: String
  }
`;

module.exports = typeDefs;
