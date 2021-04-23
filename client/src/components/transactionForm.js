import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_TRANSACTION } from "../utils/mutations";
import { QUERY_ME_BASIC, QUERY_TRANSACTIONS } from "../utils/queries";
// import { sendTransaction } from "../utils/functions";

export default function TransactionForm() {
  const [transactionName, amount] = useState("");
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

  let transactionsDB = [];

  function populateTotal() {
    // reduce transaction amounts to a single total value
    let total = transactionsDB.reduce((total, t) => {
      return total + parseInt(t.value);
    }, 0);

    let totalEl = document.querySelector("#total");
    totalEl.textContent = total;
  }

  function populateTable() {
    let tbody = document.querySelector("#tbody");
    tbody.innerHTML = "";

    transactionsDB.forEach((transaction) => {
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
    var nameEl,
      nameElement = document.getElementById("t-name");
    var amountEl,
      amountElement = document.getElementById("t-amount");
    var errorEl = document.getElementsByClassName("form error-text");

    // validate form
    // if (nameEl === "" || amountEl === "") {
    //   errorEl.textContent = "Missing Information";
    //   return;
    // } else {
    //   errorEl.textContent = "";
    // }

    if (nameElement != null) {
      nameEl = nameElement.value;
    } else {
      nameEl = null;
    }

    if (amountElement != null) {
      nameEl = amountElement.value;
    } else {
      amountEl = null;
    }

    // console.log("transaction: ", nameEl, "amount: $", amountEl);

    // create record
    let transactionDB = {
      name: nameEl,
      value: amountEl,
      date: new Date().toISOString(),
    };

    console.log("transaction: ", transactionDB);

    // if subtracting funds, convert amount to negative number
    if (!isAdding) {
      transactionDB.value *= -1;
    }

    // add to beginning of current array of data
    transactionsDB.unshift(transactionDB);

    // re-run logic to populate ui with new record
    populateTable();
    populateTotal();

    // send to server
    fetch("/api/checkbook", {
      method: "POST",
      body: JSON.stringify(transactionDB),
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
        // clear form
        nameEl.value = "";
        amountEl.value = "";
        console.log(err);
      });
  }

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
          {/* <input type="button" onClick={sendTransaction(true)} value="Add Funds" id="add-btn"   /> */}
          <button id="add-btn" className="btn" onClick={sendTransaction(true)}>
            <i className="fas fa-plus"></i> Add Funds
          </button>
          <button id="sub-btn" className="btn" onClick={sendTransaction(false)}>
            <i className="fas fa-minus"></i> Subtract Funds
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
