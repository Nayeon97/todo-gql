import { gql, useMutation } from '@apollo/client';
import styled from 'styled-components';

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
    update(cache) {
      cache.modify({
        fields: {
          allTodos(existingTodos, { readField }) {
            let updateTodo = existingTodos.forEach((todo) => {
              if (id === readField('id', todo)) {
                // ?
              }
            });
            return updateTodo;
          },
        },
      });
    },
  });

  const onComplete = () => {
    completeTodo({ variables: { id: id, completed: iscompleted } });
  };

  return (
    <ButtonWrapper onClick={onComplete}>
      {iscompleted ? '완료' : ' '}
    </ButtonWrapper>
  );
};

export default CompleteTodo;

const ButtonWrapper = styled.button`
  color: red;
  cursor: pointer;
`;
