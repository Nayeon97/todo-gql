/** @jsxImportSource @emotion/react */
import { gql } from '@apollo/client';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAllUsersQuery } from '../gql/generated/graphql';
import { Button } from '@mui/material';
import Spinner from '../components/atoms/Spinner';

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
    <UserListContainer>
      <TextWrapper>👷🏻‍♂️ UserList 🔎</TextWrapper>
      <TodosContainer>
        {loading ? (
          <Spinner />
        ) : (
          data?.allUsers.map((user) => {
            return (
              <UserCard key={user.id}>
                <UserIdWrapper>{user.id}</UserIdWrapper>
                <div>
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
                </div>
              </UserCard>
            );
          })
        )}
      </TodosContainer>
      <ErrorContainer>{error && <p>{error.message}</p>}</ErrorContainer>
    </UserListContainer>
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
  display: grid;
  grid-template-columns: repeat(3, 0.5fr);
  place-items: center;
  height: 600px;
  width: 100%;
  overflow: auto;
`;

const ErrorContainer = styled.p`
  margin-top: 20px;
  p {
    color: rebeccapurple;
  }
`;

const UserCard = styled.div`
  display: grid;
  width: 150px;
  height: 100px;
  place-items: center;
  background-color: transparent;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.09);
`;

const UserIdWrapper = styled.h2`
  font-size: large;
  color: #74c0fc;
`;
