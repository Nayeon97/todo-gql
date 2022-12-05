import React, { useState } from "react";
import styled from "styled-components";
import { InputMaybe, Sort } from "../../../gql/generated/graphql";

interface OrderByTodoProps {
  handleOrderByTodos: (
    orderByText: InputMaybe<Sort>,
    orderByCompleted: InputMaybe<Sort>
  ) => void;
}

// TODO: 현재 활성화된 정렬 상태 표시하기
const OrderByTodo = ({ handleOrderByTodos }: OrderByTodoProps) => {
  const onClickOrderByText = (e: React.MouseEvent<HTMLButtonElement>) => {
    const text = e.currentTarget.value === "asc" ? Sort.Asc : Sort.Desc;
    handleOrderByTodos(text, null);
  };

  const onClickOrderByCompleted = (e: React.MouseEvent<HTMLButtonElement>) => {
    const completed = e.currentTarget.value === "asc" ? Sort.Asc : Sort.Desc;
    handleOrderByTodos(null, completed);
  };

  return (
    <>
      <ButtonContainer>
        <ButtonWrapper>
          <Button value={"asc"} onClick={onClickOrderByText}>
            text asc
          </Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <Button value='desc' onClick={onClickOrderByText}>
            text desc
          </Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <Button value='asc' onClick={onClickOrderByCompleted}>
            completed asc
          </Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <Button value='desc' onClick={onClickOrderByCompleted}>
            completed desc
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

const Button = styled.button`
  background-color: #a5d8ff;
  color: #ffffff;
  padding: 10px 2px;
  width: 100px;
  border-radius: 10px;
  font-size: 15px;
`;
