import gql from 'graphql-tag';

// one transaction
export const QUERY_TRANSACTION = gql`
    query transaction($id: ID!) {
        transaction(_id: $id) {
            _id
            transactionName
            amount
            createdAt
            username
        }
    }
`;

// all transactions
export const QUERY_TRANSACTIONS = gql`
    query transactions($username: String!) {
        transactions(username: $username) {
            _id
            transactionName
            amount
            createdAt
            username
        }
    }
`;

// find user
export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            transactions {
                _id
                transactionName
                amount
                createdAt
            }
        }
    }
`;

// find self
export const QUERY_ME_BASIC = gql`
    {
        me {
            _id
            username
            email
            transactions {
                _id
                transactionName
                amount
                createdAt
            }
        }
    }
`;