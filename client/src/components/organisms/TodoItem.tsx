import { gql } from "@apollo/client";
import styled from "styled-components";
import { TodoItem_TodoFragment } from "../../gql/generated/graphql";
import DeleteTodo from "../molecules/DeleteTodo";
import TodoText from "../molecules/TodoText";
import ToggleCompleteTodo from "../molecules/ToggleCompleteTodo";

interface TodoItemProps {
  todo: TodoItem_TodoFragment;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const { id, completed } = todo;

  return (
    <TodoItemContainer key={id}>
      <ToggleCompleteTodo todo={todo} />
      <TodoText todo={todo} />
      <DeleteTodo todo={todo} />
    </TodoItemContainer>
  );
};

export default TodoItem;

const TodoItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 10px;
`;

gql`
  fragment TodoItem_Todo on Todo {
    id
    text
    completed
  }
`;
