import React, { useState } from "react";
import { gql } from "@apollo/client";
import styled from "styled-components";
import {
  Todo,
  OffsetTodoItems_TodoFragment,
} from "../../gql/generated/graphql";
import TodoItem from "../molecules/TodoItem";

interface TodoItemsProps {
  user: OffsetTodoItems_TodoFragment;
  onLoadMore: () => void;
}

const OffsetTodoItems = ({ user, onLoadMore }: TodoItemsProps) => {
  const [text, setText] = useState("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<Todo[]>([]);

  return (
    <>
      <TodoItemsContainer>
        {user.offsetTodos.map((todo) => {
          return <TodoItem key={todo.id} todo={todo} user={user} />;
        })}
      </TodoItemsContainer>
    </>
  );
};

export default OffsetTodoItems;

const TodoItemsContainer = styled.div`
  height: 500px;
  overflow: auto;
`;

const TodoItemContainer = styled.div<{ completed: boolean }>`
  display: grid;
  width: 450px;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  background-color: ${(props) => (props.completed ? "#d3d3d3" : "transparent")};
  border-radius: 5px;
  margin: 10px 10px;
  padding: 10px 0px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.09);
`;

const TextWrapper = styled.input<{ completed: boolean }>`
  width: 200px;
  margin: 0px 20px;
  color: ${(props) => (props.completed ? "white" : "black")};
  text-decoration: ${(props) => (props.completed ? "line-through" : "")};
`;

gql`
  fragment OffsetTodoItems_Todo on User {
    id
    offsetTodos {
      id
      text
      completed
      ...EditTodoText_Todo
      ...DeleteTodo_Todo
      ...ToggleCompleteTodo_Todo
    }
  }
`;
