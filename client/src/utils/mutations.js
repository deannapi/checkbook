import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!, $firstName: String!, $lastName: String!) {
    addUser(username: $username, email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_TRANSACTION = gql`
  mutation addTransaction($transactionName: String!, $transactionAmount: String!) {
    addTransaction(transactionName: $transactionName, transactionAmount: $transactionAmount) {
      _id
      transactionName
      transactionAmount
      createdAt
      username
    }
  }
`;
