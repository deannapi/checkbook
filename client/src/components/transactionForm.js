import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_TRANSACTION } from "../utils/mutations";
import { QUERY_ME_BASIC, QUERY_TRANSACTIONS } from "../utils/queries";
var $ = require("jquery");

export default function TransactionForm() {
  const [transactionName, transactionAmount, username] = useState("");
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
        variables: { transactionName, transactionAmount, username },
      });

      //   clear form
      transactionName("");
      transactionAmount("");
    } catch (e) {
      console.error(e);
    }
  };

  // function addingTransactions() {
  $(() => {
    $("#add-btn").on("click", function () {
      var transName = $("#t-name").val();
      var transAmount = $("#t-amount").val();
      
      var markup =
        "<tr> <td>" +
        transName +
        "</td><td>" +
        transAmount +
        "</td><td><input type='checkbox' name='record'></td></tr>";

      $("table tbody").append(markup);

      // update the current balance
      $("#total").val(transAmount);
    });
  });

  // function subtractTransactions() {
  $(() => {
    $("#sub-btn").on("click", function () {
      var transName2 = $("#t-name").val();
      var transAmount2 = $("#t-amount").val() * -1;
      $("#total").val(transAmount2);

      var markup2 =
        "<tr> <td>" +
        transName2 +
        "</td><td>" +
        transAmount2 +
        "</td><td><input type='checkbox' name='record'></td></tr>";

      $("table tbody").append(markup2);
    });
  });
  // )

  $(() => {
    $("#del-btn").on("click", function () {
      $("table tbody")
        .find('input[name="record"]')
        .each(function () {
          if ($(this).is(":checked")) {
            $(this).parents("tr").remove();
          }
        });
    });
  });

  return (
    <>
      <div className="checkbook">
        <div className="total">
          Your total is: $<span id="total"></span>
        </div>

        <form onSubmit={handleFormSubmit}>
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
                <th>Transaction</th>
                <th>Amount</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody id="tbody"></tbody>
          </table>
          <button type="button" id="del-btn">
            Delete Transaction
          </button>
        </div>
      </div>
    </>
  );
}
