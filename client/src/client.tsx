import { ApolloClient, InMemoryCache } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        fields: {
          offsetTodos: offsetLimitPagination(),
        },
      },
      Query: {
        fields: {
          user: {
            keyArgs: ["userId"],
          },
        },
      },
    },
  }),
});

export default client;
