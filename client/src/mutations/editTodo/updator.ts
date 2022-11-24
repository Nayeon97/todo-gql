import { MutationUpdaterFn } from "@apollo/client";
import {
  EditTodoMutation,
  EditTodoMutationVariables,
  EditTodoText_TodoFragmentDoc,
  User,
} from "../../gql/generated/graphql";

export const updator =
  (user: User): MutationUpdaterFn<EditTodoMutation> =>
  (cache, { data }) => {
    if (!data?.editTodo) {
      return;
    }
    cache.updateFragment<EditTodoMutation, EditTodoMutationVariables>(
      {
        id: cache.identify(data.editTodo),
        fragment: EditTodoText_TodoFragmentDoc,
      },
      (todo) => {
        return todo;
      }
    );
  };
