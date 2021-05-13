import React from "react";
import Auth from "../utils/Auth";
// import Checkbook from "../pages/checkbook";

// THIS HOME DEPENDS IF A USER IS LOGGEDIN
export default function Home() {
  const total = document.getElementById('total');

  function showNav() {
    if (Auth.loggedIn()) {
      return (
        <>
          <div className="dashboard">
            <h3>Dashboard</h3>
            <div className="total">
              <div className="total">
                Your current balance is: $<span id="total" >{total}</span>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="home">
            <h1>insert image here</h1>
          </div>
        </>
      );
    }
  }

  return <>{showNav()} </>;
}
