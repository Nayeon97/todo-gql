import styled from "styled-components";
import ToggleCompleteTodo from "./components/ToggleCompleteTodo";
import TodoItem from "./components/TodoItem";
import DeleteTodo from "./components/DeleteTodo";
import { Todo } from "./gql/graphql";

const TodoCard = (item: Todo | null) => {
  if (!item) return null;

  const { completed, id, text } = item;

  return (
    <TodoItemContainer key={id}>
      <ToggleCompleteTodo completed={completed} id={id} />
      <TodoItem completed={completed} text={text} />
      <DeleteTodo id={id} />
    </TodoItemContainer>
  );
};

export default TodoCard;

const TodoItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 10px;
`;
