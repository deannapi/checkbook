  // CHECKBOOK JS
// import { saveRecord } from './idb';

let transactionsDB = [];

function populateTotal() {
  // reduce transaction amounts to a single total value
  let total = transactionsDB.reduce((total, t) => {
    return total + parseInt(t.value);
  }, 0);

  let totalEl = document.querySelector("#total");
  totalEl.textContent = total;
};

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
};

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
    };

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
  };

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

  // document
  //   .querySelector("#add-btn")
  //   .addEventListener("click", function (event) {
  //     event.preventDefault();
  //     sendTransaction(true);
  //   });

  // document
  //   .querySelector("#sub-btn")
  //   .addEventListener("click", function (event) {
  //     event.preventDefault();
  //     sendTransaction(false);
  //   });

  module.exports = { sendTransaction };