import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const User = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [getTodos, setGetTodos] = useState<string>("");

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setGetTodos(event.currentTarget.name);
    navigate(`todos`);
  };

  return (
    <Container>
      <ButtonWrapper>
        <button name={"cursor"} onClick={onClick}>
          cursorPagination
        </button>
      </ButtonWrapper>
      <ButtonWrapper>
        <button name={"offset"} onClick={onClick}>
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
