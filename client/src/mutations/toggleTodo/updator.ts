import { MutationUpdaterFn } from '@apollo/client';
import produce from 'immer';
import {
  ToggleTodoMutation,
  GetCursorTodosQuery,
  GetCursorTodosQueryVariables,
  GetCursorTodosDocument,
} from '../../gql/generated/graphql';

export const updator =
  (): MutationUpdaterFn<ToggleTodoMutation> =>
  (cache, { data }) => {
    if (!data?.toggleTodo) {
      return;
    }
    cache.updateQuery<GetCursorTodosQuery, GetCursorTodosQueryVariables>(
      { query: GetCursorTodosDocument },
      (todos) => {
        const targetId = data.toggleTodo.id;
        return produce(todos, (draft) => {
          if (!draft) {
            return;
          }
          const index = draft.user.cursorTodos.edges.findIndex(
            (todo) => todo.node.id === targetId
          );
          if (index !== -1)
            draft.user.cursorTodos.edges[index].node.completed =
              !data.toggleTodo.completed;
        });
      }
    );
  };
