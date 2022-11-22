import { ApolloClient, InMemoryCache } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          offsetTodos: offsetLimitPagination(["userId", "offset", "limit"]),
        },
      },
    },
  }),
});

export default client;
