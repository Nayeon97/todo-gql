import { Dispatch, SetStateAction } from "react";
import { useRemoveTodoMutation } from "../../../gql/generated/graphql";
import Button from "../../atoms/Button/Button";
import { gql } from "@apollo/client";
import {
  DeleteTodo_TodoFragment,
  OffsetTodoItems_TodoFragment,
} from "../../../gql/generated/graphql";
import { deleteTodoUpdator } from "../../../mutations/offset/deleteTodoUpdator";

interface DeleteTodoProps {
  // DeleteTodo User Fragment 따로 정의해서 사용 (생각보다 중요)
  user: OffsetTodoItems_TodoFragment;
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
  fragment DeleteTodo_User on User {
    id
  }
`;

gql`
  fragment DeleteTodo_Todo on Todo {
    id
  }
`;
