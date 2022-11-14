import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";

const UpdateTodo = gql`
  mutation updateTodo($id: String!, $toggleComplete: Boolean!) {
    updateTodo(id: $id, toggleComplete: $toggleComplete) {
      id
      toggleComplete
    }
  }
`;

const CompleteTodo = ({ id, toggleComplete }) => {
  const [completeTodo] = useMutation(UpdateTodo, {
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
    completeTodo({ variables: { id: id, toggleComplete: toggleComplete } });
  };

  return (
    <ButtonWrapper onClick={toggleShowComplete} toggleComplete={toggleComplete}>
      {toggleComplete ? "완료" : "미완"}
    </ButtonWrapper>
  );
};

export default CompleteTodo;

const ButtonWrapper = styled.button`
  color: ${(props) => (props.toggleComplete ? "black" : "red")};
  cursor: pointer;
`;
