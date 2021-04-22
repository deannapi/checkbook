import React from "react";
import { useQuery } from "@apollo/react-hooks";
import TransactionForm from "../components/transactionForm";
import { QUERY_TRANSACTIONS, QUERY_ME_BASIC } from '../utils/queries';
import Auth from '../utils/Auth';

export default function Checkbook() {
  const { loading, data } = useQuery(QUERY_TRANSACTIONS);
  const { data: userData }= useQuery(QUERY_ME_BASIC);
  const transactions = data?.transactions || [];
  console.log(transactions);
  const loggedIn = Auth.log();

  return (
    <div>
      {loggedIn && (
        <div>
          <TransactionForm />
        </div>
      )}
    </div>
  )
}
