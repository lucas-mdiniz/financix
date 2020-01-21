import React from 'react';
import SideBar from './containers/SideBar/SideBar';
import Main from './containers/Main/Main';
import { StyledApp, GlobalStyle } from './styles/styles';

function App() {
  return (
    <>
      <GlobalStyle />
      <StyledApp>
        <SideBar>
          <p>asdas</p>
        </SideBar>
        <Main>
          <p>asdas</p>
        </Main>
      </StyledApp>
    </>
  );
}

export default App;
