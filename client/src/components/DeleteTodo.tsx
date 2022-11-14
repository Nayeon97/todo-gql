import React from "react";
import { gql, Reference, StoreObject, useMutation } from "@apollo/client";
import styled from "styled-components";
import { graphql } from "../gql";

interface DeleteTodoProps {
  id: string;
}

const RemoveTodo = graphql(`
  mutation removeTodo($id: String!) {
    removeTodo(id: $id) {
      id
    }
  }
`);

const DeleteTodo = ({ id }: DeleteTodoProps) => {
  const [deleteTodo] = useMutation(RemoveTodo, {
    update(cache) {
      cache.modify({
        fields: {
          allTodos(existingTodos, { readField }) {
            return existingTodos.filter(
              (todo: Reference | StoreObject | undefined) =>
                id !== readField("id", todo)
            );
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
