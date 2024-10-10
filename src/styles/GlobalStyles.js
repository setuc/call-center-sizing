import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    background-color: #f0f4f8;
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyle;