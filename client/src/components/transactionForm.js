import React from "react";
import axios from "axios";
// import { useMutation } from "@apollo/react-hooks";
// import { ADD_TRANSACTION } from "../utils/mutations";
// import { QUERY_ME_BASIC, QUERY_TRANSACTIONS } from "../utils/queries";

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
      <div key={index} className="transPostDisplay">
        {/* <tbody id="tbody">
          <tr>
            <td>{transaction.createdAt}</td>
            <td>{transaction.transactionName}</td>
            <td>{transaction.amount}</td>
            <td>
              <button id="delete-trans">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        </tbody> */}
        <p>
          {transaction.transactionName} {transaction.amount}
        </p>
      </div>
    ));
  };

  render() {
    // shows every keystroke
    // console.log("State: ", this.state);

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
            name="amount"
            min="0"
            className="form-control"
            id="t-amount"
            placeholder="Transaction amount"
            value={this.state.amount}
            onChange={this.handleChange}
          />
          {/* <button id="add-btn" className="btn">
            <i className="fas fa-plus"></i> Add Funds
          </button>
          <button id="sub-btn" className="btn">
            <i className="fas fa-minus"></i> Subtract Funds
          </button> */}
          <button>Submit</button>
          <p className="error-text" role="alert"></p>
        </form>

        <div className="transTable">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Transaction</th>
                <th>Amount</th>
                <th>Balance</th>
                <th></th>
              </tr>
            </thead>
            <tbody id="tbody"></tbody>
          </table>
        </div>

        <div className="transPostDisplay">
          {this.displayTransPosts(this.state.transactions)}
        </div>
      </div>
    );
  }
}
