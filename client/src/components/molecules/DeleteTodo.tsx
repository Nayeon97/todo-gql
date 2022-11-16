import { useRemoveTodoMutation } from "./DeleteTodo.generated";
import { Todo } from "../../types";
import Button from "../atoms/Button";

interface DeleteTodoProps {
  id: string;
}

const DeleteTodo = ({ id }: DeleteTodoProps) => {
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
