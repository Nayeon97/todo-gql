import React from "react";
import styled from "styled-components";
import { Todo } from "../../../gql/generated/graphql";

interface ButtonProps {
  name: string;
  disabled?: boolean;
  btnType: string;
  onClick: () => void;
}

const Button = ({ name, disabled, onClick, btnType }: ButtonProps) => {
  return (
    <ButtonWrapper disabled={disabled} onClick={onClick} btnType={btnType}>
      {name}
    </ButtonWrapper>
  );
};

export default Button;

// btnType : delete(삭제), edit(편집), incomplete(미완료)
const ButtonWrapper = styled.button<{ btnType: string }>`
  min-width: 70px;
  font-size: 15px;
  padding: 10px 10px;
  border-radius: 5px;
  outline: none;
  color: ${(props) => {
    switch (props.btnType) {
      case "delete":
        return "#FF6363";
      case "edit":
        return "#A3DA8D";
      case "incomplete":
        return "#FFAB76";
      case "complete":
        return "white";
      case "default":
        return "black";
    }
  }};

  &:disabled {
    cursor: default;
    opacity: 0.5;
    color: white;
  }
`;
