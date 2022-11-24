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
          user: {
            keyArgs: ["userId"],
          },
        },
      },
      User: {
        fields: {
          offsetTodos: {
            ...offsetLimitPagination(),
          },
          cursorTodos: relayStylePagination(),
          read(existing, { args }) {
            console.log(existing);
            console.log(args);
          },
        },
      },
    },
  }),
});

export default client;
