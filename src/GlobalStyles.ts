import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color: #f5f5f5;
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
    margin: 2rem auto;
    background: #fff;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

export default GlobalStyles;
