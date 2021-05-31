import React from "react";
import TransactionForm from "./transactionForm";

export default class transactionTable extends React.Component {
  render() {
      return (
        <div className="transactions" id="Table">
          <table id="transTable">
            <thead>
              <tr>
                {/* <th>Date</th> */}
                <th>Transaction</th>
                <th>Amount</th>
                <th></th>
              </tr>
              {/* {TransactionForm} */}
            </thead>
            <tbody id="tbody"></tbody>
          </table>
        </div>
      );
    }
  }