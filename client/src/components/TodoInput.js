import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import styled from "styled-components";

const CreateTodo = gql`
  mutation createTodo($text: String!) {
    createTodo(text: $text) {
      id
      text
      completed
    }
  }
`;

const TodoInput = () => {
  const [todo, setTodo] = useState("");

  const onChange = (e) => {
    setTodo(e.target.value);
  };

  const [createTodo, { error }] = useMutation(CreateTodo, {
    update(cache, { data: { createTodo } }) {
      cache.modify({
        fields: {
          allTodos(oldTodos) {
            const newTodoRef = cache.writeFragment({
              data: createTodo,
              fragment: gql`
                fragment NewTodo on Todo {
                  id
                  text
                  completed
                }
              `,
            });
            return [...oldTodos, newTodoRef];
          },
        },
      });
    },
  });

  if (error) return `Error! ${error}`;

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
