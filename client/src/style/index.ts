import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;  
  }

  button {
    border: none;
    cursor: pointer;
    padding: 0px 5px;
    background-color: transparent;
  }
`;

export default GlobalStyle;
