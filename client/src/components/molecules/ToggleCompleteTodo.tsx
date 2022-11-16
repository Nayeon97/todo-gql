import Button from "../atoms/Button";
import { useToggleTodoMutation } from "./ToggleCompleteTodo.generated";

interface ToggleCompleteTodoProps {
  id: string;
  completed: boolean;
}

const ToggleCompleteTodo = ({ id, completed }: ToggleCompleteTodoProps) => {
  const [toggleTodo, { error }] = useToggleTodoMutation({
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

  if (error) return <p>`Error! ${error.message}`</p>;

  const toggleShowComplete = () => {
    toggleTodo({ variables: { id: id, completed: completed } });
  };

  return (
    <Button
      onClick={toggleShowComplete}
      btnType="completed"
      name="완료체크버튼...."
    />
  );
};

export default ToggleCompleteTodo;
