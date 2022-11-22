import { ApolloServer, gql } from "apollo-server";
import _ from "lodash";

let todos = [
  {
    id: "user1todo:12",
    text: "청소하기",
    completed: false,
    userId: "user1",
  },
  {
    id: "user1todo:23",
    text: "밥먹기",
    completed: true,
    userId: "user1",
  },
  {
    id: "user1todo:34",
    text: "......?",
    completed: false,
    userId: "user1",
  },
  ..._.times(200, (index) => ({
    id: `todo:${index}`,
    text: `${index}번째 할일`,
    completed: false,
    userId: "user2",
  })),
];

let users = [
  { id: "user1" },
  { id: "user2" },
  { id: "user3" },
  { id: "user4" },
  { id: "user5" },
  { id: "user6" },
  { id: "user7" },
  { id: "user8" },
  { id: "user9" },
  { id: "user10" },
];

const typeDefs = gql`
  type Todo {
    id: ID!
    text: String!
    completed: Boolean!
  }
  type TodoEdge {
    node: Todo!
    cursor: String!
  }
  type PageInfo {
    hasNextPage: Boolean!
  }
  type TodoConnection {
    edges: [TodoEdge!]!
    pageInfo: PageInfo!
  }
  type User {
    id: ID!
    totalTodoCount: Int!
    offsetTodos(offset: Int, limit: Int): [Todo!]!
    cursorTodos(first: Int, after: String): TodoConnection!
  }
  type Query {
    allUsers: [User!]!
    user(id: ID!): User!
    allTodos: [Todo!]!
    todo(id: ID!): Todo!
  }
  type Mutation {
    createTodo(text: String!, userId: ID!): Todo!
    toggleTodo(id: String!, completed: Boolean!): Todo!
    removeTodo(id: String!): Todo!
    editTodo(id: String!, text: String!): Todo!
  }
`;

function cursorToId(id) {
  return Buffer.from(id, "base64").toString();
}

function idToCursor(id) {
  return Buffer.from(id).toString("base64");
}

const sleep = (sec) => {
  return new Promise((resolve) => setTimeout(() => resolve(), sec));
};

const resolvers = {
  User: {
    totalTodoCount: async (user) => {
      await sleep(1000);
      return todos.filter((todo) => todo.userId === user.id).length;
    },
    offsetTodos: async (user, args) => {
      await sleep(1000);
      const offset = args.offset || 0;
      const limit = args.limit || 50;

      const userTodos = todos.filter((todo) => todo.userId === user.id);

      return userTodos.slice(offset, offset + limit);
    },
    cursorTodos: async (user, args) => {
      await sleep(1000);
      const userTodos = todos.filter((todo) => todo.userId === user.id);

      const first = args.first || 10;
      const after = args.after;

      if (!after) {
        return {
          edges: userTodos.slice(0, first).map((todo) => ({
            node: todo,
            cursor: idToCursor(todo.id),
          })),
          pageInfo: {
            hasNextPage: userTodos.length > first,
          },
        };
      }

      const userId = cursorToId(after);

      const offset = userTodos.findIndex((todo) => todo.id === userId) + 1;

      return {
        edges: userTodos.slice(offset, offset + first).map((todo) => ({
          node: todo,
          cursor: idToCursor(todo.id),
        })),
        pageInfo: {
          hasNextPage: userTodos.length > offset + first,
        },
      };
    },
  },
  Query: {
    allTodos: async () => {
      await sleep(1000);
      return todos;
    },
    allUsers: async () => {
      await sleep(1000);
      return users;
    },
    todo: async (_, { id }) => {
      await sleep(1000);
      return todos.find((todo) => todo.id === id);
    },
    user: async (_, { id }) => {
      await sleep(1000);
      return users.find((user) => user.id === id);
    },
  },
  Mutation: {
    createTodo: async (_, { text, userId }) => {
      await sleep(1000);
      let createId = String(+new Date());
      const newTodo = {
        id: createId,
        text: text,
        completed: false,
        userId,
      };
      todos.push(newTodo);
      return newTodo;
    },
    toggleTodo: async (_, { id, completed }) => {
      await sleep(1000);
      let index = todos.findIndex((todo) => id === todo.id);
      todos[index].completed = !completed;
      return todos[index];
    },
    removeTodo: async (_, { id }) => {
      await sleep(1000);
      let index = todos.findIndex((todo) => todo.id === id);
      return todos[index];
    },
    editTodo: async (_, { id, text }) => {
      await sleep(1000);
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
