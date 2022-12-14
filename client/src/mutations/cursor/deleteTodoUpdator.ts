import { MutationUpdaterFn } from "@apollo/client";
import produce from "immer";
import {
  Query,
  RemoveTodoMutation,
  CursorTodoItems_TodoFragment,
} from "../../gql/generated/graphql";

export const deleteTodoUpdator =
  (user: CursorTodoItems_TodoFragment): MutationUpdaterFn<RemoveTodoMutation> =>
  (cache, { data }) => {
    if (!data?.removeTodo) {
      return;
    }
    cache.modify({
      id: cache.identify(user),
      fields: {
        cursorTodos(
          existingTodos: Query["user"]["cursorTodos"],
          { readField }
        ) {
          const targetId = data.removeTodo.deletedTodoId;
          const deleteTodos = produce(existingTodos, (draft) => {
            const index = draft.edges.findIndex(
              (todo) => readField("id", todo.node) === targetId
            );
            if (index !== -1) draft.edges.splice(index, 1);
          });
          return deleteTodos;
        },
      },
    });
  };
