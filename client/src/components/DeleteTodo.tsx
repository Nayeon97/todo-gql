import styled from "styled-components";
import { useRemoveTodoMutation } from "./DeleteTodo.generated";
import { Todo } from "../gql/generated/graphql";

interface DeleteTodoProps {
  id: string;
}

const DeleteTodo = ({ id }: DeleteTodoProps) => {
  const [deleteTodo] = useRemoveTodoMutation({
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

  const onDelete = () => {
    deleteTodo({ variables: { id: id } });
  };

  return <ButtonWrapper onClick={onDelete}>삭제</ButtonWrapper>;
};

export default DeleteTodo;

const ButtonWrapper = styled.button`
  color: blue;
`;
