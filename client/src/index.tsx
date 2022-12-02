import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import client from "./client";
import GlobalStyle from "./style";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ApolloProvider client={client}>
    <App />
    <GlobalStyle />
  </ApolloProvider>
);
