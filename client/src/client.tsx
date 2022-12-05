import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import {
  offsetLimitPagination,
  relayStylePagination,
} from "@apollo/client/utilities";
const httpLink = new HttpLink({ uri: "http://localhost:4000/" });

const client = new ApolloClient({
  link: from([
    // errorLink,
    httpLink,
  ]),
  uri: "http://localhost:4000/",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          user: { keyArgs: ["id"] },
        },
      },
      User: {
        fields: {
          offsetTodos: {
            ...offsetLimitPagination([
              "id",
              "search",
              "orderBy",
              ["text", "completed"],
            ]),
          },
          cursorTodos: relayStylePagination([
            "id",
            "search",
            "orderBy",
            ["text", "completed"],
          ]),
        },
      },
    },
  }),
});

export default client;
