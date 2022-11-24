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
  const { data, error, loading, fetchMore } = useQuery(GET_CURSOR_TODOS, {
    variables: {
      userId: params.userId,
      // offset: page * 10 - 9,
      limit: 10,
    },
  });

  // console.log("data", data);

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
        <CreateTodo user={data?.user} />
        <TodosWrapper>
          {loading ? (
            <Spinner />
          ) : (
            <TodoItems
              user={data?.user || []}
              onLoadMore={handleLoadMore}
              paginationType="cursor"
            />
          )}
        </TodosWrapper>
      </TodosContainer>
    </>
  );
};

export default CursorTodos;

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
