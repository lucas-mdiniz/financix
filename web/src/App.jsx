import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { StyledApp, GlobalStyle } from './styles/styles';
import SideBar from './containers/SideBar';
import Main from './containers/Main';
import Routes from './routes';

function App() {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 1024) {
      setSideBarOpen(false);
    } else setSideBarOpen(true);

    const windowResize = () => {
      if (window.innerWidth <= 1024) {
        setSideBarOpen(false);
      } else setSideBarOpen(true);
    };

    window.addEventListener('resize', windowResize);

    return () => window.removeEventListener('resize', windowResize);
  }, []);

  const handleSideBarToggle = () => {
    setSideBarOpen(st => !st);
  };

  return (
    <Router>
      <GlobalStyle />
      <StyledApp>
        <SideBar
          sideBarOpen={sideBarOpen}
          handleSideBarToggle={handleSideBarToggle}
        />
        <Main
          sideBarOpen={sideBarOpen}
          handleSideBarToggle={handleSideBarToggle}
        >
          <Routes />
        </Main>
      </StyledApp>
    </Router>
  );
}

export default App;
