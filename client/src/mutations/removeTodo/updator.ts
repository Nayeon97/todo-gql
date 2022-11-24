import { MutationUpdaterFn } from "@apollo/client";
import produce from "immer";
import { Query, RemoveTodoMutation, User } from "../../gql/generated/graphql";

export const updator =
  (user: User): MutationUpdaterFn<RemoveTodoMutation> =>
  (cache, { data }) => {
    if (!data?.removeTodo) {
      return;
    }
    cache.modify({
      id: cache.identify(user),
      fields: {
        offsetTodos(
          existingTodos: Query["user"]["offsetTodos"],
          { readField }
        ) {
          const targetId = data.removeTodo.deletedTodoId;
          const deleteTodos = produce(existingTodos, (draft) => {
            const index = draft.findIndex(
              (todo) => readField("id", todo) === targetId
            );
            if (index !== -1) draft.splice(index, 1);
          });

          return deleteTodos;
        },
      },
    });
  };
