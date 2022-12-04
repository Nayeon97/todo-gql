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

export type CreateTodoPayload = {
  __typename?: 'CreateTodoPayload';
  todoEdge: TodoEdge;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo: CreateTodoPayload;
  editTodo: Todo;
  removeTodo: RemoveTodoPayload;
  toggleTodo: Todo;
};


export type MutationCreateTodoArgs = {
  text: Scalars['String'];
  userId: Scalars['ID'];
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

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  allTodos: Array<Todo>;
  allUsers: Array<User>;
  todo: Todo;
  user: User;
};


export type QueryTodoArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type RemoveTodoPayload = {
  __typename?: 'RemoveTodoPayload';
  deletedTodoId: Scalars['ID'];
};

export enum Sort {
  Asc = 'asc',
  Desc = 'desc'
}

export type Todo = {
  __typename?: 'Todo';
  completed: Scalars['Boolean'];
  id: Scalars['ID'];
  text: Scalars['String'];
};

export type TodoConnection = {
  __typename?: 'TodoConnection';
  edges: Array<TodoEdge>;
  pageInfo: PageInfo;
};

export type TodoEdge = {
  __typename?: 'TodoEdge';
  cursor: Scalars['String'];
  node: Todo;
};

export type TodoOrderByInput = {
  completed?: InputMaybe<Sort>;
  text?: InputMaybe<Sort>;
};

export type User = {
  __typename?: 'User';
  cursorTodos: TodoConnection;
  id: Scalars['ID'];
  offsetTodos: Array<Todo>;
  totalTodoCount: Scalars['Int'];
};


export type UserCursorTodosArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TodoOrderByInput>;
  search?: InputMaybe<Scalars['String']>;
};


export type UserOffsetTodosArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TodoOrderByInput>;
  search?: InputMaybe<Scalars['String']>;
};

export type DeleteTodo_TodoFragment = { __typename?: 'Todo', id: string };

export type EditTodoText_TodoFragment = { __typename?: 'Todo', id: string, text: string };

export type ToggleCompleteTodo_TodoFragment = { __typename?: 'Todo', id: string, completed: boolean };

export type CursorTodoItems_TodoFragment = { __typename?: 'User', id: string, cursorTodos: { __typename?: 'TodoConnection', edges: Array<{ __typename?: 'TodoEdge', cursor: string, node: { __typename?: 'Todo', id: string, text: string, completed: boolean } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean } } };

export type OffsetTodoItems_TodoFragment = { __typename?: 'User', id: string, totalTodoCount: number, offsetTodos: Array<{ __typename?: 'Todo', id: string, text: string, completed: boolean }> };

export type CreateTodoMutationVariables = Exact<{
  text: Scalars['String'];
  userId: Scalars['ID'];
}>;


export type CreateTodoMutation = { __typename?: 'Mutation', createTodo: { __typename?: 'CreateTodoPayload', todoEdge: { __typename?: 'TodoEdge', cursor: string, node: { __typename?: 'Todo', id: string, text: string, completed: boolean } } } };

export type EditTodoMutationVariables = Exact<{
  editTodoId: Scalars['String'];
  editTodoText2: Scalars['String'];
}>;


export type EditTodoMutation = { __typename?: 'Mutation', editTodo: { __typename?: 'Todo', id: string, text: string, completed: boolean } };

export type RemoveTodoMutationVariables = Exact<{
  removeTodoId: Scalars['String'];
}>;


export type RemoveTodoMutation = { __typename?: 'Mutation', removeTodo: { __typename?: 'RemoveTodoPayload', deletedTodoId: string } };

export type ToggleTodoMutationVariables = Exact<{
  toggleTodoId: Scalars['String'];
  completed: Scalars['Boolean'];
}>;


export type ToggleTodoMutation = { __typename?: 'Mutation', toggleTodo: { __typename?: 'Todo', id: string, completed: boolean } };

export type GetCursorTodosQueryVariables = Exact<{
  userId: Scalars['ID'];
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<TodoOrderByInput>;
}>;


export type GetCursorTodosQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, cursorTodos: { __typename?: 'TodoConnection', edges: Array<{ __typename?: 'TodoEdge', cursor: string, node: { __typename?: 'Todo', id: string, text: string, completed: boolean } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean } } } };

export type GetOffsetTodosQueryVariables = Exact<{
  userId: Scalars['ID'];
  offset?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<TodoOrderByInput>;
}>;


export type GetOffsetTodosQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, totalTodoCount: number, offsetTodos: Array<{ __typename?: 'Todo', id: string, text: string, completed: boolean }> } };

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = { __typename?: 'Query', allUsers: Array<{ __typename?: 'User', id: string }> };

export const EditTodoText_TodoFragmentDoc = gql`
    fragment EditTodoText_Todo on Todo {
  id
  text
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
export const CursorTodoItems_TodoFragmentDoc = gql`
    fragment CursorTodoItems_Todo on User {
  id
  cursorTodos {
    edges {
      node {
        id
        text
        completed
        ...EditTodoText_Todo
        ...DeleteTodo_Todo
        ...ToggleCompleteTodo_Todo
      }
      cursor
    }
    pageInfo {
      hasNextPage
    }
  }
}
    ${EditTodoText_TodoFragmentDoc}
${DeleteTodo_TodoFragmentDoc}
${ToggleCompleteTodo_TodoFragmentDoc}`;
export const OffsetTodoItems_TodoFragmentDoc = gql`
    fragment OffsetTodoItems_Todo on User {
  id
  offsetTodos {
    id
    text
    completed
    ...EditTodoText_Todo
    ...DeleteTodo_Todo
    ...ToggleCompleteTodo_Todo
  }
  totalTodoCount
}
    ${EditTodoText_TodoFragmentDoc}
${DeleteTodo_TodoFragmentDoc}
${ToggleCompleteTodo_TodoFragmentDoc}`;
export const CreateTodoDocument = gql`
    mutation CreateTodo($text: String!, $userId: ID!) {
  createTodo(text: $text, userId: $userId) {
    todoEdge {
      node {
        id
        text
        completed
      }
      cursor
    }
  }
}
    `;
export type CreateTodoMutationFn = Apollo.MutationFunction<CreateTodoMutation, CreateTodoMutationVariables>;

/**
 * __useCreateTodoMutation__
 *
 * To run a mutation, you first call `useCreateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTodoMutation, { data, loading, error }] = useCreateTodoMutation({
 *   variables: {
 *      text: // value for 'text'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCreateTodoMutation(baseOptions?: Apollo.MutationHookOptions<CreateTodoMutation, CreateTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTodoMutation, CreateTodoMutationVariables>(CreateTodoDocument, options);
      }
export type CreateTodoMutationHookResult = ReturnType<typeof useCreateTodoMutation>;
export type CreateTodoMutationResult = Apollo.MutationResult<CreateTodoMutation>;
export type CreateTodoMutationOptions = Apollo.BaseMutationOptions<CreateTodoMutation, CreateTodoMutationVariables>;
export const EditTodoDocument = gql`
    mutation EditTodo($editTodoId: String!, $editTodoText2: String!) {
  editTodo(id: $editTodoId, text: $editTodoText2) {
    id
    text
    completed
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
 *      editTodoId: // value for 'editTodoId'
 *      editTodoText2: // value for 'editTodoText2'
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
export const RemoveTodoDocument = gql`
    mutation RemoveTodo($removeTodoId: String!) {
  removeTodo(id: $removeTodoId) {
    deletedTodoId
  }
}
    `;
export type RemoveTodoMutationFn = Apollo.MutationFunction<RemoveTodoMutation, RemoveTodoMutationVariables>;

/**
 * __useRemoveTodoMutation__
 *
 * To run a mutation, you first call `useRemoveTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTodoMutation, { data, loading, error }] = useRemoveTodoMutation({
 *   variables: {
 *      removeTodoId: // value for 'removeTodoId'
 *   },
 * });
 */
export function useRemoveTodoMutation(baseOptions?: Apollo.MutationHookOptions<RemoveTodoMutation, RemoveTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveTodoMutation, RemoveTodoMutationVariables>(RemoveTodoDocument, options);
      }
export type RemoveTodoMutationHookResult = ReturnType<typeof useRemoveTodoMutation>;
export type RemoveTodoMutationResult = Apollo.MutationResult<RemoveTodoMutation>;
export type RemoveTodoMutationOptions = Apollo.BaseMutationOptions<RemoveTodoMutation, RemoveTodoMutationVariables>;
export const ToggleTodoDocument = gql`
    mutation toggleTodo($toggleTodoId: String!, $completed: Boolean!) {
  toggleTodo(id: $toggleTodoId, completed: $completed) {
    id
    completed
  }
}
    `;
export type ToggleTodoMutationFn = Apollo.MutationFunction<ToggleTodoMutation, ToggleTodoMutationVariables>;

/**
 * __useToggleTodoMutation__
 *
 * To run a mutation, you first call `useToggleTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleTodoMutation, { data, loading, error }] = useToggleTodoMutation({
 *   variables: {
 *      toggleTodoId: // value for 'toggleTodoId'
 *      completed: // value for 'completed'
 *   },
 * });
 */
export function useToggleTodoMutation(baseOptions?: Apollo.MutationHookOptions<ToggleTodoMutation, ToggleTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleTodoMutation, ToggleTodoMutationVariables>(ToggleTodoDocument, options);
      }
export type ToggleTodoMutationHookResult = ReturnType<typeof useToggleTodoMutation>;
export type ToggleTodoMutationResult = Apollo.MutationResult<ToggleTodoMutation>;
export type ToggleTodoMutationOptions = Apollo.BaseMutationOptions<ToggleTodoMutation, ToggleTodoMutationVariables>;
export const GetCursorTodosDocument = gql`
    query getCursorTodos($userId: ID!, $first: Int, $after: String, $search: String, $orderBy: TodoOrderByInput) {
  user(id: $userId) {
    id
    cursorTodos(first: $first, after: $after, search: $search, orderBy: $orderBy) {
      edges {
        node {
          id
          text
          completed
        }
        cursor
      }
      pageInfo {
        hasNextPage
      }
    }
  }
}
    `;

/**
 * __useGetCursorTodosQuery__
 *
 * To run a query within a React component, call `useGetCursorTodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCursorTodosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCursorTodosQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      search: // value for 'search'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetCursorTodosQuery(baseOptions: Apollo.QueryHookOptions<GetCursorTodosQuery, GetCursorTodosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCursorTodosQuery, GetCursorTodosQueryVariables>(GetCursorTodosDocument, options);
      }
export function useGetCursorTodosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCursorTodosQuery, GetCursorTodosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCursorTodosQuery, GetCursorTodosQueryVariables>(GetCursorTodosDocument, options);
        }
export type GetCursorTodosQueryHookResult = ReturnType<typeof useGetCursorTodosQuery>;
export type GetCursorTodosLazyQueryHookResult = ReturnType<typeof useGetCursorTodosLazyQuery>;
export type GetCursorTodosQueryResult = Apollo.QueryResult<GetCursorTodosQuery, GetCursorTodosQueryVariables>;
export const GetOffsetTodosDocument = gql`
    query getOffsetTodos($userId: ID!, $offset: Int, $limit: Int, $search: String, $orderBy: TodoOrderByInput) {
  user(id: $userId) {
    id
    totalTodoCount
    offsetTodos(offset: $offset, limit: $limit, search: $search, orderBy: $orderBy) {
      id
      text
      completed
    }
  }
}
    `;

/**
 * __useGetOffsetTodosQuery__
 *
 * To run a query within a React component, call `useGetOffsetTodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOffsetTodosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOffsetTodosQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      search: // value for 'search'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetOffsetTodosQuery(baseOptions: Apollo.QueryHookOptions<GetOffsetTodosQuery, GetOffsetTodosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOffsetTodosQuery, GetOffsetTodosQueryVariables>(GetOffsetTodosDocument, options);
      }
export function useGetOffsetTodosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOffsetTodosQuery, GetOffsetTodosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOffsetTodosQuery, GetOffsetTodosQueryVariables>(GetOffsetTodosDocument, options);
        }
export type GetOffsetTodosQueryHookResult = ReturnType<typeof useGetOffsetTodosQuery>;
export type GetOffsetTodosLazyQueryHookResult = ReturnType<typeof useGetOffsetTodosLazyQuery>;
export type GetOffsetTodosQueryResult = Apollo.QueryResult<GetOffsetTodosQuery, GetOffsetTodosQueryVariables>;
export const AllUsersDocument = gql`
    query allUsers {
  allUsers {
    id
  }
}
    `;

/**
 * __useAllUsersQuery__
 *
 * To run a query within a React component, call `useAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
      }
export function useAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
        }
export type AllUsersQueryHookResult = ReturnType<typeof useAllUsersQuery>;
export type AllUsersLazyQueryHookResult = ReturnType<typeof useAllUsersLazyQuery>;
export type AllUsersQueryResult = Apollo.QueryResult<AllUsersQuery, AllUsersQueryVariables>;