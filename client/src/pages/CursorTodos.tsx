import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CreateSearchTodo from "../components/molecules/cursor/CreateSearchTodo";
import CursorTodoItems from "../components/organisms/CursorTodoItems";
import Spinner from "../components/atoms/Spinner";
import {
  InputMaybe,
  Sort,
  useGetCursorTodosLazyQuery,
} from "../gql/generated/graphql";
import { gql } from "@apollo/client";
import OrderByTodo from "../components/molecules/cursor/OrderbyTodos";

gql`
  query getCursorTodos(
    $userId: ID!
    $first: Int
    $after: String
    $search: String
    $orderBy: TodoOrderByInput
  ) {
    user(id: $userId) {
      id
      cursorTodos(
        first: $first
        after: $after
        search: $search
        orderBy: $orderBy
      ) {
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
  const [search, setSearch] = useState<string>("");
  const [getTodos, { data, error, loading, fetchMore }] =
    useGetCursorTodosLazyQuery({
      variables: {
        userId: params.userId || "",
        search,
        first: 0,
        after,
      },
    });

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    if (data) {
      console.log("useEffect get Cursor");
      setAfter(
        data?.user.cursorTodos.edges.map((edge: any) => edge).slice(-1)[0]
          .cursor
      );
      setNextPage(data?.user.cursorTodos.pageInfo.hasNextPage || false);
    }
  }, [data, search]);

  if (error) return <p>`Error! ${error.message}`</p>;

  const getData = (
    search?: string,
    orderByText?: InputMaybe<Sort>,
    orderByCompleted?: InputMaybe<Sort>
  ) => {
    setSearch(search || "");
    getTodos({
      variables: {
        userId: params.userId || "",
        search,
        first: 0,
        after,
        orderBy: {
          text: orderByText,
          completed: orderByCompleted,
        },
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
              <CursorTodoItems
                user={data.user}
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
  margin-top: 20px;
`;

const TodosWrapper = styled.div`
  height: 350px;
  margin-top: 30px;
  margin-bottom: 20px;
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
