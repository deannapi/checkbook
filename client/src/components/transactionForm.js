import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_TRANSACTION } from "../utils/mutations";
import { QUERY_ME_BASIC, QUERY_TRANSACTIONS } from "../utils/queries";
// var $ = require("jquery");

export default function TransactionForm() {
  // constructor() {
  //   super();

  //   this.state = {
  //     transactionName: "",
  //     transactionAmount: "",
  //     items: [],
  //   };
  // }

  const [transactionName, transactionAmount] = useState("");
  const [formState, setFormState] = useState({
    transactionName: "",
    transactionAmount: "",
  });

  const [addTransaction] = useMutation(ADD_TRANSACTION, {
    update(cache, { data: { addTransaction } }) {
      try {
        const { transactions } = cache.readQuery({
          query: QUERY_TRANSACTIONS,
          variables: {
            id: addTransaction._id,
          },
        });
        cache.writeQuery({
          query: QUERY_TRANSACTIONS,
          data: { transactions: [addTransaction, ...transactions] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache, appending new transaction to the end of the array
      const { me } = cache.readQuery({ query: QUERY_ME_BASIC });
      cache.writeQuery({
        query: QUERY_ME_BASIC,
        data: {
          me: { ...me, transactions: [...me.transactions, addTransaction] },
        },
      });
    },
  });

  const handleChange = (e) => {
    let input = e.target;
    let name = e.target.name;
    let value = input.value;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    let items = [...formState.items];

    items.push({
      transactionName: this.formState.transactionName,
      transactionAmount: this.formState.transactionAmount,
    });

    this.setState({
      items,
      transactionName: "",
      transactionAmount: "",
    });

    try {
      // add transaction to database
      await addTransaction({
        variables: { transactionName, transactionAmount },
      });
    } catch (e) {
      console.error(e);
    }
  };

    return (
      <>
        <div className="checkbook">
          <div className="total">
            Your total is: $<p id="total">0</p>
          </div>

          <form
            onSubmit={handleFormSubmit}
            handleChange={handleChange}
          >
            <input
              type="text"
              className="form-control"
              id="t-name"
              name="transactionName"
              placeholder="Name of transaction"
              onChange={handleChange}
            />
            <input
              type="number"
              step=".01"
              name="transactionAmount"
              min="0"
              className="form-control"
              id="t-amount"
              placeholder="Transaction amount"
              onChange={handleChange}
            />
            <button id="add-btn" className="btn">
              <i className="fas fa-plus"></i> Add Funds
            </button>
            <button id="sub-btn" className="btn">
              <i className="fas fa-minus"></i> Subtract Funds
            </button>
            <p className="error-text" role="alert"></p>
          </form>

          <div className="transactions">
            <table id="transTable">
              <thead>
                <tr>
                  {/* <th>Date</th> */}
                  <th>Transaction</th>
                  <th>Amount</th>
                  <th></th>
                </tr>
              </thead>
              <tbody id="tbody"></tbody>
            </table>
          </div>
        </div>
      </>
    );
}
