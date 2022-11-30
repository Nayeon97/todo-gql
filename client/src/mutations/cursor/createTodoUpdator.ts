import { MutationUpdaterFn } from '@apollo/client';
import {
  CreateTodoMutation,
  CursorTodoItems_TodoFragment,
  Query,
} from '../../gql/generated/graphql';

export const createTodoUpdator =
  (user: CursorTodoItems_TodoFragment): MutationUpdaterFn<CreateTodoMutation> =>
  (cache, { data }) => {
    if (!data) return;

    // const cacheData = cache.readQuery<
    //   GetCursorTodosQuery,
    //   GetCursorTodosQueryVariables
    // >({
    //   query: AllUsersDocument,
    //   variables: {
    //     userId: user.id,
    //   },
    // });

    cache.modify({
      id: cache.identify(user),
      fields: {
        cursorTodos(existingTodos: Query['user']['cursorTodos']) {
          return {
            ...existingTodos,
            edges: [data?.createTodo.todoEdge, ...existingTodos.edges],
          };
        },
      },
    });

    // console.log(`User:${user.id}`);

    // const cacheData = cache.readFragment<
    //   CursorTodoItems_TodoFragment,
    //   GetCursorTodosQueryVariables
    // >({
    //   id: `User:${user.id}`,
    //   fragmentName: "CursorTodoItems_Todo",
    //   fragment: CursorTodoItems_TodoFragmentDoc,
    // });

    // console.log(cacheData);

    // if (cacheData) {
    //   cache.writeQuery<GetCursorTodosQuery, GetCursorTodosQueryVariables>({
    //     query: GetCursorTodosDocument,
    //     variables: {
    //       userId: user.id,
    //     },
    //     data: produce(cacheData, (draft) => {
    //       draft.user.cursorTodos.edges = [
    //         data.createTodo.todoEdge,
    //         ...draft.user.cursorTodos.edges,
    //       ];
    //       console.log(draft);
    //     }),
    //   });
    // }

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
