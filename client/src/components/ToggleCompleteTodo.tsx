import styled from "styled-components";
import { useToggleTodoMutation } from "./ToggleCompleteTodo.generated";

interface ToggleCompleteTodoProps {
  id: string;
  completed: boolean;
}

const ToggleCompleteTodo = ({ id, completed }: ToggleCompleteTodoProps) => {
  const [toggleTodo] = useToggleTodoMutation({
    // update(cache) {
    // id: cache.identify({ id, __typename: "Todo" }),
    //   cache.modify({
    //     fields: {
    //       // todo(existingTodos, { readField }) {
    //       //   const newTodos = [...existingTodos];
    //       //   const index = newTodos.findIndex(
    //       //     (todo) => id === readField("id", todo)
    //       //   );
    //       //   console.log(newTodos[index].completed);
    //       //   return newTodos;
    //       //},
    //       completed(cacheComplete) {
    //         return !cacheComplete;
    //       },
    //     },
    //   });
    // },
  });

  const toggleShowComplete = () => {
    toggleTodo({ variables: { id: id, completed: completed } });
  };

  return (
    <ButtonWrapper onClick={toggleShowComplete} completed={completed}>
      {completed ? "완료" : "미완"}
    </ButtonWrapper>
  );
};

export default ToggleCompleteTodo;

const ButtonWrapper = styled.button<{ completed: boolean }>`
  color: ${(props) => (props.completed ? "black" : "red")};
  cursor: pointer;
`;
