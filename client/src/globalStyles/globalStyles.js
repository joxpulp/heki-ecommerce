import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: ${(props) => props.theme.fonts.lato};
}

  body {
    background-color: '#979797';
  }
  h1, h2, h3, h4, h5, h6 {
    line-height: 1.1;
  }
  ul, li, a, ol {
    list-style-type: none;
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
  }
`;

export default GlobalStyle;
