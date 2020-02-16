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
`;

const StyledApp = styled.div`
  display: flex;
  height: 100%;
`;

export { StyledApp, GlobalStyle };
