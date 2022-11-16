import { gql } from "@apollo/client";
import React, { useState } from "react";
import styled from "styled-components";
import { TodoFragmentFragment } from "../gql/generated/graphql";

interface TodoItemProps {
  todo: TodoFragmentFragment;
}

const TodoText = ({ todo: todoProp }: TodoItemProps) => {
  const { id, completed, text } = todoProp;
  const [edit, setEdit] = useState<boolean>(false);
  const [todoText, setTodoText] = useState<string>(text);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTodoText(e.currentTarget.value);
  };

  return (
    <TodoContainer>
      {edit ? (
        <TodoEditWrapper type="text" value={todoText} onChange={onChange} />
      ) : (
        <TextWrapper id={id} completed={completed}>
          {text}
        </TextWrapper>
      )}
      <button onClick={() => setEdit(!edit)}>edit</button>
    </TodoContainer>
  );
};

export default TodoText;

const TodoContainer = styled.div`
  display: flex;
`;

const TodoEditWrapper = styled.input`
  border: none;
  outline: none;
  font-size: 15px;
`;

const TextWrapper = styled.div<{ completed: boolean }>`
  min-width: 200px;
  margin: 0px 20px;
  color: ${(props) => (props.completed ? "lightgray" : "black")};
  text-decoration: ${(props) => (props.completed ? "line-through" : "")};
`;

gql`
  fragment TodoFragment on Todo {
    id
    text
    completed
  }
`;
