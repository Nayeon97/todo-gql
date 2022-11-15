import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import { graphql } from "../gql";
import { CreateTodoMutation } from "../gql/graphql";

const CreateTodo = graphql(`
  mutation createTodo($text: String!) {
    createTodo(text: $text) {
      id
      text
      completed
    }
  }
`);

const TodoInput = () => {
  const [todo, setTodo] = useState("");

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTodo(e.currentTarget.value);
  };

  const [createTodo, { error }] = useMutation<CreateTodoMutation>(CreateTodo, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          allTodos(oldTodos) {
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
            return [...oldTodos, newTodoRef];
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
