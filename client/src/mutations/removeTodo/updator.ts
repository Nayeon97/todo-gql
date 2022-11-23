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
      id: cache.identify(data.removeTodo),
      fields: {
        id(existingTodos: Query["allTodos"], { readField }) {
          console.log(existingTodos);
          // const targetId = data.removeTodo.id;
          // const deletedTodosArray = produce(existingTodos, () => {
          //   // const index = draft.findIndex(
          //   //   (todo) => readField("id", todo) === targetId
          //   // );
          //   // if (index !== -1) draft.splice(index, 1);
          // });
          // // return [...deletedTodosArray];
        },
      },
    });
  };
