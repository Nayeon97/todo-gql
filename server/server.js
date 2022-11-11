import { ApolloServer, gql } from "apollo-server";

let users = [
  {
    id: "1",
    name: "유저1",
  },
  {
    id: "2",
    name: "유저2",
  },
];

const typeDefs = gql`
  type Query {
    user(id: String!): User
    allUsers: [User!]!
  }
  type User {
    id: String!
    name: String!
  }
`;

const resolvers = {
  Query: {
    user(_, { id }) {
      return users.find((user) => user.id === id);
    },
    allUsers() {
      return users;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
