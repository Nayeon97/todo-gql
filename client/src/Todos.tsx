import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import ToggleCompleteTodo from "./components/ToggleCompleteTodo";
import DeleteTodo from "./components/DeleteTodo";
import TodoInput from "./components/TodoInput";
import TodoItem from "./components/TodoItem";
import { graphql } from "../src/gql";

interface TodoType {
  id: string;
  text: string;
  completed: boolean;
}

export const GetAllTodos = gql`
  query getTodos {
    allTodos {
      id
      text
      completed
    }
  }
`;

const Todos = () => {
  const { data, loading, error } = useQuery(GetAllTodos); // fragments 사용해보자.

  return (
    <AppContainer>
      <TodosContainer>
        <TodoInput />
        {data?.allTodos.map((todo: TodoType) => (
          <TodoItemContainer key={todo.id}>
            <ToggleCompleteTodo completed={todo.completed} id={todo.id} />
            <TodoItem completed={todo.completed} text={todo.text} />
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
