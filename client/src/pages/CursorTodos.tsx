import { useState } from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import CreateTodo from "../components/molecules/CreateTodo";
import CursorTodoItems from "../components/organisms/CursorTodoItems";
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
  const [after, setAfter] = useState("");
  const { data, error, loading, fetchMore } = useQuery(GET_CURSOR_TODOS, {
    variables: {
      userId: params.userId,
      first: 0,
      after,
    },
  });

  if (error) return <p>`Error! ${error.message}`</p>;

  const handleLoadMore = () => {
    const pageInfo = data?.user.cursorTodos.pageInfo.hasNextPage;
    if (pageInfo) {
      fetchMore({
        variables: {
          cursor: after,
        },
      }).then(() => {
        setAfter(
          data?.user.cursorTodos.edges.map((edge: any) => edge).slice(-1)[0]
            .cursor
        );
      });
    }
  };

  return (
    <>
      <TodosContainer>
        <CreateTodo user={data?.user} />
        <TodosWrapper>
          {loading ? (
            <Spinner />
          ) : (
            <CursorTodoItems
              user={data?.user || []}
              onLoadMore={handleLoadMore}
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
