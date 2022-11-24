import { gql, MutationUpdaterFn } from "@apollo/client";
import { CreateTodoMutation, Query, User } from "../../gql/generated/graphql";

export const updator =
  (user: User): MutationUpdaterFn<CreateTodoMutation> =>
  (cache, { data }) => {
    if (!data) return;
    cache.modify({
      id: cache.identify(user),
      fields: {
        offsetTodos(existingTodos: Query["user"]["offsetTodos"]) {
          console.log(existingTodos);
          const newTodoRef = cache.writeFragment({
            data: data?.createTodo,
            fragment: gql`
              fragment NewTodo on Todo {
                id
                text
                completed
              }
            `,
          });
          return [...existingTodos, newTodoRef];
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
