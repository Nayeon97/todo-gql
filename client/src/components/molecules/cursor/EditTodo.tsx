import { gql } from "@apollo/client";
import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import styled from "styled-components";
import {
  useEditTodoMutation,
  CursorTodoItems_TodoFragment,
  TodoEdge,
} from "../../../gql/generated/graphql";
import { editTodoUpdator } from "../../../mutations/cursor/editTodoUpdator";

interface EditTodoProps {
  isEdit: boolean;
  user: CursorTodoItems_TodoFragment;
  todo: TodoEdge;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

const EditTodo = ({ isEdit, user, todo, setIsEdit }: EditTodoProps) => {
  const [editTodoText, setEditTodoText] = useState(todo.node.text);
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setEditTodoText(e.currentTarget.value);
  };

  const [editTodoItem] = useEditTodoMutation({
    update: editTodoUpdator(user),
    onCompleted: () => {
      setIsEdit(false);
    },
  });

  const clickEdit = () => {
    editTodoItem({
      variables: { editTodoId: todo.node.id, editTodoText2: editTodoText },
      optimisticResponse: {
        editTodo: {
          __typename: "Todo",
          id: todo.node.id,
          text: editTodoText,
          completed: todo.node.completed,
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
      completed={todo.node.completed}
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
