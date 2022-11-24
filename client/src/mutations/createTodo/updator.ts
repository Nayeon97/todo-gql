import { gql, MutationUpdaterFn } from '@apollo/client';
import {
  CreateTodoMutation,
  GetCursorTodosDocument,
  GetCursorTodosQuery,
  GetCursorTodosQueryVariables,
  CursorTodoItems_TodoFragment,
} from '../../gql/generated/graphql';

export const updator =
  (user: CursorTodoItems_TodoFragment): MutationUpdaterFn<CreateTodoMutation> =>
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
