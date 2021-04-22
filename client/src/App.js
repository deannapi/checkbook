import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from './components/header';
import Login from './pages/login';
import Home from './components/home';
import Signup from './pages/signup';
import Footer from './components/footer';
import Checkbook from './pages/checkbook';

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/checkbook" component={Checkbook} />
          </Switch>
          <Footer />
      </BrowserRouter>
    </ApolloProvider>
  );
}
