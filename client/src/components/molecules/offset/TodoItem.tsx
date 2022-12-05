import ToggleCompleteTodo from './ToggleCompleteTodo';
import DeleteTodo from './DeleteTodo';
import EditTodo from './EditTodo';
import Button from '../../atoms/Button/Button';
import { TodoItem_UserFragment, Todo } from '../../../gql/generated/graphql';
import { useState } from 'react';
import { TableCell, TableRow } from '@mui/material';
import { gql } from '@apollo/client';

interface TodoItemProps {
  todo: Todo;
  user: TodoItem_UserFragment;
}

const TodoItem = ({ todo, user }: TodoItemProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  return (
    <TableRow
      key={todo.id}
      sx={{
        '&:last-child td, &:last-child th': { border: 0 },
        backgroundColor: todo.completed === true ? '#696977' : 'white',
      }}
    >
      <TableCell component="th" scope="row">
        <ToggleCompleteTodo todo={todo} isEdit={isEdit} />
      </TableCell>
      <TableCell align="left">
        <EditTodo
          isEdit={isEdit}
          user={user}
          todo={todo}
          setIsEdit={setIsEdit}
        />
      </TableCell>
      <TableCell align="left">
        <Button
          onClick={() => {
            setIsEdit(true);
          }}
          name="edit"
          btnType="edit"
          disabled={isEdit ? true : false || todo.completed ? true : false}
        />
      </TableCell>
      <TableCell align="left">
        <DeleteTodo user={user} setIsEdit={setIsEdit} todo={todo} />
      </TableCell>
    </TableRow>
  );
};

export default TodoItem;

gql`
  fragment TodoItem_User on User {
    id
  }

  fragment TodoItem_Todo on Todo {
    id
    text
    completed
    ...EditTodoText_Todo
    ...DeleteTodo_Todo
    ...ToggleCompleteTodo_Todo
  }
`;
