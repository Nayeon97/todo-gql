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
      console.log(error.message); // 입력한 userId 없다고 tostify ? 하면될듯
    },
    fetchPolicy: "network-only",
  });

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUserId(e.currentTarget.value);
  };

  const onClick = () => {
    getUser({
      variables: {
        userId,
      },
    });
  };

  return (
    <TodosContainer>
      <div>
        <div>user Todo 검색 기능</div>
        <Input type="text" value={userId} onChange={onChange} />
        <button onClick={onClick}>검색</button>
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
