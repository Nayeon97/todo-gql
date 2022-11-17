import { gql, useMutation } from "@apollo/client";
import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import styled from "styled-components";
import {
  useEditTodoMutation,
  EditTodoText_TodoFragment,
} from "../../gql/generated/graphql";
import Input from "../atoms/Input";

interface EditTodoProps {
  editTodo: EditTodoText_TodoFragment[];
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

const EditTodoText = ({ editTodo, setIsEdit }: EditTodoProps) => {
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

export default EditTodoText;

const EditTodoContainer = styled.div`
  display: grid;
  padding: 30px;
  grid-template-columns: repeat(2, 1fr);
`;

gql`
  fragment EditTodoText_Todo on Todo {
    id
    text
  }
`;