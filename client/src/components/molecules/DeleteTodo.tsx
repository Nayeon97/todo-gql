import { Dispatch, SetStateAction } from "react";
import { useRemoveTodoMutation } from "../../gql/generated/graphql";
import Button from "../atoms/Button";
import { gql } from "@apollo/client";
import { RemoveTodo_TodoFragment } from "../../gql/generated/graphql";
import { Todo } from "../../types";

interface DeleteTodoProps {
  todo: RemoveTodo_TodoFragment;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

const DeleteTodo = ({ todo, setIsEdit }: DeleteTodoProps) => {
  const { id } = todo;

  const [deleteTodo, { error }] = useRemoveTodoMutation({
    update(cache, { data }) {
      if (!data?.removeTodo) {
        return;
      }
      cache.modify({
        fields: {
          allTodos(existingTodos: Todo[], { readField }) {
            console.log(existingTodos);
          },
        },
      });
    },
  });

  if (error) return <p>`Error! ${error.message}`</p>;

  const onDelete = () => {
    deleteTodo({ variables: { id: id } });
  };

  return <Button onClick={onDelete} name="삭제" btnType="delete" />;
};

export default DeleteTodo;

gql`
  fragment RemoveTodo_Todo on Todo {
    id
  }
`;
