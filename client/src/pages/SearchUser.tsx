import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { useState } from 'react';
import styled from 'styled-components';
import Input from '../components/atoms/Input/Input';
import { useNavigate } from 'react-router-dom';

const GET_USERS = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      id
    }
  }
`;

const SearchUser = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [getUser, { error }] = useLazyQuery(GET_USERS, {
    onCompleted: () => {
      navigate(`user/cursor-todos/${userId}`);
    },
    fetchPolicy: 'network-only',
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
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <TodosContainer>
      <TextWrapper>👷🏻‍♂️ UserID</TextWrapper>
      <div>
        <Input
          type="text"
          value={userId}
          onChange={onChange}
          onKeyPress={handleKeyPress}
        />
      </div>
      <ErrorContainer>{error && <p>{error.message}</p>}</ErrorContainer>
    </TodosContainer>
  );
};

export default SearchUser;

const TextWrapper = styled.div`
  margin-bottom: 20px;
  font-size: large;
  font-weight: bold;
  color: skyblue;
`;

const TodosContainer = styled.div`
  display: grid;
  place-items: center;
  padding-top: 60px;
`;

const ErrorContainer = styled.div`
  margin-top: 20px;
  p {
    color: rebeccapurple;
  }
`;
