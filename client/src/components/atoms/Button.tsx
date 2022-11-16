import styled from "styled-components";

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

// btnType : delete(삭제), edit(편집),

const ButtonWrapper = styled.button<{ btnType: string }>`
  font-size: 15px;
  color: ${(props) => {
    switch (props.btnType) {
      case "delete":
        return "blue";
      case "edit":
        return "green";
      case "inComplete":
        return "red";
      case "default":
        return "black";
    }
  }};
  &:disabled {
    cursor: default;
    opacity: 0.5;
    color: white;
    background-color: #ced4da;
  }
`;
