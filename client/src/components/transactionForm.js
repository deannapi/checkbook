import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_TRANSACTION } from "../utils/mutations";
import { QUERY_ME_BASIC, QUERY_TRANSACTIONS } from "../utils/queries";
import { deletePending } from "../utils/idb";

export default function TransactionForm() {
  const [transactionName, amount] = useState("");
  //  const [transactionCount, setTransactionCount] =  useState(0);
  const [formState, setFormState] = useState({
    transactionName: "",
    amount: "",
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // add transaction to database
      await addTransaction({
        variables: { transactionName, amount },
      });

      //   clear form
      transactionName("");
      amount("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="checkbook">
        <div className="total">
          <div className="total">
            Your total is: $<span id="total">0</span>
          </div>
        </div>

        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            className="form-control"
            id="t-name"
            name="transactionName"
            placeholder="Name of transaction"
            value={formState.transactionName}
            onChange={handleChange}
          />
          <input
            type="number"
            step=".01"
            name="amount"
            min="0"
            className="form-control"
            id="t-amount"
            placeholder="Transaction amount"
            value={formState.amount}
            onChange={handleChange}
          />
          <button id="add-btn" className="btn">
            <i className="fas fa-plus"></i> Add Funds
          </button>
          <button id="sub-btn" className="btn">
            <i className="fas fa-minus"></i> Subtract Funds
          </button>
          <button id="del-btn" className="btn" onClick={deletePending}>
            <i className="fas fa-trash-alt"></i>Delete Pending Records
          </button>
          <p className="error-text" role="alert"></p>
        </form>

        <div className="transactions">
          <table>
            <thead>
              <tr>
                <th>Transaction</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody id="tbody"></tbody>
          </table>
        </div>
      </div>
    </>
  );
}
