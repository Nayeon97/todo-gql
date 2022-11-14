import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import TodoComplete from "./components/CompleteTodo";
import DeleteTodo from "./components/DeleteTodo";
import TodoInput from "./components/TodoInput";
import TodoItem from "./components/TodoItem";

export const GetAllTodos = gql`
  query getTodos {
    allTodos {
      id
      text
      toggleComplete
    }
  }
`;

const Todos = () => {
  const { data, loading, error } = useQuery(GetAllTodos); //

  if (loading) return "Loading";
  if (error) return `Error! ${error}`;

  return (
    <AppContainer>
      <TodosContainer>
        <TodoInput />
        {data?.allTodos.map((todo) => (
          <TodoItemContainer key={todo.id}>
            <TodoComplete toggleComplete={todo.toggleComplete} id={todo.id} />
            <TodoItem todo={todo} />
            <DeleteTodo id={todo.id} />
          </TodoItemContainer>
        ))}
      </TodosContainer>
    </AppContainer>
  );
};

export default Todos;

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

const TodoItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 10px;
`;
