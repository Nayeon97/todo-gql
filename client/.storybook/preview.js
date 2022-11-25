import React, { useMemo } from "react";
import GlobalStyle from "../src/style/index";
import { ApolloProvider } from "@apollo/client";
import client from "../../client/src/client";

export const decorators = [
  (Story) => (
    <>
      <ApolloProvider client={client}>
        <GlobalStyle />
        <Story />
      </ApolloProvider>
    </>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  a11y: {
    element: "#root",
    manual: false,
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
