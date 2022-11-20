import { MutationUpdaterFn } from "@apollo/client";
import produce from "immer";
import {
  GetTodosQuery,
  GetTodosQueryVariables,
  GetTodosDocument,
  ToggleTodoMutation,
  Todo,
} from "../../gql/generated/graphql";

export const updator =
  (): MutationUpdaterFn<ToggleTodoMutation> =>
  (cache, { data }) => {
    if (!data?.toggleTodo) {
      return;
    }
    cache.updateQuery<GetTodosQuery, GetTodosQueryVariables>(
      { query: GetTodosDocument },
      (todos) => {
        const targetId = data.toggleTodo.id;
        return produce(todos, (draft) => {
          if (!draft) {
            return;
          }
          const index = draft.allTodos.findIndex(
            (todo: Todo) => todo.id === targetId
          );
          if (index !== -1)
            draft.allTodos[index].completed = !data.toggleTodo.completed;
        });
      }
    );
  };
