import { gql } from "@apollo/client";
import { ToggleCompleteTodo_TodoFragment } from "../../gql/generated/graphql";
import Button from "../atoms/Button";
import { useToggleTodoMutation } from "../../gql/generated/graphql";
import { Todo } from "../../types";
interface ToggleCompleteTodoProps {
  todo: ToggleCompleteTodo_TodoFragment;
  isEdit: boolean;
}

const ToggleCompleteTodo = ({ todo, isEdit }: ToggleCompleteTodoProps) => {
  const { id, completed } = todo;
  const [toggleTodo, { error }] = useToggleTodoMutation({
    // 1. updateQuery 사용.
    update(cache, { data }) {
      const query = gql`
        query ToggleCompeltetTodoQuery($id: String!) {
          allTodos(id: $id) {
            id
            text
            completed
          }
        }
      `;
      cache.updateQuery({ id: data?.toggleTodo?.id, query }, (todo) =>
        console.log(todo)
      );
    },
  });

  if (error) return <p>`Error! ${error.message}`</p>;

  const toggleShowComplete = () => {
    toggleTodo({ variables: { id: id, completed: !completed } });
  };

  return (
    <Button
      onClick={toggleShowComplete}
      btnType={completed ? "default" : "inComplete"}
      name={completed ? "완료" : "미완료"}
      disabled={isEdit ? true : false}
    />
  );
};

export default ToggleCompleteTodo;

gql`
  fragment ToggleCompleteTodo_Todo on Todo {
    id
    completed
  }
`;
