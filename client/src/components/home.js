import React from "react";
import "semantic-ui-css/semantic.min.css";
import Auth from "../utils/Auth";

import { Container, Button, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function Home() {
  function showNav() {
    if (Auth.loggedIn()) {
      return (
        <>
          <body>
            <Container>
              <Link to="/" onClick={() => Auth.logout()}>
                <Button>Logout</Button>
              </Link>
            </Container>
          </body>
        </>
      );
    } else {
      return (
        <>
          <body>
            <Header>Checkbook</Header>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          </body>
        </>
      );
    }
  }

  return <>{showNav()} </>;
}
