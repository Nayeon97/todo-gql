import React, { useState } from "react";
import { gql } from "@apollo/client";
import styled from "styled-components";
import { Todo, User } from "../../gql/generated/graphql";
import Button from "../atoms/Button/Button";
import DeleteTodo from "../molecules/DeleteTodo";
import ToggleCompleteTodo from "../molecules/ToggleCompleteTodo";

interface TodoItemsProps {
  data: User;
  onLoadMore: () => void;
}

const TodoItems = ({ data }: TodoItemsProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const userId = data.id;

  const clickEditTodo = () => {
    setIsEdit(true);
  };

  return (
    <div>
      {data?.offsetTodos.map((todo) => {
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
            <DeleteTodo data={data} setIsEdit={setIsEdit} todo={todo} />
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
  fragment TodoItem_Todo on User {
    id
    offsetTodos {
      id
      text
      completed
      ...EditTodoText_Todo
      ...RemoveTodo_Todo
      ...ToggleCompleteTodo_Todo
    }
  }
`;
