import React from "react";
import styled from "styled-components";

const Input = (name, value, onChange, type) => {
  return (
    <InputWrapper type={type} name={name} value={value} onChange={onChange} />
  );
};

export default Input;

const InputWrapper = styled.input`
  width: 300px;
  height: 20px;
  color: black;
  background-color: #f1f3f5;
  padding: 20px;
  border: none;
  border-radius: 10px;
  outline: none;
  font-size: 15px;
  cursor: text;
`;
