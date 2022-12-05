import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { InputMaybe, Sort } from '../../../gql/generated/graphql';
import { useSearchParams } from 'react-router-dom';

interface OrderByTodoProps {
  handleOrderByTodos: (
    orderByText: InputMaybe<Sort>,
    orderByCompleted: InputMaybe<Sort>
  ) => void;
}

// TODO: 현재 활성화된 정렬 상태 표시하기
const OrderByTodo = ({ handleOrderByTodos }: OrderByTodoProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const text =
    searchParams.get('text') === 'asc'
      ? 'asc'
      : searchParams.get('text') === 'desc'
      ? 'desc'
      : 'orderByText';

  const completed =
    searchParams.get('completed') === 'asc'
      ? 'asc'
      : searchParams.get('completed') === 'desc'
      ? 'desc'
      : 'orderByCompleted';

  const clickTextCount = () => {
    const orderByText =
      text === 'orderByText' ? Sort.Asc : text === 'asc' ? Sort.Desc : null;
    handleOrderByTodos(orderByText, null);
  };

  const clickCompletedCount = () => {
    const orderByCompleted =
      completed === 'orderByCompleted'
        ? Sort.Asc
        : completed === 'asc'
        ? Sort.Desc
        : null;
    handleOrderByTodos(null, orderByCompleted);
  };

  return (
    <>
      <ButtonContainer>
        <ButtonWrapper>
          <Button
            variant={text === 'orderByText' ? 'outlined' : 'contained'}
            onClick={clickTextCount}
          >
            {text}
          </Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <Button
            variant={
              completed === 'orderByCompleted' ? 'outlined' : 'contained'
            }
            onClick={clickCompletedCount}
          >
            {completed}
          </Button>
        </ButtonWrapper>
      </ButtonContainer>
    </>
  );
};

export default OrderByTodo;

const ButtonContainer = styled.div`
  display: grid;
  place-content: start;
  grid-auto-flow: column;
  margin-top: 5px;
`;

const ButtonWrapper = styled.div`
  margin-right: 10px;
`;
