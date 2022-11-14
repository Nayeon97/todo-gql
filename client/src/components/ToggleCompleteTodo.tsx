import React from "react";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import { graphql } from "../gql";

interface ToggleCompleteTodoProps {
  id: string;
  completed: boolean;
}

const ToggleTodo = graphql(`
  mutation toggleTodo($id: String!, $completed: Boolean!) {
    toggleTodo(id: $id, completed: $completed) {
      id
      completed
    }
  }
`);

const ToggleCompleteTodo = ({ id, completed }: ToggleCompleteTodoProps) => {
  const [toggleTodo] = useMutation(ToggleTodo, {
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
