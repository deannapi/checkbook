import React, { useMemo, useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import { ADD_TRANSACTION } from '../utils/mutations';

export default function Checkbook(props) {
    const [formState, setFormState] = useState({ transaction: '', amount: ''});
    const [add_transaction, { error }] = useMutation(ADD_TRANSACTION);

    return (
      <>
        <div className="checkbook">
          <div className="total">
            <div className="total">
              Your total is: $<span id="total">0</span>
            </div>
          </div>

          <div className="form">
            <input type="text" id="t-name" placeholder="Name of transaction" />
            <input
              type="number"
              min="0"
              id="t-amount"
              placeholder="Transaction amount"
            />
            <button id="add-btn" className="btn btn-secondary" onClick={TRANSACTIONS}>
              <i className="fas fa-plus"></i> Add Funds
            </button>
            <button id="sub-btn" className="btn btn-secondary" onClick={TRANSACTIONS}>
              <i className="fas fa-minus"></i> Subtract Funds
            </button>
            <p className="error-text"></p>
          </div>

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
