import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Sticky, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Auth from "../utils/Auth";
// import { AUTH_TOKEN } from "../constants";

export default function Header() {
  //   state = {};

  //   logout = (event) => {
  //     event.preventDefault();
  //     Auth.logout;
  //   };

  function showNav() {
    if (Auth.loggedIn()) {
      return (
        <Sticky>
          <Menu>
            <Menu.Item header>
              <Link to="/">Home</Link>
              <Link to="/checkbook">Checkbook</Link>
              <Link to="/" onClick={this.logout}>
                Logout
              </Link>
            </Menu.Item>
          </Menu>
        </Sticky>
      );
    }
  }

  return <>{showNav()}</>;
}
