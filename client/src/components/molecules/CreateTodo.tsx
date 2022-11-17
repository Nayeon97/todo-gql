import React, { useState } from "react";
import { gql } from "@apollo/client";
import { useCreateTodoMutation } from "../../gql/generated/graphql";
import { Todo } from "../../types";
import Button from "../atoms/Button";
import Input from "../atoms/Input";

const CreateTodo = () => {
  const [todo, setTodo] = useState<string>("");

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTodo(e.currentTarget.value);
  };

  const [createTodo, { error }] = useCreateTodoMutation({
    update(cache, { data }) {
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
    },
  });

  if (error) return <p>`Error! ${error.message}`</p>;

  const onCreate = () => {
    if (todo) {
      createTodo({ variables: { text: todo } });
      setTodo("");
    }
  };

  return (
    <div>
      <Input type="text" value={todo} onChange={onChange} name="todo" />
      <Button onClick={onCreate} name="+" btnType="default" />
    </div>
  );
};

export default CreateTodo;
