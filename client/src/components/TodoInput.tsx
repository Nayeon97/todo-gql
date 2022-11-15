import React, { useState } from "react";
import { gql } from "@apollo/client";
import styled from "styled-components";
import { useCreateTodoMutation } from "./TodoInput.generated";

const TodoInput = () => {
  const [todo, setTodo] = useState<string>("");

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTodo(e.currentTarget.value);
  };

  const [createTodo, { error }] = useCreateTodoMutation({
    update(cache, { data }) {
      cache.modify({
        fields: {
          allTodos(existingTodos) {
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

  if (error) return <p>`${error.message}`</p>;

  const onCreate = () => {
    if (todo) {
      createTodo({ variables: { text: todo } });
      setTodo("");
    }
  };

  return (
    <div>
      <InputWrapper type="text" value={todo} onChange={onChange} />
      <ButtonWrapper onClick={onCreate}>+</ButtonWrapper>
    </div>
  );
};

export default TodoInput;

const InputWrapper = styled.input`
  width: 300px;
  height: 10px;
  margin-right: 30px;
  margin-bottom: 20px;
  color: black;
  background-color: #f1f3f5;
  padding: 20px;
  border: none;
  border-radius: 10px;
  outline: none;
  font-size: 15px;
  cursor: text;
`;

const ButtonWrapper = styled.button`
  font-size: 20px;
`;
