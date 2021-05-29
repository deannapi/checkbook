import React from "react";
import { useQuery } from "@apollo/react-hooks";
import TransactionForm from "../components/transactionForm";
import { QUERY_TRANSACTIONS } from "../utils/queries";
import Auth from "../utils/Auth";

export default function Checkbook() {
  const { loading, data } = useQuery(QUERY_TRANSACTIONS);
  // const { data: userData } = useQuery(QUERY_ME_BASIC);
  const transactions = data?.transactions || [];
  const loggedIn = Auth.loggedIn();

  return (
    <div>
      {loggedIn && (
        <div>
          {loading ? (
            <div
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontVariant: "all-small-caps",
                fontSize: "24px",
              }}
            >
              Loading...
            </div>
          ) : (
            <TransactionForm transactions={transactions}/>
          )}
        </div>
        // {loggedIn && userData ? (
        //   <div><TransactionForm username={userData}/>
        //   </div>
        // )}
      )}
    </div>
  );
}
