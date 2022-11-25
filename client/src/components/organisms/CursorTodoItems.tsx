import { useState } from "react";
import { gql } from "@apollo/client";
import styled from "styled-components";
import {
  CursorTodoItems_TodoFragment,
  Todo,
} from "../../gql/generated/graphql";
import Button from "../atoms/Button/Button";
import DeleteTodo from "../molecules/DeleteTodo";
import ToggleCompleteTodo from "../molecules/ToggleCompleteTodo";
import EditTodo from "../molecules/EditTodo";

interface TodoItemsProps {
  user: CursorTodoItems_TodoFragment;
  end: boolean;
  onLoadMore: () => void;
}

const CursorTodoItems = ({ user, end, onLoadMore }: TodoItemsProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<Todo[]>([]);

  return (
    <>
      <TodoItemsContainer>
        {user.cursorTodos.edges.map((todo) => {
          return (
            <TodoItemContainer
              completed={todo.node.completed}
              key={todo.node.id}
            >
              <ToggleCompleteTodo todo={todo.node} isEdit={isEdit} />
              <TextWrapper id={todo.node.id} completed={todo.node.completed}>
                {todo.node.text}
              </TextWrapper>
              <Button
                onClick={() => {
                  setIsEdit(true);
                  setEditTodo([todo.node]);
                }}
                name="edit"
                btnType="edit"
                disabled={
                  isEdit ? true : false || todo.node.completed ? true : false
                }
              />
              <DeleteTodo user={user} setIsEdit={setIsEdit} todo={todo.node} />
            </TodoItemContainer>
          );
        })}
        {end && (
          <ViewMoreButton>
            <button onClick={onLoadMore}>더보기</button>
          </ViewMoreButton>
        )}
      </TodoItemsContainer>
      {isEdit && (
        <EditTodo editTodo={editTodo} setIsEdit={setIsEdit} user={user} />
      )}
    </>
  );
};

export default CursorTodoItems;

const TodoItemsContainer = styled.div`
  height: 500px;
  overflow: auto;
`;

const TodoItemContainer = styled.div<{ completed: boolean }>`
  display: grid;
  width: 450px;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  background-color: ${(props) => (props.completed ? "#d3d3d3" : "transparent")};
  border-radius: 5px;
  margin: 10px 10px;
  padding: 10px 0px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.09);
`;

const TextWrapper = styled.div<{ completed: boolean }>`
  width: 200px;
  margin: 0px 20px;
  color: ${(props) => (props.completed ? "white" : "black")};
  text-decoration: ${(props) => (props.completed ? "line-through" : "")};
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
