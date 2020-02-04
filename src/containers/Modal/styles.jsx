import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: #00000096;
  display: ${props => (props.open ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  background: #fff;
  border: 15px;
  width: 800px;
  max-width: 90%;
  max-height: 90%;
  overflow-y: auto;
  padding: 50px;
`;

export { ModalWrapper, ModalBox };
