import { gql } from "@apollo/client";
import produce from "immer";
import {
  GetTodosDocument,
  GetTodosQuery,
  GetTodosQueryVariables,
  ToggleCompleteTodo_TodoFragment,
} from "../../gql/generated/graphql";
import Button from "../atoms/Button";
import { useToggleTodoMutation } from "../../gql/generated/graphql";
import { Todo } from "../../gql/generated/graphql";

interface ToggleCompleteTodoProps {
  todo: ToggleCompleteTodo_TodoFragment;
  isEdit: boolean;
}

const ToggleCompleteTodo = ({ todo, isEdit }: ToggleCompleteTodoProps) => {
  const { id, completed } = todo;
  const [toggleTodo, { error }] = useToggleTodoMutation({
    update(cache, { data }) {
      if (!data?.toggleTodo) {
        return;
      }
      cache.updateQuery<GetTodosQuery, GetTodosQueryVariables>(
        { query: GetTodosDocument },
        (todos) => {
          const targetId = data.toggleTodo.id;
          return produce(todos, (draft) => {
            if (!draft) {
              return;
            }
            const index = draft.allTodos.findIndex(
              (todo: Todo) => todo.id === targetId
            );
            if (index !== -1) draft.allTodos[index].completed = !completed;
          });
        }
      );
    },
  });

  if (error) return <p>`Error! ${error.message}`</p>;

  const toggleShowComplete = () => {
    toggleTodo({
      variables: { id: id, completed: !completed },
      optimisticResponse: {
        toggleTodo: {
          __typename: "Todo",
          id: id,
          completed: !completed,
        },
      },
    });
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

export const test = gql`
  fragment ToggleCompleteTodo_Todo on Todo {
    id
    completed
  }
`;
