const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        me: User
        users: [User]
        user(email: String!): User
        transactions: [Transaction]
        transaction(_id: ID!): Transaction
    }

    type Auth {
        token: ID!
        user: User
    }

    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        password: String
        transactionName: 
    }

    type Transaction {
        _id: ID
        transactionName: String
        amount: Float
        type: String
        date: DateTime
    }
`;

module.exports = typeDefs;