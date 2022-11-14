import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";

const UpdateTodo = gql`
  mutation updateTodo($id: String!, $completed: Boolean!) {
    updateTodo(id: $id, completed: $completed) {
      id
      completed
    }
  }
`;

const CompleteTodo = ({ id, iscompleted }) => {
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

  const onComplete = () => {
    completeTodo({ variables: { id: id, completed: iscompleted } });
  };

  return (
    <ButtonWrapper onClick={onComplete} iscompleted={iscompleted}>
      {iscompleted ? "완료" : "미완"}
    </ButtonWrapper>
  );
};

export default CompleteTodo;

const ButtonWrapper = styled.button`
  color: ${(props) => (props.iscompleted ? "black" : "red")};
  cursor: pointer;
`;
