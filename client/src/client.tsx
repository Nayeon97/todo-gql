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
          user: { keyArgs: ["userId"] },
        },
      },
      User: {
        fields: {
          offsetTodos: {
            ...offsetLimitPagination(["userId", "search", "orderBy"]),
          },
          cursorTodos: relayStylePagination(["userId", "search", "orderBy"]),
        },
      },
    },
  }),
});

export default client;
