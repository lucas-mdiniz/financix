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
`;

const StyledApp = styled.div`
    display: flex;
    height: 100%;
`;

export { StyledApp, GlobalStyle };
