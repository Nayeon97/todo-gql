import styled from "styled-components";
import ToggleCompleteTodo from "./ToggleCompleteTodo";
import DeleteTodo from "./DeleteTodo";
import EditTodo from "./EditTodo";
import Button from "../atoms/Button/Button";
import {
  TodoEdge,
  CursorTodoItems_TodoFragment,
  OffsetTodoItems_TodoFragment,
  Todo,
} from "../../gql/generated/graphql";
import { useState } from "react";

interface TodoItemProps {
  todo: Todo;
  user: OffsetTodoItems_TodoFragment;
}

const TodoItem = ({ todo, user }: TodoItemProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  return (
    <>
      <TodoItemContainer completed={todo.completed} key={todo.id}>
        <ToggleCompleteTodo todo={todo} isEdit={isEdit} />
        <EditTodo
          isEdit={isEdit}
          user={user}
          todo={todo}
          setIsEdit={setIsEdit}
        />
        <Button
          onClick={() => {
            setIsEdit(true);
          }}
          name="edit"
          btnType="edit"
          disabled={isEdit ? true : false || todo.completed ? true : false}
        />
        <DeleteTodo user={user} setIsEdit={setIsEdit} todo={todo} />
      </TodoItemContainer>
    </>
  );
};

export default TodoItem;

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
