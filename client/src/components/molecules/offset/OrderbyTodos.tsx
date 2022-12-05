import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { InputMaybe, Sort } from "../../../gql/generated/graphql";

interface OrderByTodoProps {
  handleOrderByTodos: (
    orderByText: InputMaybe<Sort>,
    orderByCompleted: InputMaybe<Sort>
  ) => void;
}

// TODO: 현재 활성화된 정렬 상태 표시하기
const OrderByTodo = ({ handleOrderByTodos }: OrderByTodoProps) => {
  const [clickText, setClickText] = useState(0);
  const [clickCompleted, setClickCompleted] = useState(0);

  const clickTextCount = () => {
    const click = clickText < 2 ? clickText + 1 : 0;
    setClickCompleted(0);
    setClickText(click);
    onClickOrderByText(click);
  };

  const clickCompletedCount = () => {
    const click = clickCompleted < 2 ? clickCompleted + 1 : 0;
    setClickText(0);
    setClickCompleted(click);
    onClickOrderByCompleted(click);
  };

  const onClickOrderByText = (click: number) => {
    const text = click === 1 ? Sort.Asc : click === 2 ? Sort.Desc : null;
    handleOrderByTodos(text, null);
  };

  const onClickOrderByCompleted = (click: number) => {
    const completed = click === 1 ? Sort.Asc : click === 2 ? Sort.Desc : null;
    handleOrderByTodos(null, completed);
  };

  return (
    <>
      <ButtonContainer>
        <ButtonWrapper>
          <Button
            variant={clickText === 0 ? "outlined" : "contained"}
            value={clickText === 1 ? "asc" : clickText === 2 ? "desc" : "null"}
            onClick={clickTextCount}
          >
            {clickText === 1 ? "asc" : clickText === 2 ? "desc" : "text 정렬"}
          </Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <Button
            variant={clickCompleted === 0 ? "outlined" : "contained"}
            value={
              clickCompleted === 1
                ? "asc"
                : clickCompleted === 2
                ? "desc"
                : "null"
            }
            onClick={clickCompletedCount}
          >
            {clickCompleted === 1
              ? "asc"
              : clickCompleted === 2
              ? "desc"
              : "completed 정렬"}
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
