import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;  
  }

  body {
    width: 500px;
    height: 700px;
    position: relative;
    background: white;
    border-radius: 16px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.09);
    margin: 0 auto;
    margin-top: 50px;
    overflow: auto;
  }

  button {
    border: none;
    cursor: pointer;
    background-color: transparent;
  }
`;

export default GlobalStyle;
