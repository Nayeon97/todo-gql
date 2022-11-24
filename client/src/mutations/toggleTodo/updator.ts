import { MutationUpdaterFn } from "@apollo/client";
import produce from "immer";
import {
  GetOffsetTodosQuery,
  GetOffsetTodosQueryVariables,
  GetOffsetTodosDocument,
  ToggleTodoMutation,
} from "../../gql/generated/graphql";

export const updator =
  (): MutationUpdaterFn<ToggleTodoMutation> =>
  (cache, { data }) => {
    if (!data?.toggleTodo) {
      return;
    }
    cache.updateQuery<GetOffsetTodosQuery, GetOffsetTodosQueryVariables>(
      { query: GetOffsetTodosDocument },
      (todos) => {
        const targetId = data.toggleTodo.id;
        return produce(todos, (draft) => {
          if (!draft) {
            return;
          }
          const index = draft.user.offsetTodos.findIndex(
            (todo) => todo.id === targetId
          );
          if (index !== -1)
            draft.user.offsetTodos[index].completed =
              !data.toggleTodo.completed;
        });
      }
    );
  };
