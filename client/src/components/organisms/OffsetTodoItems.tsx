import React, { useState } from 'react';
import { gql } from '@apollo/client';
import styled from 'styled-components';
import { Todo, User } from '../../gql/generated/graphql';
import Button from '../atoms/Button/Button';
import DeleteTodo from '../molecules/DeleteTodo';
import ToggleCompleteTodo from '../molecules/ToggleCompleteTodo';
import EditTodo from '../molecules/EditTodo';

interface TodoItemsProps {
  user: User;
  onLoadMore: () => void;
}

const OffsetTodoItems = ({ user, onLoadMore }: TodoItemsProps) => {
  const [text, setText] = useState('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<Todo[]>([]);

  return (
    <>
      <TodoItemsContainer>
        {user.offsetTodos.map((todo) => {
          return (
            <TodoItemContainer completed={todo.completed} key={todo.id}>
              <ToggleCompleteTodo todo={todo} isEdit={isEdit} />
              <TextWrapper completed={todo.completed}></TextWrapper>
              <Button
                onClick={() => {
                  setIsEdit(true);
                  setEditTodo([todo]);
                }}
                name="edit"
                btnType="edit"
                disabled={
                  isEdit ? true : false || todo.completed ? true : false
                }
              />
              <DeleteTodo user={user} setIsEdit={setIsEdit} todo={todo} />
            </TodoItemContainer>
          );
        })}
        <button onClick={onLoadMore}>더보기</button>
      </TodoItemsContainer>
      {/* {isEdit && (
        <EditTodo editTodo={editTodo} setIsEdit={setIsEdit} user={user} />
      )} */}
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
  background-color: ${(props) => (props.completed ? '#d3d3d3' : 'transparent')};
  border-radius: 5px;
  margin: 10px 10px;
  padding: 10px 0px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.09);
`;

const TextWrapper = styled.input<{ completed: boolean }>`
  width: 200px;
  margin: 0px 20px;
  color: ${(props) => (props.completed ? 'white' : 'black')};
  text-decoration: ${(props) => (props.completed ? 'line-through' : '')};
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
