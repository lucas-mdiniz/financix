import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: #00000096;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  background: #fff;
  border: 15px;
  width: 800px;
  max-width: 90%;
  max-height: 90%;
  ${props => props.overflowY && 'overflow-y: auto;'}
  padding: 50px;
  position: relative;
`;

const StyledFaTimes = styled(FaTimes)`
  position: absolute;
  right: 25px;
  top: 25px;
  cursor: pointer;
  font-size: 20px;
  color: #696969;
  z-index: 999;

  &:hover {
    color: #ff8300;
  }
`;

export { ModalWrapper, ModalBox, StyledFaTimes };
