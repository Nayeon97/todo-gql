import { ApolloServer, gql } from "apollo-server";

let todos = [
  {
    id: "1",
    text: "청소하기",
    completed: false,
  },
  {
    id: "2",
    text: "밥먹기",
    completed: true,
  },
  {
    id: "3",
    text: "......?",
    completed: false,
  },
];

const typeDefs = gql`
  type Todo {
    id: String!
    text: String!
    completed: Boolean!
  }

  type Query {
    allTodos: [Todo!]!
    todo(id: String!): Todo
  }

  type Mutation {
    createTodo(text: String!): Todo
    toggleTodo(id: String!, completed: Boolean!): Todo
    removeTodo(id: String!): Todo
    editTodo(id: String!, text: String!): Todo
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
        completed: false,
      };
      todos.push(newTodo);
      return newTodo;
    },
    toggleTodo: (_, { id, completed }) => {
      let index = todos.findIndex((todo) => id === todo.id);
      todos[index].completed = !completed;
      return todos[index];
    },
    removeTodo: (_, { id }) => {
      todos = todos.filter((todo) => todo.id !== id);
    },
    editTodo: (_, { id, text }) => {
      let index = todos.findIndex((todo) => id === todo.id);
      todos[index].text = text;
      return todos[index];
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
