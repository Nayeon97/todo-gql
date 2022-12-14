import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { gql } from "@apollo/client";
import styled from "styled-components";
import CreateSearchTodo from "../components/molecules/offset/CreateSearchTodo";
import OffsetTodoItems from "../components/organisms/OffsetTodoItems";
import OrderByTodo from "../components/molecules/offset/OrderbyTodos";
import ToggleSearch, { Alignment } from "../components/atoms/ToggleSearch";
import Spinner from "../components/atoms/Spinner";
import {
  InputMaybe,
  OffsetTodoItems_TodoFragment,
  Sort,
  useGetOffsetTodosQuery,
} from "../gql/generated/graphql";

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

type List = OffsetTodoItems_TodoFragment;

const OffsetTodos = () => {
  const navigate = useNavigate();
  const params = useParams();
  // useState로 생각하고 하면 됨
  const [searchParams, setSearchParams] = useSearchParams();

  // 타입을 더 강하게 사용가능하면 강하게
  const [alignment, setAlignment] = useState<Alignment>("create");

  // 상태관리는 2개에서 1개로 하거나 아니면 2개 상태를 sync 해주는게 좋다
  const [limit, setLimit] = useState("10");

  const { data, loading, fetchMore, refetch } = useGetOffsetTodosQuery({
    variables: {
      userId: params.userId || "",
      offset: 0,
      limit: 10,
      search: null,
    },
  });

  const getParams = () => {
    const paramsSearch = searchParams.get("search");
    const paramsOffset = Number(searchParams.get("offset"));
    const paramsLimit = Number(searchParams.get("limit"));

    return { paramsSearch, paramsOffset, paramsLimit };
  };

  // refetch 비슷하게 변경
  const handleLoadMore = (offset: number) => {
    const { paramsSearch } = getParams();
    // const currentLength = data?.user?.offsetTodos.length || 0;
    refetch({
      offset: (offset - 1) * 10,
      limit: Number(limit),
    });
    setSearchParams({
      search: `${paramsSearch}`,
      offset: `${(offset - 1) * 10}`,
      limit: `${limit}`,
    });
  };

  const handleSearchTodos = (text: string) => {
    const { paramsOffset, paramsLimit } = getParams();

    if (params.userId) {
      refetch({
        userId: params.userId,
        offset: paramsOffset,
        limit: paramsLimit,
        search: text,
      });
    }

    setSearchParams({
      search: `${text}`,
      offset: `${paramsOffset}`,
      limit: `${paramsLimit}`,
    });
  };

  const handleOrderByTodos = (
    orderByText?: InputMaybe<Sort>,
    orderByCompleted?: InputMaybe<Sort>
  ) => {
    const { paramsSearch, paramsOffset, paramsLimit } = getParams();
    if (params.userId) {
      refetch({
        userId: params.userId,
        offset: paramsOffset,
        limit: paramsLimit,
        search: null,
        orderBy: {
          text: orderByText,
          completed: orderByCompleted,
        },
      });
    }
    setSearchParams({
      search: `${paramsSearch}`,
      offset: `${paramsOffset}`,
      limit: `${paramsLimit}`,
    });
  };

  const handleLimit = (changeLimit: string) => {
    if (params.userId) {
      refetch({
        userId: params.userId,
        offset: 0,
        limit: Number(changeLimit),
        search: null,
      });
    }

    setSearchParams({
      search: `${""}`,
      offset: `${0}`,
      limit: `${changeLimit}`,
    });
  };

  const { paramsSearch } = getParams();

  if (loading) return <Spinner />;
  if (!data) return null;

  return (
    <Container>
      <button onClick={() => navigate("/")}>userList</button>
      <TodosContainer>
        <ToggleSearch setAlignment={setAlignment} alignment={alignment} />
        <CreateSearchTodo
          user={data.user}
          alignment={alignment}
          handleSearchTodos={handleSearchTodos}
        />
        <OrderByTodo handleOrderByTodos={handleOrderByTodos} />
        {paramsSearch && (
          <SearchWrapper>
            검색 결과
            <p>{paramsSearch}</p>
          </SearchWrapper>
        )}
        <TodosWrapper>
          <OffsetTodoItems
            user={data.user}
            handleLoadMore={handleLoadMore}
            handleOrderByTodos={handleOrderByTodos}
            limit={limit}
            // setLimit, handleLimit 하나로 통합
            setLimit={setLimit}
            handleLimit={handleLimit}
          />
        </TodosWrapper>
      </TodosContainer>
    </Container>
  );
};

export default OffsetTodos;

const Container = styled.div`
  /* display: grid;
  place-content: center; */
`;

const TodosContainer = styled.div`
  /* display: grid;
  justify-items: center; */
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
