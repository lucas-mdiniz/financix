import React from 'react';
import { ModalWrapper, ModalBox } from './styles';

const Modal = ({ children, open, onClose }) => {
  return (
    <ModalWrapper open={open} onClick={onClose}>
      <ModalBox>{children}</ModalBox>
    </ModalWrapper>
  );
};

export default Modal;
