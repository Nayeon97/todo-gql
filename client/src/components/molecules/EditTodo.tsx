import { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { useEditTodoMutation } from '../../gql/generated/graphql';
import { Todo } from '../../types';
import Input from '../atoms/Input';

interface EditTodoProps {
  editTodo: Todo[];
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

const EditTodo = ({ editTodo, setIsEdit }: EditTodoProps) => {
  const [editTodoText, setEditTodoText] = useState(editTodo[0]?.text);
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setEditTodoText(e.currentTarget.value);
  };

  const [editTodoItem] = useEditTodoMutation();

  const clickEdit = () => {
    editTodoItem({ variables: { id: editTodo[0].id, text: editTodoText } });
    setIsEdit(false);
  };

  return (
    <EditTodoContainer>
      <Input name="todo" type="text" value={editTodoText} onChange={onChange} />
      <button onClick={clickEdit}>Edit!</button>
    </EditTodoContainer>
  );
};

export default EditTodo;

const EditTodoContainer = styled.div`
  display: grid;
  padding: 30px;
  grid-template-columns: repeat(2, 1fr);
`;
