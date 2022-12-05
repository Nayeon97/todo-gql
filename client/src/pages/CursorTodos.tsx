import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CreateSearchTodo from "../components/molecules/cursor/CreateSearchTodo";
import CursorTodoItems from "../components/organisms/CursorTodoItems";
import Spinner from "../components/atoms/Spinner";
import {
  InputMaybe,
  Sort,
  useGetCursorTodosQuery,
} from "../gql/generated/graphql";
import { gql, NetworkStatus } from "@apollo/client";
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
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");

  const { data, error, fetchMore, refetch, networkStatus } =
    useGetCursorTodosQuery({
      variables: {
        userId: params.userId || "",
        search,
        first: 0,
        after: "",
      },
      notifyOnNetworkStatusChange: true,
    });

  const after =
    data?.user?.cursorTodos?.edges?.[data.user.cursorTodos.edges.length - 1]
      ?.cursor;
  const hasNextPage = data?.user?.cursorTodos?.pageInfo?.hasNextPage ?? false;

  if (error) return <p>`Error! ${error.message}`</p>;

  const getData = (
    search?: string,
    orderByText?: InputMaybe<Sort>,
    orderByCompleted?: InputMaybe<Sort>
  ) => {
    setSearch(search || "");
    refetch({
      userId: params.userId || "",
      search,
      first: 0,
      after,
      orderBy: {
        text: orderByText,
        completed: orderByCompleted,
      },
    });
  };

  const handleLoadMore = () => {
    if (!hasNextPage) {
      return;
    }

    fetchMore({ variables: { after: after } });
  };

  return (
    <Container>
      {networkStatus === NetworkStatus.loading ? (
        <Spinner />
      ) : (
        data && (
          <>
            <ButtonWrapper>
              <button
                onClick={() => {
                  navigate("/");
                }}
              >
                navigate userList
              </button>
            </ButtonWrapper>
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
                  end={hasNextPage}
                />
                {networkStatus === NetworkStatus.fetchMore && <Spinner />}
              </TodosWrapper>
            </TodosContainer>
          </>
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

const ButtonWrapper = styled.div`
  margin-top: 20px;
  button {
    font-size: 15px;
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
