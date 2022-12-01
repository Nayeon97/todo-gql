/** @jsxImportSource @emotion/react */
import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';

interface ToggleSearchProps {
  setAlignment: Dispatch<SetStateAction<string>>;
}

const ToggleSearch = ({ setAlignment }: ToggleSearchProps) => {
  const changeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAlignment(e.target.value);
  };

  return (
    <SelectContainer onChange={changeSelect}>
      <option value="create">create</option>
      <option value="search">search</option>
    </SelectContainer>
  );
};

export default ToggleSearch;

const SelectContainer = styled.select`
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 10px;
  border: none;
  background-color: skyblue;
  border-radius: 10px;
  font-size: 15px;
  color: white;
`;
