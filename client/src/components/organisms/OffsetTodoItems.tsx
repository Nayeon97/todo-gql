import React from 'react';
import { gql } from '@apollo/client';
import styled from 'styled-components';
import {
  OffsetTodoItems_UserFragment,
  InputMaybe,
  Sort,
} from '../../gql/generated/graphql';
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Paper,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  Pagination,
} from '@mui/material';
import TodoItem from '../molecules/offset/TodoItem';

interface TodoItemsProps {
  user: OffsetTodoItems_UserFragment;
  handleOrderByTodos: (
    orderByText: InputMaybe<Sort>,
    orderByCompleted: InputMaybe<Sort>
  ) => void;
  onClickRefetchTodos: (offset: number) => void;
  limit: string;
  page: number;
  handleLimit: (limit: string) => void;
}

const OffsetTodoItems = ({
  user,
  onClickRefetchTodos,
  limit,
  handleLimit,
  page,
}: TodoItemsProps) => {
  // page는 state로 관리하기 보다 부모 컴포넌트에서 관리하는게 좋다.
  // 상태관리 2개에서 1개로 관리하는게 좋다

  if (!user.offsetTodos.length) {
    return (
      <div>
        <div>⚠️ todo 없다는 것 보여주기</div>
      </div>
    );
  }

  const handleChangeLimit = (event: SelectChangeEvent) => {
    const limit = event.target.value as string;
    handleLimit(limit);
  };

  const changePage = (p: number) => {
    onClickRefetchTodos(p);
  };

  return (
    <TableContainer component={Paper} sx={{ width: '800px', padding: '20px' }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>완료여부</TableCell>
            <TableCell align="left">할 일 </TableCell>
            <TableCell align="left">수정</TableCell>
            <TableCell align="left">삭제</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.offsetTodos.map((todo) => {
            return <TodoItem key={todo.id} todo={todo} user={user} />;
          })}
        </TableBody>
      </Table>
      <SelectContainer>
        <Pagination
          page={page}
          count={user.totalTodoCount / Number(limit)}
          onChange={(_, page) => {
            changePage(page);
          }}
        />
        <span>{user.totalTodoCount}개 중 </span>
        <FormControl sx={{ marginBottom: '30px', padding: '0px' }} size="small">
          <Select value={limit} onChange={handleChangeLimit}>
            <MenuItem value={10}>10개씩 보기</MenuItem>
            <MenuItem value={20}>20개씩 보기</MenuItem>
          </Select>
        </FormControl>
      </SelectContainer>
    </TableContainer>
  );
};

export default OffsetTodoItems;

const SelectContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: end;
  margin-top: 20px;

  span {
    margin: 10px 8px;
    color: #69696f;
  }
`;

gql`
  fragment OffsetTodoItems_User on User {
    id
    offsetTodos {
      ...TodoItem_Todo
    }
    totalTodoCount
  }
`;
