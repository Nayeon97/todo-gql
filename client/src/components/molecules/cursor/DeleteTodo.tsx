import { Dispatch, SetStateAction } from "react";
import { CursorTodoItems_TodoFragment } from "../../../gql/generated/graphql";
import Button from "../../atoms/Button/Button";
import { gql } from "@apollo/client";
import {
  DeleteTodo_TodoFragment,
  useRemoveTodoMutation,
} from "../../../gql/generated/graphql";
import { deleteTodoUpdator } from "../../../mutations/cursor/deleteTodoUpdator";

interface DeleteTodoProps {
  user: CursorTodoItems_TodoFragment;
  todo: DeleteTodo_TodoFragment;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

const DeleteTodo = ({ user, todo }: DeleteTodoProps) => {
  const { id } = todo;

  const [deleteTodo, { error }] = useRemoveTodoMutation({
    update: deleteTodoUpdator(user),
  });

  if (error) return <p>`Error! ${error.message}`</p>;

  const onDelete = () => {
    if (id) {
      deleteTodo({
        variables: { removeTodoId: id },
      });
    }
  };

  return <Button onClick={onDelete} name="삭제" btnType="delete" />;
};

export default DeleteTodo;

gql`
  fragment DeleteTodo_Todo on Todo {
    id
  }
`;
