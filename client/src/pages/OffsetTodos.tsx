import { useState } from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import CreateTodo from "../components/molecules/CreateSearchTodo";
import OffsetTodoItems from "../components/organisms/OffsetTodoItems";
import Spinner from "../components/atoms/Spinner";
import EditTodo from "../components/molecules/EditTodo";

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
  const [search, setSearch] = useState<string>("");
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
        {/* <CreateTodo user={data?.user} setSearch={setSearch} /> */}
        <TodosWrapper>
          {loading ? (
            <Spinner />
          ) : (
            <OffsetTodoItems
              user={data?.user || []}
              onLoadMore={handleLoadMore}
            />
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
