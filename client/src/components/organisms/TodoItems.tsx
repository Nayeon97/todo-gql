import React, { useState } from "react";
import { gql } from "@apollo/client";
import styled from "styled-components";
import { Todo } from "../../gql/generated/graphql";
import Button from "../atoms/Button/Button";
import DeleteTodo from "../molecules/DeleteTodo";
import ToggleCompleteTodo from "../molecules/ToggleCompleteTodo";

interface TodoItemProps {
  todos: Todo[];
  onLoadMore: () => void;
}

const TodoItems = ({ todos }: TodoItemProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const clickEditTodo = () => {
    setIsEdit(true);
  };

  return (
    <div>
      {todos?.map((todo) => {
        return (
          <TodoItemContainer completed={todo.completed} key={todo.id}>
            <ToggleCompleteTodo todo={todo} isEdit={isEdit} />
            <TextWrapper id={todo.id} completed={todo.completed}>
              {todo.text}
            </TextWrapper>
            <Button
              onClick={clickEditTodo}
              name="edit"
              btnType="edit"
              disabled={isEdit ? true : false || todo.completed ? true : false}
            />
            <DeleteTodo todo={todo} setIsEdit={setIsEdit} />
          </TodoItemContainer>
        );
      })}
    </div>
  );
};

export default TodoItems;

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

const TextWrapper = styled.div<{ completed: boolean }>`
  width: 200px;
  margin: 0px 20px;
  color: ${(props) => (props.completed ? "white" : "black")};
  text-decoration: ${(props) => (props.completed ? "line-through" : "")};
`;

gql`
  fragment TodoItem_Todo on Todo {
    id
    text
    completed
    ...EditTodoText_Todo
    ...RemoveTodo_Todo
    ...ToggleCompleteTodo_Todo
  }
`;
