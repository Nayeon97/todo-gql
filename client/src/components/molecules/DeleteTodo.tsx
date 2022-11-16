import { useRemoveTodoMutation } from "./DeleteTodo.generated";
import { Todo } from "../../types";
import Button from "../atoms/Button";
import { gql } from "@apollo/client";
import { DeleteTodo_TodoFragment } from "../../gql/generated/graphql";

interface DeleteTodoProps {
  todo: DeleteTodo_TodoFragment;
}

const DeleteTodo = ({ todo }: DeleteTodoProps) => {
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
  };

  return <Button onClick={onDelete} name="삭제" btnType="delete" />;
};

export default DeleteTodo;

gql`
  fragment DeleteTodo_Todo on Todo {
    id
  }
`;
