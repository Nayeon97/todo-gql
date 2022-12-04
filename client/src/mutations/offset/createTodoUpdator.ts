import { MutationUpdaterFn } from '@apollo/client';
import {
  CreateTodoMutation,
  OffsetTodoItems_TodoFragment,
  Query,
} from '../../gql/generated/graphql';

export const createTodoUpdator =
  (user: OffsetTodoItems_TodoFragment): MutationUpdaterFn<CreateTodoMutation> =>
  (cache, { data }) => {
    if (!data) return;

    cache.modify({
      id: cache.identify(user),
      fields: {
        offsetTodos(existingTodos: Query['user']['offsetTodos']) {
          console.log(existingTodos);
          return [...existingTodos, data];
        },
      },
    });

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
