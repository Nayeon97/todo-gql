import { MutationUpdaterFn } from "@apollo/client";
import { produce } from "immer";
import {
  CreateTodoMutation,
  GetOffsetTodosDocument,
  GetOffsetTodosQuery,
  GetOffsetTodosQueryVariables,
  OffsetTodoItems_TodoFragment,
} from "../../gql/generated/graphql";

export const createTodoUpdator =
  (user: OffsetTodoItems_TodoFragment): MutationUpdaterFn<CreateTodoMutation> =>
  (cache, { data }) => {
    if (!data) return;

    const cacheData = cache.readQuery<
      GetOffsetTodosQuery,
      GetOffsetTodosQueryVariables
    >({
      query: GetOffsetTodosDocument,
      variables: {
        userId: user.id,
      },
    });

    console.log(user.id);

    if (cacheData) {
      cache.writeQuery<GetOffsetTodosQuery, GetOffsetTodosQueryVariables>({
        query: GetOffsetTodosDocument,
        variables: {
          userId: user.id,
        },
        data: produce(cacheData, (draft) => {
          draft.user.offsetTodos = [...draft.user.offsetTodos];
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
