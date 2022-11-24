import { useState } from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import CreateTodo from "../components/molecules/CreateTodo";
import TodoItems from "../components/organisms/TodoItems";
import Spinner from "../components/atoms/Spinner";

const GET_OFFSET_TODOS = gql`
  query getOffsetTodos($userId: ID!, $offset: Int, $limit: Int) {
    user(id: $userId) {
      id
      totalTodoCount
      offsetTodos(offset: $offset, limit: $limit) {
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
  const { data, error, loading, fetchMore } = useQuery(GET_OFFSET_TODOS, {
    variables: {
      userId: params.userId,
      offset: 0,
      limit,
    },
  });

  if (error) return <p>`Error! ${error.message}`</p>;

  const handleLoadMore = () => {
    const currentLength = data?.user?.offsetTodos.length;
    fetchMore({
      variables: {
        offset: currentLength,
      },
    }).then((fetchMoreResult) => {
      setLimit(currentLength + fetchMoreResult.data?.user?.offsetTodos.length);
    });
  };

  return (
    <>
      <TodosContainer>
        <CreateTodo user={data?.user} />
        <TodosWrapper>
          {loading ? (
            <Spinner />
          ) : (
            <TodoItems user={data?.user || []} onLoadMore={handleLoadMore} />
          )}
        </TodosWrapper>
      </TodosContainer>
    </>
  );
};

export default OffsetTodos;

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

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
`;

const ButtonWrapper = styled.button`
  width: 50px;
  height: 50px;
  margin-bottom: 20px;
  border-radius: 50px;
  padding: 10px 10px;
  background-color: #f1f3f5;
`;
