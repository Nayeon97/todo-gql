import { useState } from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import TodoItem from "../components/organisms/TodoItem";
import { Todo } from "../gql/generated/graphql";
import CreateTodo from "../components/molecules/CreateTodo";
import EditTodo from "../components/molecules/EditTodo";
import Spinner from "../components/atoms/Spinner";

const GET_TODOS = gql`
  query getUser($userId: ID!, $offset: Int, $limit: Int) {
    user(id: $userId) {
      totalTodoCount
      offsetTodos(offset: $offset, limit: $limit) {
        id
        text
        completed
      }
    }
  }
`;

const Todos = () => {
  const params = useParams();
  const [page, setPage] = useState(1);
  const { data, error, loading } = useQuery(GET_TODOS, {
    variables: {
      userId: params.userId,
      offset: page * 10 - 10,
      limit: 5,
    },
  });

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<Todo[]>([]);

  if (error) return <p>`Error! ${error.message}`</p>;

  return (
    <>
      <TodosContainer>
        <CreateTodo data={data?.user.totalTodoCount} />
        <TodosWrapper>
          {loading ? (
            <Spinner />
          ) : (
            data?.user.offsetTodos.map((todo: Todo) => {
              return (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  isEdit={isEdit}
                  setIsEdit={setIsEdit}
                  setEditTodo={setEditTodo}
                />
              );
            })
          )}
        </TodosWrapper>
      </TodosContainer>
      <ButtonContainer>
        <ButtonWrapper>
          <button onClick={() => setPage((prev) => prev - 1)}>pre</button>
        </ButtonWrapper>
        <ButtonWrapper>
          <button onClick={() => setPage((prev) => prev + 1)}>next</button>
        </ButtonWrapper>
      </ButtonContainer>
      {isEdit && <EditTodo editTodo={editTodo} setIsEdit={setIsEdit} />}
    </>
  );
};

export default Todos;

gql`
  query getTodos {
    allTodos {
      ...TodoItem_Todo
    }
  }
`;

const TodosContainer = styled.div`
  display: grid;
  justify-items: center;
  padding-top: 60px;
`;

const TodosWrapper = styled.div`
  height: 350px;
  margin-top: 30px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
`;

const ButtonWrapper = styled.button`
  width: 50px;
  height: 50px;
  margin-bottom: 20px;
  border-radius: 50px;
  padding: 10px 10px;
  background-color: #f1f3f5;
`;
