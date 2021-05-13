// CHECKBOOK JS
import { useEffect } from "react";

let transactionsDB = [];

// useEffect(() => {
  const populateTotal = () => {
    // reduce transaction amounts to a single total value
    var total = transactionsDB.reduce((total, t) => {
      return total + parseInt(t.value);
    }, 0);

    // document.getElementById('total').innerText = total;
    let totalEl = document.getElementById("total");
    if (totalEl) {
      totalEl.innerText = total;
    }
    // totalEl.innerText = total;
  };

  const populateTable = () => {
    var tbody = document.createElement("tbody");
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
  };

  const sendTransaction = (isAdding) => {
    var nameEl = document.getElementById("t-name");
    var amountEl = document.getElementById("t-amount");
    var errorEl = document.getElementsByClassName("form error-text");

    // validate form
    if (nameEl === "" || amountEl === "") {
      errorEl.textContent = "Missing Information";
      return;
    } else {
      errorEl.textContent = "";
    }

    // if (nameEl || amountEl) {
    //   errorEl.innerText = "Missing information";
    // } else {
    //   errorEl.innerText = "";
    // }

    // create record
    let transactionDB = {
      name: nameEl.value,
      value: amountEl.value,
      date: new Date().toISOString(),
    };

    // console.log("transaction: ", transactionDB);

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
  };
// });

module.exports = { sendTransaction };
