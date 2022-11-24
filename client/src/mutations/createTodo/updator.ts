import { gql, MutationUpdaterFn } from "@apollo/client";
import {
  CreateTodoMutation,
  GetCursorTodosDocument,
  GetCursorTodosQuery,
  GetCursorTodosQueryVariables,
  User,
} from "../../gql/generated/graphql";

export const updator =
  (user: User): MutationUpdaterFn<CreateTodoMutation> =>
  (cache, { data }) => {
    if (!data) return;

    const cacheData = cache.readQuery<
      GetCursorTodosQuery,
      GetCursorTodosQueryVariables
    >({
      query: GetCursorTodosDocument,
    });

    if (cacheData) {
      cache.writeQuery<GetCursorTodosQuery, GetCursorTodosQueryVariables>({
        query: GetCursorTodosDocument,
        variables: {
          userId: cacheData.user.id,
        },
        data: {
          user: {
            id: user.id,
            cursorTodos: {
              edges: [
                ...cacheData?.user.cursorTodos.edges,
                data.createTodo.todoEdge,
              ],
              pageInfo: {
                hasNextPage: cacheData.user.cursorTodos.pageInfo.hasNextPage,
              },
            },
          },
        },
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
