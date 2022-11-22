import { gql } from "@apollo/client";
import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import styled from "styled-components";
import {
  useEditTodoMutation,
  EditTodoText_TodoFragment,
} from "../../gql/generated/graphql";
import { updator } from "../../mutations/editTodo/updator";
import Input from "../atoms/Input/Input";

interface EditTodoProps {
  editTodo: EditTodoText_TodoFragment[];
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

const EditTodo = ({ editTodo, setIsEdit }: EditTodoProps) => {
  const [editTodoText, setEditTodoText] = useState(editTodo[0]?.text);
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setEditTodoText(e.currentTarget.value);
  };

  const [editTodoItem] = useEditTodoMutation({
    update: updator(),
  });

  const clickEdit = () => {
    editTodoItem({
      variables: { id: editTodo[0].id, text: editTodoText },
      optimisticResponse: {
        editTodo: {
          __typename: "Todo",
          id: editTodo[0].id,
          text: editTodoText,
        },
      },
    });
    setIsEdit(false);
  };

  return (
    <EditTodoContainer>
      <Input type="text" value={editTodoText} onChange={onChange} />
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

gql`
  fragment EditTodoText_Todo on Todo {
    id
    text
  }
`;
