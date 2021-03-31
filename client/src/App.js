import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from './components/header';
import Login from './pages/login';
import Home from './components/home';

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "http://localhost:3000/graphql",
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Header />
        <div className="">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
          </Switch>

        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}
