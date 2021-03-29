import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";


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
        <div className="App">
          <header className="App-header">
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}
