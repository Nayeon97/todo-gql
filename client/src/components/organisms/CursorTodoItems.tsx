import { gql } from "@apollo/client";
import styled from "styled-components";
import { CursorTodoItems_TodoFragment } from "../../gql/generated/graphql";
import TodoItem from "../molecules/TodoItem";

interface TodoItemsProps {
  user: CursorTodoItems_TodoFragment;
  end: boolean;
  onLoadMore: () => void;
}

const CursorTodoItems = ({ user, end, onLoadMore }: TodoItemsProps) => {
  return (
    <>
      <TodoItemsContainer>
        {user.cursorTodos.edges.map((todo) => {
          return <TodoItem key={todo.node.id} todo={todo} user={user} />;
        })}
        {end && (
          <ViewMoreButton>
            <button onClick={onLoadMore}>더보기</button>
          </ViewMoreButton>
        )}
      </TodoItemsContainer>
    </>
  );
};

export default CursorTodoItems;

const TodoItemsContainer = styled.div`
  height: 500px;
  overflow: auto;
`;

const ViewMoreButton = styled.div`
  display: grid;
  width: 450px;
  place-items: center;
  button {
    background-color: skyblue;
    padding: 10px;
    border-radius: 25px;
    color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.09);
  }
`;

gql`
  fragment CursorTodoItems_Todo on User {
    id
    cursorTodos {
      edges {
        node {
          id
          text
          completed
          ...EditTodoText_Todo
          ...DeleteTodo_Todo
          ...ToggleCompleteTodo_Todo
        }
        cursor
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;
