import { ApolloServer, gql } from 'apollo-server';

let todos = [
  {
    id: '1',
    text: '청소하기',
    completed: false,
  },
  {
    id: '2',
    text: '밥먹기',
    completed: true,
  },
  {
    id: '3',
    text: '......?',
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
    allTodos: [Todo]!
    todo(id: String!): Todo
  }
  type Mutation {
    createTodo(text: String!): Todo
    updateTodo(id: String!, completed: Boolean!): Todo
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
        completed: false,
      };
      todos.push(newTodo);
      return newTodo;
    },

    updateTodo: (_, { id, completed }) => {
      let updateTodo = todos.forEach((todo) => {
        if (todo.id === id) {
          todo.completed = !completed;
        }
      });
      return updateTodo;
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
