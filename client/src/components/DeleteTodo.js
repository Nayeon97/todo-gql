import { gql, useMutation } from '@apollo/client';
import styled from 'styled-components';

const RemoveTodo = gql`
  mutation removeTodo($id: String!) {
    removeTodo(id: $id) {
      id
    }
  }
`;

const DeleteTodo = ({ id }) => {
  const [deleteTodo] = useMutation(RemoveTodo, {
    update(cache) {
      cache.modify({
        fields: {
          allTodos(existingTodos, { readField }) {
            return existingTodos.filter((todo) => id !== readField('id', todo));
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
