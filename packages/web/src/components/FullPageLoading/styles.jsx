import styled from 'styled-components';

const Loader = styled.div`
  width: 80px;
  height: 80px;
  display: inline-block;
  border: 8px solid rgba(0, 0, 0, 0.25);
  border-right-color: #ff8300;
  border-radius: 100%;
  box-sizing: border-box;
  transform: rotate(-45deg);

  animation-name: simple-load-spinner;
  animation-delay: initial;
  animation-direction: initial;
  animation-duration: 1s;
  animation-fill-mode: initial;
  animation-iteration-count: infinite;
  animation-play-state: initial;
  animation-timing-function: linear;

  @keyframes simple-load-spinner {
    100% {
      transform: rotate(315deg);
    }
  }
`;

const LoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => (props.overlay ? '#00000096' : '#e2e2e2')};
  z-index: 9;
`;

export { Loader, LoaderWrapper };
