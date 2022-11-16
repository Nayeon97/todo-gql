import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
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
  editTodo?: Maybe<Todo>;
  removeTodo?: Maybe<Todo>;
  toggleTodo?: Maybe<Todo>;
};


export type MutationCreateTodoArgs = {
  text: Scalars['String'];
};


export type MutationEditTodoArgs = {
  id: Scalars['String'];
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

export type NewTodoFragment = { __typename?: 'Todo', id: string, text: string, completed: boolean };

export type DeleteTodo_TodoFragment = { __typename?: 'Todo', id: string };

export type EditTodoMutationVariables = Exact<{
  id: Scalars['String'];
  text: Scalars['String'];
}>;


export type EditTodoMutation = { __typename?: 'Mutation', editTodo?: { __typename?: 'Todo', id: string, text: string } | null };

export type ToggleCompleteTodo_TodoFragment = { __typename?: 'Todo', id: string, completed: boolean };

export type TodoItem_TodoFragment = { __typename?: 'Todo', id: string, text: string, completed: boolean };

export const NewTodoFragmentDoc = gql`
    fragment NewTodo on Todo {
  id
  text
  completed
}
    `;
export const DeleteTodo_TodoFragmentDoc = gql`
    fragment DeleteTodo_Todo on Todo {
  id
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
export const EditTodoDocument = gql`
    mutation editTodo($id: String!, $text: String!) {
  editTodo(id: $id, text: $text) {
    id
    text
  }
}
    `;
export type EditTodoMutationFn = Apollo.MutationFunction<EditTodoMutation, EditTodoMutationVariables>;

/**
 * __useEditTodoMutation__
 *
 * To run a mutation, you first call `useEditTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editTodoMutation, { data, loading, error }] = useEditTodoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useEditTodoMutation(baseOptions?: Apollo.MutationHookOptions<EditTodoMutation, EditTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditTodoMutation, EditTodoMutationVariables>(EditTodoDocument, options);
      }
export type EditTodoMutationHookResult = ReturnType<typeof useEditTodoMutation>;
export type EditTodoMutationResult = Apollo.MutationResult<EditTodoMutation>;
export type EditTodoMutationOptions = Apollo.BaseMutationOptions<EditTodoMutation, EditTodoMutationVariables>;