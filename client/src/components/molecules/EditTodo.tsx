import { gql } from "@apollo/client";
import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import styled from "styled-components";
import {
  useEditTodoMutation,
  CursorTodoItems_TodoFragment,
  OffsetTodoItems_TodoFragment,
  TodoEdge,
  Todo,
} from "../../gql/generated/graphql";
import { updator } from "../../mutations/editTodo/updator";

interface EditTodoProps {
  isEdit: boolean;
  user: OffsetTodoItems_TodoFragment;
  todo: Todo;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

const EditTodo = ({ isEdit, user, todo, setIsEdit }: EditTodoProps) => {
  const [editTodoText, setEditTodoText] = useState(todo.text);
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setEditTodoText(e.currentTarget.value);
  };

  const [editTodoItem] = useEditTodoMutation({
    update: updator(user),
    onCompleted: () => {
      setIsEdit(false);
    },
  });

  const clickEdit = () => {
    editTodoItem({
      variables: { editTodoId: todo.id, editTodoText2: editTodoText },
      optimisticResponse: {
        editTodo: {
          __typename: "Todo",
          id: todo.id,
          text: editTodoText,
          completed: todo.completed,
        },
      },
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      clickEdit();
    }
  };

  return (
    <TextWrapper
      value={editTodoText}
      completed={todo.completed}
      disabled={isEdit ? false : true}
      onChange={onChange}
      onKeyPress={handleKeyPress}
    />
  );
};

export default EditTodo;

const TextWrapper = styled.input<{ completed: boolean }>`
  width: 200px;
  margin: 0px 20px;
  color: ${(props) => (props.completed ? "white" : "black")};
  text-decoration: ${(props) => (props.completed ? "line-through" : "")};
  background-color: transparent;
  border: none;
  font-size: 15px;
`;

gql`
  fragment EditTodoText_Todo on Todo {
    id
    text
  }
`;
