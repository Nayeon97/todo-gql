import React, { useState } from "react";
import { gql } from "@apollo/client";
import { Query, useCreateTodoMutation } from "../../gql/generated/graphql";
import { Todo } from "../../gql/generated/graphql";
import Button from "../atoms/Button";
import Input from "../atoms/Input";

interface CrateTodoProps {
  data?: number;
}

const CreateTodo = ({ data }: CrateTodoProps) => {
  const [text, setText] = useState<string>("");

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  const [createTodo, { error }] = useCreateTodoMutation({
    update(cache, { data }) {
      // 1. cache.modify 사용.
      cache.modify({
        fields: {
          allTodos(existingTodos: Todo[]) {
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
    },
  });

  if (error) return <p>`Error! ${error.message}`</p>;

  const onCreate = () => {
    if (text) {
      createTodo({
        variables: { text: text },
        optimisticResponse: {
          createTodo: {
            __typename: "Todo",
            id: data + "1",
            text: text,
            completed: false,
          },
        },
      });
      setText("");
    }
  };

  return (
    <div>
      <Input type="text" value={text} onChange={onChange} name="todo" />
      <Button onClick={onCreate} name="+" btnType="default" />
    </div>
  );
};

export default CreateTodo;
