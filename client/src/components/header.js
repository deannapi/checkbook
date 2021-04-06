import React from "react";
import { render } from "react-dom";
import { Link } from "react-router-dom";
import Auth from "../utils/Auth";

export default class Header extends React.Component {
  render() {
    const logout = (event) => {
      event.preventDefault();
      Auth.logout();
    };
    return (
      <>
        <header>
          Checkbook
          <p>Track your balance and spending before transactions draft</p>
          <nav>
            {Auth.loggedIn() ? (
              <>
                <Link to="/checkbook">View Checkbook</Link>
                <a href="/" onClick={logout}>
                  Logout
                </a>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">SignUp</Link>
              </>
            )}
          </nav>
        </header>
      </>
    );
  }
}
