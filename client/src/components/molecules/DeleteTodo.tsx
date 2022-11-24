import { Dispatch, SetStateAction } from "react";
import { User, useRemoveTodoMutation } from "../../gql/generated/graphql";
import Button from "../atoms/Button/Button";
import { gql } from "@apollo/client";
import { DeleteTodo_TodoFragment } from "../../gql/generated/graphql";
import { updator } from "../../mutations/removeTodo/updator";

interface DeleteTodoProps {
  user: User;
  todo: DeleteTodo_TodoFragment;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

const DeleteTodo = ({ user, todo }: DeleteTodoProps) => {
  const { id } = todo;

  const [deleteTodo, { error }] = useRemoveTodoMutation({
    update: updator(user),
  });

  if (error) return <p>`Error! ${error.message}`</p>;

  const onDelete = () => {
    if (id) {
      deleteTodo({
        variables: { removeTodoId: id },
        optimisticResponse: {
          removeTodo: {
            deletedTodoId: id,
          },
        },
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
