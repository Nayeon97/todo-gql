import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { gql } from "@apollo/client";
import styled from "styled-components";
import { InputLabel, MenuItem, FormControl } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CreateSearchTodo from "../components/molecules/offset/CreateSearchTodo";
import OffsetTodoItems from "../components/organisms/OffsetTodoItems";
import OrderByTodo from "../components/molecules/offset/OrderbyTodos";
import ToggleSearch from "../components/atoms/ToggleSearch";
import Spinner from "../components/atoms/Spinner";
import {
  InputMaybe,
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

// 따로 Limit 설정하는 select element 추가
// limit은 고정되어 있고, offset만 변경되는 것이므로
// search, orderByText 분리
// 1. 데이터 비어 있는 UI
// 2. 에러 처리하기 Query, Mutation

const OffsetTodos = () => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [alignment, setAlignment] = useState("create");
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

  const handleLoadMore = () => {
    const { paramsSearch } = getParams();
    const currentLength = data?.user?.offsetTodos.length || 0;
    fetchMore({
      variables: {
        offset: currentLength,
        limit: Number(limit),
      },
    }).then(() => {
      setLimit(limit);
      setSearchParams({
        search: `${paramsSearch}`,
        offset: `${data?.user?.offsetTodos.length}`,
        limit: `${limit}`,
      });
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
        search: paramsSearch,
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

  const handleChangeLimit = (event: SelectChangeEvent) => {
    setLimit(event.target.value as string);
  };

  const { paramsSearch } = getParams();

  return (
    <Container>
      {loading ? (
        <Spinner />
      ) : (
        data && (
          <TodosContainer>
            <ToggleSearch alignment={alignment} setAlignment={setAlignment} />
            <CreateSearchTodo
              user={data.user}
              alignment={alignment}
              handleSearchTodos={handleSearchTodos}
            />
            <OrderByTodo handleOrderByTodos={handleOrderByTodos} />
            <FormControl>
              <InputLabel>limit</InputLabel>
              <Select value={limit} label="limit" onChange={handleChangeLimit}>
                <MenuItem value={10}>10개씩 보기</MenuItem>
                <MenuItem value={20}>20개씩 보기</MenuItem>
              </Select>
            </FormControl>
            {paramsSearch && (
              <SearchWrapper>
                검색 결과
                <p>{paramsSearch}</p>
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

const ButtonWrapper = styled.button`
  margin-top: 20px;
  button {
    font-size: 15px;
  }
`;
