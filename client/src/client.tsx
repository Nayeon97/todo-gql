import { ApolloClient, InMemoryCache } from "@apollo/client";
import {
  offsetLimitPagination,
  relayStylePagination,
} from "@apollo/client/utilities";

const client = new ApolloClient({
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
            ...offsetLimitPagination(["id", "search", "orderBy"]),
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
