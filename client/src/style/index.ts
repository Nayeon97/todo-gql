import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;  
  }

  button {
    border: none;
    cursor: pointer;
    background-color: transparent;
  }
`;

export default GlobalStyle;
