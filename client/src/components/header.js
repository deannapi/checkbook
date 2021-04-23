import React from "react";
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
        <header className="jumbotron">
          <div className="jumbotron-fluid">
            <h1 className="display-4">Checkbook</h1>
            <p className="lead">
              Track your balance and spending before transactions draft
            </p>
          </div>

          <nav>
            {Auth.loggedIn() ? (
              <>
                <Link to="/">Home</Link>
                <Link to="/checkbook">View Checkbook</Link>
                <Link to="/" onClick={logout}>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="btn btn-primary ">Login</button>
                </Link>
                <Link to="/signup">
                  <button className="btn btn-primary">SignUp</button>
                </Link>
              </>
            )}
          </nav>
        </header>
      </>
    );
  }
}
