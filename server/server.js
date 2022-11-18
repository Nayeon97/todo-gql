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
    todo(id: String!): Todo!
  }

  type Mutation {
    createTodo(text: String!): Todo!
    toggleTodo(id: String!, completed: Boolean!): Todo!
    removeTodo(id: String!): Todo!
    editTodo(id: String!, text: String!): Todo!
  }
`;

// const sleep = (sec) => {
//   return new Promise((resolve) => setTimeout(() => resolve(), sec));
// };

const resolvers = {
  Query: {
    allTodos: () => {
      // await sleep(2000);
      return todos;
    },
    todo: (_, { id }) => {
      // await sleep(2000);
      return todos.find((todo) => todo.id === id);
    },
  },
  Mutation: {
    createTodo: (_, { text }) => {
      // await sleep(2000);
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
      // await sleep(2000);
      let index = todos.findIndex((todo) => id === todo.id);
      todos[index].completed = !completed;
      return todos[index];
    },
    removeTodo: (_, { id }) => {
      // await sleep(2000);
      todos = todos.filter((todo) => todo.id !== id);
      console.log(todos);
      return todos;
    },
    editTodo: (_, { id, text }) => {
      // await sleep(2000);
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
