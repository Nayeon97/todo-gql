import { MutationUpdaterFn } from "@apollo/client";
import produce from "immer";
import { Query, RemoveTodoMutation, Todo } from "../../gql/generated/graphql";

export const updator =
  (userId: string): MutationUpdaterFn<RemoveTodoMutation> =>
  (cache, { data }) => {
    if (!data?.removeTodo) {
      return;
    }
    cache.modify({
      id: cache.identify({ __typename: "User", id: userId }),
      fields: {
        offsetTodos(existingTodos: Query["user"], { readField }) {
          const targetId = data.removeTodo.id;
          console.log(existingTodos);
          const deletedTodosArray = produce(existingTodos, (draft: Todo[]) => {
            const index = draft.findIndex(
              (todo) => readField("id", todo) === targetId
            );
            if (index !== -1) draft.splice(index, 1);
          });
          return deletedTodosArray;
        },
      },
    });
  };
