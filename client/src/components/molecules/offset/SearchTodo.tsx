import React, { useState } from "react";
import styled from "styled-components";

interface SearchTodoProps {
  handleSearchTodos: (search: string) => void;
}

const SearchTodo = ({ handleSearchTodos }: SearchTodoProps) => {
  const [text, setText] = useState("");

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearchTodos(text);
      }}
    >
      <InputWrapper
        type="text"
        value={text}
        onChange={onChange}
        placeholder="검색 키워드"
      />
    </form>
  );
};

export default SearchTodo;

const InputWrapper = styled.input`
  border: 2px black;
`;
