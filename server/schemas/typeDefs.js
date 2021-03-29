const { gql } = require("apollo-server-express");

const typeDefs = gql`
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
      email: String!
      password: String!
    ): Auth
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
    user: [User]
    firstName: String
  }
`;

module.exports = typeDefs;
