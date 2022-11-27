import React from 'react';
import styled from 'styled-components';

interface InputProps {
  value: string;
  type: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input = ({ value, type, onChange, onKeyPress }: InputProps) => {
  return (
    <InputWrapper
      value={value}
      onChange={onChange}
      type={type}
      onKeyPress={onKeyPress}
    />
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
  font-size: 15px;
  cursor: text;
`;
