import * as Types from "../../types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type RemoveTodoMutationVariables = Types.Exact<{
  id: Types.Scalars["String"];
}>;

export type RemoveTodoMutation = {
  __typename?: "Mutation";
  removeTodo?: { __typename?: "Todo"; id: string } | null;
};

export const RemoveTodoDocument = gql`
  mutation removeTodo($id: String!) {
    removeTodo(id: $id) {
      id
    }
  }
`;
export type RemoveTodoMutationFn = Apollo.MutationFunction<
  RemoveTodoMutation,
  RemoveTodoMutationVariables
>;

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
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveTodoMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveTodoMutation,
    RemoveTodoMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemoveTodoMutation, RemoveTodoMutationVariables>(
    RemoveTodoDocument,
    options
  );
}
export type RemoveTodoMutationHookResult = ReturnType<
  typeof useRemoveTodoMutation
>;
export type RemoveTodoMutationResult =
  Apollo.MutationResult<RemoveTodoMutation>;
export type RemoveTodoMutationOptions = Apollo.BaseMutationOptions<
  RemoveTodoMutation,
  RemoveTodoMutationVariables
>;
