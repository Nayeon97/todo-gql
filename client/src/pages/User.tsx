import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const User = () => {
  const navigate = useNavigate();

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`${event.currentTarget.name}`);
  };

  return (
    <Container>
      <ButtonWrapper>
        <button name={"cursor-todos"} onClick={onClick}>
          cursorPagination
        </button>
      </ButtonWrapper>
      <ButtonWrapper>
        <button name={"offset-todos"} onClick={onClick}>
          offsetPagination
        </button>
      </ButtonWrapper>
    </Container>
  );
};

export default User;

const Container = styled.div`
  display: grid;
  justify-items: center;
  padding-top: 60px;
`;

const ButtonWrapper = styled.div`
  margin-bottom: 20px;
  border-radius: 5px;
  padding: 10px 20px;
  background-color: skyblue;
`;
