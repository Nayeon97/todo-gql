import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import CreateSearchTodo from "../components/molecules/CreateSearchTodo";
import OffsetTodoItems from "../components/organisms/OffsetTodoItems";
import Spinner from "../components/atoms/Spinner";
import EditTodo from "../components/molecules/EditTodo";
import {
  InputMaybe,
  Sort,
  useGetOffsetTodosLazyQuery,
} from "../gql/generated/graphql";
import OrderByTodo from "../components/molecules/OrderbyTodos";

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
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState<string>("");
  const [getTodos, { data, error, loading, fetchMore }] =
    useGetOffsetTodosLazyQuery({});

  useEffect(() => {
    getData();
  }, []);

  if (error) return <p>`Error! ${error.message}`</p>;

  const handleLoadMore = () => {
    const currentLength = data?.user?.offsetTodos.length || 0;
    fetchMore({
      variables: {
        offset: currentLength,
      },
    }).then((fetchMoreResult) => {
      setLimit(currentLength + fetchMoreResult.data?.user?.offsetTodos.length);
    });
  };

  const getData = (
    search?: string,
    orderByText?: InputMaybe<Sort>,
    orderByCompleted?: InputMaybe<Sort>
  ) => {
    if (params.userId) {
      getTodos({
        variables: {
          userId: params.userId,
          offset: 0,
          limit,
          search: search,
          orderBy: {
            text: orderByText,
            completed: orderByCompleted,
          },
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
  padding-top: 60px;
`;

const TodosWrapper = styled.div`
  height: 350px;
  margin-top: 30px;
  margin-bottom: 20px;
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
