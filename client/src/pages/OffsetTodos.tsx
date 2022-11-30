import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { gql } from '@apollo/client';
import styled from 'styled-components';
import CreateSearchTodo from '../components/molecules/offset/CreateSearchTodo';
import OffsetTodoItems from '../components/organisms/OffsetTodoItems';
import Spinner from '../components/atoms/Spinner';
import {
  InputMaybe,
  Sort,
  useGetOffsetTodosQuery,
} from '../gql/generated/graphql';
import OrderByTodo from '../components/molecules/offset/OrderbyTodos';

gql`
  query getOffsetTodos(
    $userId: ID!
    $offset: Int
    $limit: Int
    $search: String
    $orderBy: TodoOrderByInput
  ) {
    user(id: $userId) {
      id
      totalTodoCount
      offsetTodos(
        offset: $offset
        limit: $limit
        search: $search
        orderBy: $orderBy
      ) {
        id
        text
        completed
      }
    }
  }
`;

const OffsetTodos = () => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState<string>('');
  const { data, error, loading, fetchMore, refetch } = useGetOffsetTodosQuery({
    variables: {
      userId: params.userId || '',
      offset: 0,
      limit,
    },
  });

  if (error) return <p>`Error! ${error.message}`</p>;

  const handleLoadMore = () => {
    const currentLength = data?.user?.offsetTodos.length || 0;
    fetchMore({
      variables: {
        offset: currentLength,
      },
    }).then((fetchMoreResult) => {
      console.log(fetchMoreResult.data.user.offsetTodos.length);
      setLimit(currentLength + fetchMoreResult.data?.user?.offsetTodos.length);
      setSearchParams({
        search: `${search}`,
        offset: `${data?.user?.offsetTodos.length}`,
        limit: `${
          currentLength + fetchMoreResult.data?.user?.offsetTodos.length
        }`,
      });
    });
  };

  const getData = (
    search?: string,
    orderByText?: InputMaybe<Sort>,
    orderByCompleted?: InputMaybe<Sort>
  ) => {
    if (params.userId) {
      refetch({
        userId: params.userId,
        offset: 0,
        limit,
        search: search,
        orderBy: {
          text: orderByText,
          completed: orderByCompleted,
        },
      });
    }
    setSearchParams({
      search: `${search}`,
      offset: `${data?.user?.offsetTodos.length}`,
      limit: `${limit}`,
    });
  };

  return (
    <Container>
      {loading ? (
        <Spinner />
      ) : (
        data && (
          <TodosContainer>
            <ButtonWrapper
              onClick={() => {
                navigate('/');
              }}
            >
              navigate userList
            </ButtonWrapper>
            <div>
              <CreateSearchTodo user={data.user} getData={getData} />
            </div>
            <OrderByTodo getData={getData} search={search} />
            {search && (
              <SearchWrapper>
                검색 결과
                <p>{search}</p>
              </SearchWrapper>
            )}
            <TodosWrapper>
              <OffsetTodoItems user={data.user} onLoadMore={handleLoadMore} />
            </TodosWrapper>
          </TodosContainer>
        )
      )}
    </Container>
  );
};

export default OffsetTodos;

const Container = styled.div`
  display: grid;
  place-content: center;
`;

const TodosContainer = styled.div`
  display: grid;
  justify-items: center;
`;

const TodosWrapper = styled.div`
  margin-top: 10px;
`;

const SearchWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
  margin-left: 30px;
  font-size: 13px;
  color: gray;
  p {
    color: pink;
    padding: 0px 10px;
    font-weight: bold;
  }
`;

const ButtonWrapper = styled.button`
  margin-top: 20px;
  button {
    font-size: 15px;
  }
`;
