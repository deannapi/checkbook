import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_TRANSACTION } from "../utils/mutations";
import { QUERY_ME_BASIC, QUERY_TRANSACTIONS } from "../utils/queries";

export default function Checkbook(props) {
  const [formState, setFormState] = useState({
    transactionName: "",
    amount: "",
  });
  const [transactionName, amount, setBody] = useState("");
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

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // add transaction to database
      await addTransaction({
        variables: { transactionName, amount },
      });
      //   setBody("");
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  let transactions = [];

  fetch("/api/transaction")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // save db data on global variable
      transactions = data;

      populateTotal();
      populateTable();
   });

  function populateTotal() {
    // reduce transaction amounts to a single total value
    let total = transactions.reduce((total, t) => {
      return total + parseInt(t.value);
    }, 0);

    let totalEl = document.querySelector("#total");
    totalEl.textContent = total;
  }

  function populateTable() {
    let tbody = document.querySelector("#tbody");
    tbody.innerHTML = "";

    transactions.forEach((transaction) => {
      // create and populate a table row
      let tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${transaction.name}</td>
        <td>${transaction.value}</td>
      `;

      tbody.appendChild(tr);
    });
  }

  function sendTransaction(isAdding) {
    let nameEl = document.querySelector("#t-name");
    let amountEl = document.querySelector("#t-amount");
    let errorEl = document.querySelector(".error-text");

    // validate form
    if (nameEl.value === "" || amountEl.value === "") {
      errorEl.textContent = "Missing Information";
      return;
    } else {
      errorEl.textContent = "";
    }

    // create record
    let transaction = {
      name: nameEl.value,
      value: amountEl.value,
      date: new Date().toISOString(),
    };

    // if subtracting funds, convert amount to negative number
    if (!isAdding) {
      transaction.value *= -1;
    }

    // add to beginning of current array of data
    transactions.unshift(transaction);

    // re-run logic to populate ui with new record
    populateTable();
    populateTotal();

    // send to server
    fetch("/api/transaction", {
      method: "POST",
      body: JSON.stringify(transaction),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.errors) {
          errorEl.textContent = "Missing Information";
        } else {
          // clear form
          nameEl.value = "";
          amountEl.value = "";
        }
      })
      .catch((err) => {
        // fetch failed, so save in indexed db
        // saveRecord(transaction);

        // clear form
        nameEl.value = "";
        amountEl.value = "";
      });
  }

  document.querySelector("#add-btn").onclick = function () {
    sendTransaction(true);
  };

  document.querySelector("#sub-btn").onclick = function () {
    sendTransaction(false);
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
          <button id="add-btn" className="btn btn-secondary">
            <i className="fas fa-plus"></i> Add Funds
          </button>
          <button id="sub-btn" className="btn btn-secondary">
            <i className="fas fa-minus"></i> Subtract Funds
          </button>
          <p className="error-text"></p>
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

        <canvas id="myChart"></canvas>
      </div>
    </>
  );
}
