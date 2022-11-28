import { MutationUpdaterFn } from "@apollo/client";
import {
  EditTodoMutation,
  EditTodoMutationVariables,
  EditTodoText_TodoFragmentDoc,
  CursorTodoItems_TodoFragment,
  OffsetTodoItems_TodoFragment,
} from "../../gql/generated/graphql";

export const updator =
  (user: OffsetTodoItems_TodoFragment): MutationUpdaterFn<EditTodoMutation> =>
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
