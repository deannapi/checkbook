  // CHECKBOOK JS
// import { saveRecord } from './idb';

  let transactions = [];

  fetch("/api/checkbook")
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
    const nameEl = document.getElementById("t-name").value;
    const amountEl = document.getElementById("t-amount").value;
    const errorEl = document.getElementsByClassName("form error-text");

    // validate form
    if (nameEl === "" || amountEl === "") {
        errorEl.textContent = "Missing Information";
        return;
      } else {
        errorEl.textContent = "";
      }

    console.log("transaction: ", nameEl, "amount: $", amountEl);

    // create record
    let transaction = {
      name: nameEl,
      value: amountEl,
      date: new Date().toISOString(),
    };

    console.log("transaction: ", transaction);

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
    fetch("/api/checkbook", {
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
        // save in indexDB
        // saveRecord(transaction);
        // clear form
        nameEl.value = "";
        amountEl.value = "";
        console.log(err);
      });
  }

  document.querySelector("#add-btn").addEventListener("click", function(event) {
    event.preventDefault();
    sendTransaction(true);
  });
  
  document.querySelector("#sub-btn").addEventListener("click", function(event) {
    event.preventDefault();
    sendTransaction(false);
  });
  
  document.querySelector("#del-btn").addEventListener("click", function(event) {
    event.preventDefault();
    deletePending();
  });

  // module.exports = { sendTransaction };
export default sendTransaction;