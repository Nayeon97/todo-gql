import { MutationUpdaterFn } from "@apollo/client";
import produce from "immer";
import { Query, RemoveTodoMutation } from "../../gql/generated/graphql";

export const updator =
  (): MutationUpdaterFn<RemoveTodoMutation> =>
  (cache, { data }) => {
    if (!data?.removeTodo) {
      return;
    }
    cache.modify({
      fields: {
        allTodos(existingTodos: Query["allTodos"], { readField }) {
          const targetId = data.removeTodo.id;
          const deletedTodosArray = produce(existingTodos, (draft) => {
            const index = draft.findIndex(
              (todo) => readField("id", todo) === targetId
            );
            if (index !== -1) draft.splice(index, 1);
          });
          return [...deletedTodosArray];
        },
      },
    });
  };
