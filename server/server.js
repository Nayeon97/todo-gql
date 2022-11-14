import { ApolloServer, gql } from "apollo-server";

let todos = [
  {
    id: "1",
    text: "청소하기",
    toggleComplete: false,
  },
  {
    id: "2",
    text: "밥먹기",
    toggleComplete: true,
  },
  {
    id: "3",
    text: "......?",
    toggleComplete: false,
  },
];

const typeDefs = gql`
  type Todo {
    id: String!
    text: String!
    toggleComplete: Boolean!
  }
  type Query {
    allTodos: [Todo]!
    todo(id: String!): Todo
  }
  type Mutation {
    createTodo(text: String!): Todo
    updateTodo(id: String!, toggleComplete: Boolean!): Todo
    removeTodo(id: String!): Todo
  }
`;

const resolvers = {
  Query: {
    allTodos: () => {
      return todos;
    },
    todo: (_, { id }) => {
      return todos.find((todo) => todo.id === id);
    },
  },
  Mutation: {
    createTodo: (_, { text }) => {
      let createId = String(todos.length + 1);
      const newTodo = {
        id: createId,
        text: text,
        toggleComplete: false,
      };
      todos.push(newTodo);
      return newTodo;
    },
    updateTodo: (_, { id, toggleComplete }) => {
      let index = todos.findIndex((todo) => id === todo.id);
      todos[index].toggleComplete = !toggleComplete;
      return todos[index];
    },
    removeTodo: (_, { id }) => {
      todos = todos.filter((todo) => todo.id !== id);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
