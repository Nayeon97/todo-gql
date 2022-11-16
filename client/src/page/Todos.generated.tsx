import * as Types from "../types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type GetTodosQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetTodosQuery = {
  __typename?: "Query";
  allTodos: Array<{
    __typename?: "Todo";
    id: string;
    text: string;
    completed: boolean;
  }>;
};

export const GetTodosDocument = gql`
  query getTodos {
    allTodos {
      id
      text
      completed
    }
  }
`;

/**
 * __useGetTodosQuery__
 *
 * To run a query within a React component, call `useGetTodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTodosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTodosQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTodosQuery(
  baseOptions?: Apollo.QueryHookOptions<GetTodosQuery, GetTodosQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetTodosQuery, GetTodosQueryVariables>(
    GetTodosDocument,
    options
  );
}
export function useGetTodosLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTodosQuery,
    GetTodosQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetTodosQuery, GetTodosQueryVariables>(
    GetTodosDocument,
    options
  );
}
export type GetTodosQueryHookResult = ReturnType<typeof useGetTodosQuery>;
export type GetTodosLazyQueryHookResult = ReturnType<
  typeof useGetTodosLazyQuery
>;
export type GetTodosQueryResult = Apollo.QueryResult<
  GetTodosQuery,
  GetTodosQueryVariables
>;
