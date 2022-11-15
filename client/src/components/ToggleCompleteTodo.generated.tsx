import * as Types from '../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ToggleTodoMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  completed: Types.Scalars['Boolean'];
}>;


export type ToggleTodoMutation = { __typename?: 'Mutation', toggleTodo?: { __typename?: 'Todo', id: string, completed: boolean } | null };


export const ToggleTodoDocument = gql`
    mutation toggleTodo($id: String!, $completed: Boolean!) {
  toggleTodo(id: $id, completed: $completed) {
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
 *      id: // value for 'id'
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