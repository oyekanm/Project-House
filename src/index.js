import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import "./assets/css/index.css";
import "./assets/css/media.css";

const client = new ApolloClient({
  uri:`${process.env.REACT_APP_SERVER}/graphql`,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
  <App />
</ApolloProvider>,
);
