import { gql } from "@apollo/client";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { TodoItem_TodoFragment } from "../../gql/generated/graphql";

import { Todo } from "../../types";
import Button from "../atoms/Button";
import DeleteTodo from "../molecules/DeleteTodo";
import ToggleCompleteTodo from "../molecules/ToggleCompleteTodo";

interface TodoItemProps {
  todo: TodoItem_TodoFragment;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  setEditTodo: Dispatch<SetStateAction<Todo[]>>;
}

const TodoItem = ({ todo, setEditTodo, isEdit, setIsEdit }: TodoItemProps) => {
  const clickEditTodo = () => {
    setIsEdit(true);
    setEditTodo([todo]);
  };

  return (
    <TodoItemContainer>
      <ToggleCompleteTodo todo={todo} isEdit={isEdit} />
      <TextWrapper id={todo.id} completed={todo.completed}>
        {todo.text}
      </TextWrapper>
      <Button
        onClick={clickEditTodo}
        name="edit"
        btnType="default"
        disabled={isEdit ? true : false || todo.completed ? true : false}
      />
      <DeleteTodo todo={todo} setIsEdit={setIsEdit} />
    </TodoItemContainer>
  );
};

export default TodoItem;

const TodoItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  margin-top: 10px;
`;

const TextWrapper = styled.div<{ completed: boolean }>`
  min-width: 200px;
  margin: 0px 20px;
  color: ${(props) => (props.completed ? "lightgray" : "black")};
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
