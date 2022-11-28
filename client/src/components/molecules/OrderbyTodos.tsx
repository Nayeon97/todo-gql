import React, { useState } from "react";
import styled from "styled-components";
import { InputMaybe, Sort } from "../../gql/generated/graphql";

interface OrderByTodoProps {
  search: string;
  getData: (
    search: string,
    orderByText: InputMaybe<Sort>,
    orderByCompleted: InputMaybe<Sort>
  ) => void;
}

const OrderByTodo = ({ getData, search }: OrderByTodoProps) => {
  const [orderByText, setOrderByText] = useState<InputMaybe<Sort>>(null);
  const [orderByCompleted, setOrderByCompleted] =
    useState<InputMaybe<Sort>>(null);

  const onClickOrderByText = (e: React.MouseEvent<HTMLButtonElement>) => {
    const text = e.currentTarget.value === "asc" ? Sort.Asc : Sort.Desc;
    setOrderByText(text);
    getData(search, text, orderByCompleted);
  };

  const onClickOrderByCompleted = (e: React.MouseEvent<HTMLButtonElement>) => {
    const completed = e.currentTarget.value === "asc" ? Sort.Asc : Sort.Desc;
    setOrderByCompleted(completed);
    getData(search, orderByText, completed);
  };

  return (
    <ButtonContainer>
      <ButtonWrapper>
        <Button value={"asc"} onClick={onClickOrderByText}>
          text asc
        </Button>
      </ButtonWrapper>
      <ButtonWrapper>
        <Button value="desc" onClick={onClickOrderByText}>
          text desc
        </Button>
      </ButtonWrapper>
      <ButtonWrapper>
        <Button value="asc" onClick={onClickOrderByCompleted}>
          completed asc
        </Button>
      </ButtonWrapper>
      <ButtonWrapper>
        <Button value="desc" onClick={onClickOrderByCompleted}>
          completed desc
        </Button>
      </ButtonWrapper>
    </ButtonContainer>
  );
};

export default OrderByTodo;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 5px;
`;

const ButtonWrapper = styled.div`
  margin-right: 10px;
`;

const Button = styled.button`
  background-color: pink;
  color: gray;
  font-weight: bold;
  padding: 2px;
  width: 100px;
  border-radius: 10px;
`;
