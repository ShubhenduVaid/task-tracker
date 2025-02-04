import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color: #fff;
    color: #333;
    line-height: 1.6;
  }

  h1 {
    font-size: 2rem;
    color: #222;
    margin-bottom: 1rem;
    text-align: center;
  }

  .app {
    max-width: 800px;
    margin: 0 auto;
    padding: 1.5rem;
  }
`;

export default GlobalStyles;
