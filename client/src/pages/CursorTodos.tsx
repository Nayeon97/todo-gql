import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CreateTodo from "../components/molecules/CreateTodo";
import CursorTodoItems from "../components/organisms/CursorTodoItems";
import Spinner from "../components/atoms/Spinner";
import { useGetCursorTodosLazyQuery, User } from "../gql/generated/graphql";
import { gql } from "@apollo/client";

gql`
  query getCursorTodos(
    $userId: ID!
    $first: Int
    $after: String
    $search: String
  ) {
    user(id: $userId) {
      id
      cursorTodos(first: $first, after: $after, search: $search) {
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
  const [after, setAfter] = useState<string>("");
  const [nextPage, setNextPage] = useState<boolean>(false);
  const [getTodos, { data, error, loading, fetchMore }] =
    useGetCursorTodosLazyQuery({});

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data?.user.cursorTodos.edges.length !== 0) {
      setAfter(
        data?.user.cursorTodos.edges.map((edge: any) => edge).slice(-1)[0]
          .cursor
      );
      setNextPage(data?.user.cursorTodos.pageInfo.hasNextPage || false);
    }
  }, [data]);

  if (error) return <p>`Error! ${error.message}`</p>;

  const getData = (search?: string) => {
    getTodos({
      variables: {
        userId: params.userId || "",
        search: search,
        first: 0,
        after,
      },
    });
  };

  const handleLoadMore = () => {
    if (nextPage) {
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
            <CreateTodo user={data.user} getData={getData} />
            <TodosWrapper>
              <CursorTodoItems
                user={data.user}
                // todos={data.user.cursorTodos.edges}
                onLoadMore={handleLoadMore}
                end={nextPage}
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
  display: grid;
  place-content: center;
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

gql`
  fragment CursorTodoItems_Todo on User {
    id
    cursorTodos {
      edges {
        node {
          id
          text
          completed
          ...EditTodoText_Todo
          ...DeleteTodo_Todo
          ...ToggleCompleteTodo_Todo
        }
        cursor
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;
