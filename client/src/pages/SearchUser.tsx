import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useState } from "react";
import styled from "styled-components";
import Input from "../components/atoms/Input/Input";
import { useNavigate } from "react-router-dom";

const GET_USERS = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      id
    }
  }
`;

const SearchUser = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [getUser, { error }] = useLazyQuery(GET_USERS, {
    onCompleted: () => {
      navigate(`user/offset-todos/${userId}`);
    },
    fetchPolicy: "network-only",
  });

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUserId(e.currentTarget.value);
  };

  const onSearch = () => {
    getUser({
      variables: {
        userId,
      },
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <TodosContainer>
      <div>
        <TextWrapper>👷🏻‍♂️ Search UserID 🔎</TextWrapper>
        <Input
          type="text"
          value={userId}
          onChange={onChange}
          onKeyPress={handleKeyPress}
        />
        <ErrorContainer>{error && <p>{error.message}</p>}</ErrorContainer>
      </div>
    </TodosContainer>
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
  height: 100%;
  width: 100%;
`;

const ErrorContainer = styled.p`
  margin-top: 20px;
  p {
    color: rebeccapurple;
  }
`;
