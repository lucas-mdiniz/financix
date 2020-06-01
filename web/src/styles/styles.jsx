import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }
    html,body,#root{
        height: 100%;
    }
    body{
        text-rendering: optimizeLegibility !important;
        -webkit-font-smoothing: antialiased !important;
        font-family: 'Montserrat', sans-serif;
    }

    input {
        font-family: 'Montserrat', sans-serif;
    }

    ul{
        list-style: none;
    }

    p,h1,h2,h3,h4,h5,h6,a,li,span,label{
        color:#696969;
    }
    
    svg, img {
        vertical-align: top;
    }

    ::-webkit-scrollbar {
      -webkit-appearance: none;
      height: 3px;
      width: 3px;
    }
    
    ::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: #ff83008a;
      box-shadow: 0 0 1px rgba(255,255,255,.5);
    }
`;

const StyledApp = styled.div`
  display: flex;
  min-height: 100%;
`;

export { StyledApp, GlobalStyle };
