import { useState } from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import CreateTodo from "../components/molecules/CreateTodo";
import TodoItems from "../components/organisms/TodoItems";
import Spinner from "../components/atoms/Spinner";

const GET_CURSOR_TODOS = gql`
  query getCursorTodos($userId: ID!, $first: Int, $after: String) {
    user(id: $userId) {
      cursorTodos(first: $first, after: $after) {
        edges {
          node {
            id
            text
            completed
          }
          cursor
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  }
`;

const CursorTodos = () => {
  const params = useParams();
  const [page, setPage] = useState(1);
  const { data, error, loading, fetchMore } = useQuery(GET_CURSOR_TODOS, {
    variables: {
      userId: params.userId,
      offset: page * 10 - 9,
      limit: 10,
    },
  });

  console.log("data", data);

  if (error) return <p>`Error! ${error.message}`</p>;

  const handleLoadMore = () => {
    fetchMore({
      variables: {
        offset: data?.user?.offsetTodos.length,
      },
    });
  };

  return (
    <>
      <TodosContainer>
        {/* <CreateTodo data={data?.user.totalTodoCount} />
        <TodosWrapper>
          {loading ? (
            <Spinner />
          ) : (
            <TodoItems
              todos={data?.user?.offsetTodos || []}
              onLoadMore={handleLoadMore}
            />
          )}
        </TodosWrapper> */}
      </TodosContainer>
    </>
  );
};

export default CursorTodos;

gql`
  query getTodos {
    allTodos {
      ...TodoItem_Todo
    }
  }
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
