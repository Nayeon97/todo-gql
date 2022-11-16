import styled from "styled-components";
import TodoInput from "../components/molecules/TodoInput";
import TodoItem from "../components/organisms/TodoItem";
import { useGetTodosQuery } from "./Todos.generated";

const Todos = () => {
  const { data, error } = useGetTodosQuery();

  if (error) return <p>`Error! ${error.message}`</p>;

  return (
    <AppContainer>
      <TodosContainer>
        <TodoInput />
        {data?.allTodos.map((todo) => {
          return <TodoItem todo={todo} />;
        })}
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
