import React, { useState } from "react";
import axios from "axios";
import { useMutation } from "@apollo/react-hooks";
import { ADD_TRANSACTION } from "../utils/mutations";
import { QUERY_ME_BASIC, QUERY_TRANSACTIONS } from "../utils/queries";

export default class TransactionForm extends React.Component {
  state = { transactionName: "", amount: "", transactions: [] };

  componentDidMount = () => {
    this.getTransPosts();
  };

  getTransPosts = () => {
    axios
      .get("/api")
      .then((response) => {
        const data = response.data;
        this.setState({ transactions: data });
        console.log("Transaction submitted.");
      })
      .catch((error) => {
        alert("Error retrieving data!");
        console.log("Error: ", error);
      });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  // addTransaction to MongoDB
  // addTransaction = () => {
  //   useMutation(ADD_TRANSACTION, {
  //     update(cache, { data: { addTransaction } }) {
  //       try {
  //         const { transactions } = cache.readQuery({
  //           query: QUERY_TRANSACTIONS,
  //           variables: {
  //             id: addTransaction._id,
  //           },
  //         });
  //         cache.writeQuery({
  //           query: QUERY_TRANSACTIONS,
  //           data: { transactions: [addTransaction, ...transactions] },
  //         });
  //       } catch (e) {
  //         console.error(e);
  //       }

  //       // update me object's cache, appending new transaction to the end of the array
  //       const { me } = cache.readQuery({ query: QUERY_ME_BASIC });
  //       cache.writeQuery({
  //         query: QUERY_ME_BASIC,
  //         data: {
  //           me: { ...me, transactions: [...me.transactions, addTransaction] },
  //         },
  //       });
  //     },
  //   });
  // };

  handleFormSubmit = (event) => {
    event.preventDefault();

    const payload = {
      transactionName: this.state.transactionName,
      amount: this.state.amount,
    };

    axios({
      url: "/api/checkbook",
      method: "POST",
      data: payload,
    })
      .then(() => {
        console.log("Data has been sent to the server.");
        this.resetUserInputs();
        this.getTransPosts();
      })
      .catch(() => {
        console.log("Internal server error.");
      });
    // try {
    //   // add transaction to database
    //   await addTransaction({
    //     variables: { transactionName, transactionAmount },
    //   });
    // } catch (e) {
    //   console.error(e);
    // }
  };

  resetUserInputs = () => {
    this.setState({
      transactionName: "",
      amount: "",
    });
  };

  displayTransPosts = (transactions) => {
    if (!transactions.length) return null;

    return transactions.map((transaction, index) => (
      <div kep={index} className="trans-post__display">
        <h3>{transaction.transactionName}</h3>
        <p>{transaction.amount}</p>
      </div>
    ));
  };

  render() {
    console.log("State: ", this.state);

    return (
      <div className="checkbook">
        <div className="total">
          Your total is: $<p id="total">0</p>
        </div>

        <form onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            className="form-control"
            id="t-name"
            name="transactionName"
            placeholder="Name of transaction"
            value={this.state.transactionName}
            onChange={this.handleChange}
          />
          <input
            type="number"
            step=".01"
            name="transactionAmount"
            min="0"
            className="form-control"
            id="t-amount"
            placeholder="Transaction amount"
            value={this.state.transactionAmount}
            onChange={this.handleChange}
          />
          <button id="add-btn" className="btn">
            <i className="fas fa-plus"></i> Add Funds
          </button>
          <button id="sub-btn" className="btn">
            <i className="fas fa-minus"></i> Subtract Funds
          </button>
          <p className="error-text" role="alert"></p>
        </form>

        <div>{this.displayTransPosts(this.state.transactions)}</div>
      </div>
    );
  }
}
