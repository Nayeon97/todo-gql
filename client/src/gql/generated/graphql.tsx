import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo?: Maybe<Todo>;
  removeTodo?: Maybe<Todo>;
  toggleTodo?: Maybe<Todo>;
};


export type MutationCreateTodoArgs = {
  text: Scalars['String'];
};


export type MutationRemoveTodoArgs = {
  id: Scalars['String'];
};


export type MutationToggleTodoArgs = {
  completed: Scalars['Boolean'];
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allTodos: Array<Todo>;
  todo?: Maybe<Todo>;
};


export type QueryTodoArgs = {
  id: Scalars['String'];
};

export type Todo = {
  __typename?: 'Todo';
  completed: Scalars['Boolean'];
  id: Scalars['String'];
  text: Scalars['String'];
};

export type DeleteTodo_TodoFragment = { __typename?: 'Todo', id: string };

export type NewTodoFragment = { __typename?: 'Todo', id: string, text: string, completed: boolean };

export type TodoFragmentFragment = { __typename?: 'Todo', id: string, text: string, completed: boolean };

export type ToggleCompleteTodo_TodoFragment = { __typename?: 'Todo', id: string, completed: boolean };

export type TodoItem_TodoFragment = { __typename?: 'Todo', id: string, text: string, completed: boolean };

export const DeleteTodo_TodoFragmentDoc = gql`
    fragment DeleteTodo_Todo on Todo {
  id
}
    `;
export const NewTodoFragmentDoc = gql`
    fragment NewTodo on Todo {
  id
  text
  completed
}
    `;
export const TodoFragmentFragmentDoc = gql`
    fragment TodoFragment on Todo {
  id
  text
  completed
}
    `;
export const ToggleCompleteTodo_TodoFragmentDoc = gql`
    fragment ToggleCompleteTodo_Todo on Todo {
  id
  completed
}
    `;
export const TodoItem_TodoFragmentDoc = gql`
    fragment TodoItem_Todo on Todo {
  id
  text
  completed
}
    `;