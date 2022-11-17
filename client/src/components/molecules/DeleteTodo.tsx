import { Dispatch, SetStateAction } from "react";
import { useRemoveTodoMutation } from "../../gql/generated/graphql";
import { Todo } from "../../types";
import Button from "../atoms/Button";
import { gql } from "@apollo/client";
import { DeleteTodo_TodoFragment } from "../../gql/generated/graphql";

interface DeleteTodoProps {
  todo: DeleteTodo_TodoFragment;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

const DeleteTodo = ({ todo, setIsEdit }: DeleteTodoProps) => {
  const { id } = todo;
  const [deleteTodo, { error }] = useRemoveTodoMutation({
    update(cache) {
      cache.modify({
        fields: {
          allTodos(existingTodos: Todo[], { readField }) {
            return existingTodos.filter((todo) => id !== readField("id", todo));
          },
        },
      });
    },
  });

  if (error) return <p>`Error! ${error.message}`</p>;

  const onDelete = () => {
    deleteTodo({ variables: { id: id } });
    setIsEdit(false);
  };

  return <Button onClick={onDelete} name="삭제" btnType="delete" />;
};

export default DeleteTodo;

gql`
  fragment DeleteTodo_Todo on Todo {
    id
  }
`;
