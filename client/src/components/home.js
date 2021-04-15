import React from "react";
import Auth from "../utils/Auth";
import { Link } from "react-router-dom";

// THIS HOME DEPENDS IF A USER IS LOGGEDIN
export default function Home() {
  function showNav() {
    if (Auth.loggedIn()) {
      return (
        <>
          <div className="dashboard">
            <h3>Dashboard</h3>
            <p>insert snippet here of balance</p>
            {/* <Link to="/" onClick={() => Auth.logout()}>
              <button>Logout</button>
            </Link>
            <Link to="/checkbook">
              <button>View My Checkbook</button>
            </Link> */}
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="home">
            <Link to="/login">
              <button className="btn btn-primary" color="yellow">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="btn btn-primary " color="yellow">
                SignUp
              </button>
            </Link>
            {/* <img src={} alt="" /> */}
            <h1>insert image here</h1>
          </div>
        </>
      );
    }
  }

  return <>{showNav()} </>;
}