import React from "react";
import styled from "styled-components";

interface InputProps {
  value: string;
  type: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input = ({
  value,
  type,
  placeholder,
  onChange,
  onKeyPress,
}: InputProps) => {
  return (
    <InputWrapper
      value={value}
      onChange={onChange}
      type={type}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
    />
  );
};

export default Input;

const InputWrapper = styled.input`
  width: 400px;
  height: 20px;
  color: black;
  background-color: rgb(247, 247, 250);
  border: red 20px;
  padding: 15px;
  border-radius: 10px;
  font-size: 15px;
  cursor: text;
`;
