import React from 'react';
import SideBar from './containers/SideBar/SideBar';
import Main from './containers/Main/Main';
import Card from './containers/Card/Card';
import { StyledApp, GlobalStyle } from './styles/styles';
import FlexRow from './containers/FlexRow/FlexRow';
import ShowValue from './components/ShowValue/ShowValue';

function App() {
  return (
    <>
      <GlobalStyle />
      <StyledApp>
        <SideBar>
          <p>asdas</p>
        </SideBar>
        <Main>
          <FlexRow>
            <ShowValue color='#00b300' value='999,00' title='Balance' />
            <ShowValue color='#00b300' value='999,00' title='Income' />
            <ShowValue color='#e00000' value='999,00' title='Outcome' />
          </FlexRow>
        </Main>
      </StyledApp>
    </>
  );
}

export default App;
