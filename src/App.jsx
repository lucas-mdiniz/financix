import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SideBar from './containers/SideBar';
import Main from './containers/Main';
import { StyledApp, GlobalStyle } from './styles/styles';
import Routes from './routes';

function App() {
    return (
        <Router>
            <GlobalStyle />
            <StyledApp>
                <SideBar />
                <Main>
                    <Routes />
                </Main>
            </StyledApp>
        </Router>
    );
}

export default App;
