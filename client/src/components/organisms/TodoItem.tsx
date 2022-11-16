import styled from "styled-components";
import DeleteTodo from "../molecules/DeleteTodo";
import TodoText from "../molecules/TodoText";
import ToggleCompleteTodo from "../molecules/ToggleCompleteTodo";

const TodoItem = ({ todo }: any) => {
  return (
    <TodoItemContainer key={todo.id}>
      <ToggleCompleteTodo completed={todo.completed} id={todo.id} />
      <TodoText todo={todo} />
      <DeleteTodo id={todo.id} />
    </TodoItemContainer>
  );
};

export default TodoItem;

const TodoItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 10px;
`;
