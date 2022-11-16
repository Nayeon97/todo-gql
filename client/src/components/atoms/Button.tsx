import styled from "styled-components";

interface ButtonProps {
  name: string;
  disabled?: boolean;
  onClick: () => void;
}

const Button = ({ name, disabled, onClick }: ButtonProps) => {
  return (
    <ButtonWrapper disabled={disabled} onClick={onClick}>
      {name}
    </ButtonWrapper>
  );
};

export default Button;

const ButtonWrapper = styled.button`
  font-size: 20px;
`;
