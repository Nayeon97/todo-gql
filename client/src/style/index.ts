import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;  
  }

  body {
    display: grid;
    margin: 0;
    padding-top: 69px;
    background-color:  rgb(247, 247, 250);;
  }

  button {
    border: none;
    cursor: pointer;
    background-color: transparent;
  }

  input {
    outline: none;
    border: none;
  }

  textarea:focus, input:focus, select:focus{
    outline: none;
    border: none;
}
`;

export default GlobalStyle;
