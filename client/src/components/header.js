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
            <p className="lead">Track your balance and spending before transactions draft</p>
            <Link to="/">Home</Link>
          </div>

          <nav>
            {Auth.loggedIn() ? (
              <>
                <Link to="/checkbook">View Checkbook</Link>
                <a className="btn btn-primary" href="/" role="button" onClick={logout}>
                  Logout
                </a>
              </>
            ) : (
              <>
                {/* <a className="btn btn-primary " href="/login" role="button">Login</a> */}
                {/* <a className="btn btn-primary" href="/signup" role="button">SignUp</a> */}
              </>
            )}
          </nav>
        </header>
      </>
    );
  }
}
