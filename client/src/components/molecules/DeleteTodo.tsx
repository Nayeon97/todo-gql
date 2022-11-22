import { Dispatch, SetStateAction } from "react";
import { useRemoveTodoMutation } from "../../gql/generated/graphql";
import Button from "../atoms/Button/Button";
import { gql } from "@apollo/client";
import { RemoveTodo_TodoFragment } from "../../gql/generated/graphql";
import { updator } from "../../mutations/removeTodo/updator";

interface DeleteTodoProps {
  todo: RemoveTodo_TodoFragment;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

const DeleteTodo = ({ todo }: DeleteTodoProps) => {
  const { id, text, completed } = todo;

  const [deleteTodo, { error }] = useRemoveTodoMutation({
    update: updator(),
  });

  if (error) return <p>`Error! ${error.message}`</p>;

  const onDelete = () => {
    if (id) {
      deleteTodo({
        variables: { removeTodoId: id },
        optimisticResponse: {
          removeTodo: {
            __typename: "Todo",
            id: id,
            text: text,
            completed: completed,
          },
        },
      });
    }
  };

  return <Button onClick={onDelete} name="삭제" btnType="delete" />;
};

export default DeleteTodo;

gql`
  fragment RemoveTodo_Todo on Todo {
    id
    text
    completed
  }
`;
