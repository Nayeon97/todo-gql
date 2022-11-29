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
          allUsers: { keyArgs: ["userId"] },
          user: {
            keyArgs: ["userId"],
          },
        },
      },
      User: {
        fields: {
          offsetTodos: {
            ...offsetLimitPagination(["search"]),
          },
          cursorTodos: relayStylePagination(["search", "orderBy"]),
        },
      },
    },
  }),
});

export default client;
