/** @jsxImportSource @emotion/react */
import { gql } from "@apollo/client";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAllUsersQuery } from "../gql/generated/graphql";
import { Card, Button } from "@mui/material";
import { css } from "@emotion/react";
import Spinner from "../components/atoms/Spinner";
import Nav from "../components/atoms/Nav";

gql`
  query allUsers {
    allUsers {
      id
    }
  }
`;

const UserList = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useAllUsersQuery({});

  return (
    <>
      <UserListContainer>
        <Nav />
        <TextWrapper>👷🏻‍♂️ UserList 🔎</TextWrapper>
        <TodosContainer>
          {loading ? (
            <Spinner />
          ) : (
            data?.allUsers.map((user) => {
              return (
                <Card key={user.id} variant="outlined" css={cardStyle}>
                  <h2>{user.id}</h2>
                  <Button
                    onClick={() => {
                      navigate(`cursor/@${user.id}`);
                    }}
                  >
                    cursor
                  </Button>
                  <Button
                    onClick={() => {
                      navigate(`/offset/@${user.id}`);
                    }}
                  >
                    offset
                  </Button>
                </Card>
              );
            })
          )}
        </TodosContainer>
        <ErrorContainer>{error && <p>{error.message}</p>}</ErrorContainer>
      </UserListContainer>
    </>
  );
};

export default UserList;

const UserListContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100%;
`;

const TextWrapper = styled.h1`
  font-size: large;
  font-weight: bold;
  color: skyblue;
  margin-bottom: 10px;
  margin-top: 20px;
`;

const TodosContainer = styled.div`
  height: 600px;
  width: 100%;
  /* overflow: auto;
  padding: 32px;
  margin: auto; */
`;

const cardStyle = css`
  display: grid;
  width: 200px;
  height: 150px;
  place-items: start;
  background-color: #ffffff;
  border-radius: 5px;

  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.09); */

  h2 {
    font-size: large;
    color: #74c0fc;
  }
`;

const ErrorContainer = styled.p`
  margin-top: 20px;
  p {
    color: rebeccapurple;
  }
`;
