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
  const [getUser] = useLazyQuery(GET_USERS, {
    onCompleted: () => {
      navigate(`user/${userId}`);
    },
    onError: (error) => {
      // 입력한 userId 없다고 tostify ? 하면될듯
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
        <Input
          type="text"
          value={userId}
          onChange={onChange}
          onKeyPress={handleKeyPress}
        />
      </div>
    </TodosContainer>
  );
};

export default SearchUser;

const TodosContainer = styled.div`
  display: grid;
  place-items: center;
  padding-top: 60px;
`;
