import styled from 'styled-components';
import ToggleCompleteTodo from './ToggleCompleteTodo';
import DeleteTodo from './DeleteTodo';
import EditTodo from './EditTodo';
import Button from '../atoms/Button/Button';
import {
  TodoEdge,
  CursorTodoItems_TodoFragment,
} from '../../gql/generated/graphql';
import { useState } from 'react';

interface TodoItemProps {
  todo: TodoEdge;
  user: CursorTodoItems_TodoFragment;
}

const TodoItem = ({ todo, user }: TodoItemProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  return (
    <>
      <TodoItemContainer completed={todo.node.completed} key={todo.node.id}>
        <ToggleCompleteTodo todo={todo.node} isEdit={isEdit} />
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
          disabled={isEdit ? true : false || todo.node.completed ? true : false}
        />
        <DeleteTodo user={user} setIsEdit={setIsEdit} todo={todo.node} />
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
  background-color: ${(props) => (props.completed ? '#d3d3d3' : 'transparent')};
  border-radius: 5px;
  margin: 10px 10px;
  padding: 10px 0px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.09);
`;
