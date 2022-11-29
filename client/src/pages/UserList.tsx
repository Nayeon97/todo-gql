import { gql } from "@apollo/client";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAllUsersQuery } from "../gql/generated/graphql";
import Spinner from "../components/atoms/Spinner";

gql`
  query allUsers {
    allUsers {
      id
    }
  }
`;

const SearchUser = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useAllUsersQuery({});

  return (
    <div>
      <TextWrapper>👷🏻‍♂️ UserList 🔎</TextWrapper>
      <TodosContainer>
        {loading ? (
          <Spinner />
        ) : (
          data?.allUsers.map((user) => {
            return (
              <UserCard>
                <div>{user.id}</div>
                <div>
                  <button
                    onClick={() => {
                      navigate(`cursor/${user.id}`);
                    }}
                  >
                    cursor
                  </button>
                  <button
                    onClick={() => {
                      navigate(`offset/${user.id}`);
                    }}
                  >
                    offset
                  </button>
                </div>
              </UserCard>
            );
          })
        )}
      </TodosContainer>
      <ErrorContainer>{error && <p>{error.message}</p>}</ErrorContainer>
    </div>
  );
};

export default SearchUser;

const TextWrapper = styled.h1`
  font-size: large;
  font-weight: bold;
  color: skyblue;
  margin-bottom: 10px;
`;

const TodosContainer = styled.div`
  position: absolute;
  display: grid;
  place-items: center;
  height: 500px;
  width: 100%;
  overflow: auto;
  padding: 40px 0px;
`;

const ErrorContainer = styled.p`
  margin-top: 20px;
  p {
    color: rebeccapurple;
  }
`;

const UserCard = styled.div`
  display: grid;
  width: 300px;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  background-color: transparent;
  border-radius: 5px;
  margin: 10px 10px;
  padding: 10px 0px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.09);
`;
