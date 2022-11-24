import { Dispatch, SetStateAction } from "react";
import { User, useRemoveTodoMutation } from "../../gql/generated/graphql";
import Button from "../atoms/Button/Button";
import { gql } from "@apollo/client";
import { RemoveTodo_TodoFragment } from "../../gql/generated/graphql";
import { updator } from "../../mutations/removeTodo/updator";
import { useParams } from "react-router-dom";

interface DeleteTodoProps {
  user: User;
  todo: RemoveTodo_TodoFragment;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

const DeleteTodo = ({ user, todo }: DeleteTodoProps) => {
  const { id, text, completed } = todo;

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
