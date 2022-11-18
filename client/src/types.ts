export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: "Mutation";
  createTodo?: Maybe<Todo>;
  removeTodo?: Maybe<Todo>;
  toggleTodo?: Maybe<Todo>;
};

export type MutationCreateTodoArgs = {
  text: Scalars["String"];
};

export type MutationRemoveTodoArgs = {
  id: Scalars["String"];
};

export type MutationToggleTodoArgs = {
  completed: Scalars["Boolean"];
  id: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  allTodos: Array<Todo>;
  todo?: Maybe<Todo>;
};

export type QueryTodoArgs = {
  id: Scalars["String"];
};

export type Todo = {
  __typename?: "Todo";
  completed: Scalars["Boolean"];
  id: Scalars["String"];
  text: Scalars["String"];
};

export type GetTodosQueryVariables = Exact<{ [key: string]: never }>;

export type GetTodosQuery = {
  __typename?: "Query";
  allTodos: Array<{
    __typename?: "Todo";
    id: string;
    text: string;
    completed: boolean;
  }>;
};

export type RemoveTodoMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type RemoveTodoMutation = {
  __typename?: "Mutation";
  removeTodo?: { __typename?: "Todo"; id: string } | null;
};

export type CreateTodoMutationVariables = Exact<{
  text: Scalars["String"];
}>;

export type CreateTodoMutation = {
  __typename?: "Mutation";
  createTodo?: {
    __typename?: "Todo";
    id: string;
    text: string;
    completed: boolean;
  } | null;
};

export type NewTodoFragment = {
  __typename?: "Todo";
  id: string;
  text: string;
  completed: boolean;
};

export type ToggleTodoMutationVariables = Exact<{
  id: Scalars["String"];
  completed: Scalars["Boolean"];
}>;

export type ToggleTodoMutation = {
  __typename?: "Mutation";
  toggleTodo?: { __typename?: "Todo"; id: string; completed: boolean } | null;
};
