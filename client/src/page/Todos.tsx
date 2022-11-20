import { useState } from "react";
import styled from "styled-components";
import CreateTodo from "../components/molecules/CreateTodo";
import TodoItem from "../components/organisms/TodoItem";
import { Todo } from "../gql/generated/graphql";
import { useGetTodosQuery } from "../gql/generated/graphql";
import { gql } from "@apollo/client";
import EditTodo from "../components/molecules/EditTodo";

const Todos = () => {
  const { data, error, loading } = useGetTodosQuery();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<Todo[]>([]);

  if (error) return <p>`Error! ${error.message}`</p>;

  return (
    <AppContainer>
      <TodosContainer>
        <CreateTodo data={data?.allTodos.length} />
        <TodoItemsContainer>
          {loading ? (
            <div>Loading...</div>
          ) : (
            data?.allTodos.map((todo) => {
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
        </TodoItemsContainer>
      </TodosContainer>
      {isEdit && <EditTodo editTodo={editTodo} setIsEdit={setIsEdit} />}
    </AppContainer>
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

const AppContainer = styled.div`
  width: 500px;
  height: 700px;
  position: relative;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.09);
  margin: 0 auto;
  margin-top: 50px;
  overflow: auto;
`;

const TodosContainer = styled.div`
  display: grid;
  justify-items: center;
  padding-top: 60px;
`;

const TodoItemsContainer = styled.div`
  overflow: auto;
  margin: 20px 0px;
  height: 300px;
`;
