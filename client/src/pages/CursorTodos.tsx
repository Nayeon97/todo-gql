import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import CreateTodo from '../components/molecules/CreateTodo';
import CursorTodoItems from '../components/organisms/CursorTodoItems';
import Spinner from '../components/atoms/Spinner';
import { useGetCursorTodosQuery } from '../gql/generated/graphql';

const CursorTodos = () => {
  const params = useParams();
  const [after, setAfter] = useState('');
  const [end, setEnd] = useState<boolean>(false);
  const { data, error, loading, fetchMore } = useGetCursorTodosQuery({
    variables: {
      userId: params.userId || '',
      first: 0,
      after,
    },
  });

  useEffect(() => {
    if (data?.user.cursorTodos.edges.length !== 0) {
      setAfter(
        data?.user.cursorTodos.edges.map((edge: any) => edge).slice(-1)[0]
          .cursor
      );
      setEnd(data?.user.cursorTodos.pageInfo.hasNextPage || false);
    }
  }, [data]);

  if (error) return <p>`Error! ${error.message}`</p>;

  const handleLoadMore = () => {
    const pageInfo = data?.user.cursorTodos.pageInfo.hasNextPage;
    if (pageInfo) {
      fetchMore({
        variables: {
          cursor: after,
        },
      });
    }
  };

  return (
    <Container>
      {loading ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        data && (
          <TodosContainer>
            <CreateTodo user={data.user} />
            <TodosWrapper>
              <CursorTodoItems
                user={data.user}
                onLoadMore={handleLoadMore}
                end={end}
              />
            </TodosWrapper>
          </TodosContainer>
        )
      )}
    </Container>
  );
};

export default CursorTodos;

const Container = styled.div`
  position: relative;
  display: grid;
  place-content: center;
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: 25px;
  margin-left: -50px;
`;

const TodosContainer = styled.div`
  display: grid;
  justify-items: center;
  padding-top: 70px;
`;

const TodosWrapper = styled.div`
  height: 350px;
  margin-top: 30px;
  margin-bottom: 20px;
`;
