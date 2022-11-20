import { Dispatch, SetStateAction } from "react";
import { Query, useRemoveTodoMutation } from "../../gql/generated/graphql";
import Button from "../atoms/Button";
import { gql } from "@apollo/client";
import { RemoveTodo_TodoFragment } from "../../gql/generated/graphql";
import { Todo } from "../../gql/generated/graphql";
import produce from "immer";

interface DeleteTodoProps {
  todo: RemoveTodo_TodoFragment;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

const DeleteTodo = ({ todo }: DeleteTodoProps) => {
  const { id } = todo;

  const [deleteTodo, { error }] = useRemoveTodoMutation({
    update(cache, { data }) {
      if (!data?.removeTodo) {
        return;
      }
      cache.modify({
        fields: {
          allTodos(existingTodos: Query["allTodos"], { readField }) {
            const targetId = data.removeTodo.id;
            const deletedTodosArray = produce(existingTodos, (draft) => {
              const index = draft.findIndex(
                (todo) => readField("id", todo) === targetId
              );
              if (index !== -1) draft.splice(index, 1);
            });
            return [...deletedTodosArray];
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
