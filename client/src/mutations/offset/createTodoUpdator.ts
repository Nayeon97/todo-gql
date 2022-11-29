import { MutationUpdaterFn } from "@apollo/client";
import { produce } from "immer";
import {
  CreateTodoMutation,
  GetCursorTodosDocument,
  GetCursorTodosQuery,
  GetCursorTodosQueryVariables,
  OffsetTodoItems_TodoFragment,
} from "../../gql/generated/graphql";

export const createTodoUpdator =
  (user: OffsetTodoItems_TodoFragment): MutationUpdaterFn<CreateTodoMutation> =>
  (cache, { data }) => {
    if (!data) return;

    const cacheData = cache.readQuery<
      GetCursorTodosQuery,
      GetCursorTodosQueryVariables
    >({
      query: GetCursorTodosDocument,
      variables: {
        userId: user.id,
      },
    });

    if (cacheData) {
      cache.writeQuery<GetCursorTodosQuery, GetCursorTodosQueryVariables>({
        query: GetCursorTodosDocument,
        variables: {
          userId: user.id,
        },
        data: produce(cacheData, (draft) => {
          draft.user.cursorTodos.edges = [
            data.createTodo.todoEdge,
            ...draft.user.cursorTodos.edges,
          ];
        }),
      });
    }

    // 2. readQuery, writeQuery 사용.
    // const query = gql`
    //   query GetTodos {
    //     allTodos {
    //       id
    //       text
    //       completed
    //     }
    //   }
    // `;
    // const todosData = cache.readQuery<GetTodosQuery, GetTodosQueryVariables>({
    //   query,
    // });
    // if (todosData) {
    //   cache.writeQuery({
    //     query,
    //     data: {
    //       allTodos: [...todosData.allTodos, data?.createTodo],
    //     },
    //   });
    // }
  };
