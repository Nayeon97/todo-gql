import React from "react";
import styled from "styled-components";

interface TodoItemProps {
  text: string;
  completed: boolean;
}

const TodoItem = ({ completed, text }: TodoItemProps) => {
  return <TextWrapper completed={completed}>{text}</TextWrapper>;
};

export default TodoItem;

const TextWrapper = styled.div<{ completed: boolean }>`
  min-width: 200px;
  margin: 0px 20px;
  color: ${(props) => (props.completed ? "lightgray" : "black")};
  text-decoration: ${(props) => (props.completed ? "line-through" : "")};
`;
