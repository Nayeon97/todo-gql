import styled from "styled-components";

const TodoItem = ({ todo }) => {
  return <TextWrapper completed={todo.completed}>{todo.text}</TextWrapper>;
};

export default TodoItem;

const TextWrapper = styled.div`
  min-width: 200px;
  margin: 0px 20px;
  color: ${(props) => (props.completed ? "lightgray" : "black")};
  text-decoration: ${(props) => (props.completed ? "line-through" : "")};
`;
