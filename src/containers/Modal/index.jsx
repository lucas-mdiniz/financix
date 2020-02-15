import React from 'react';
import PropTypes from 'prop-types';
import { ModalWrapper, ModalBox, StyledFaTimes } from './styles';

const Modal = ({ children, open, onClose }) => {
  document.body.addEventListener('keydown', e => {
    if (e.keyCode === 27) {
      onClose();
    }
  });

  const handleOutsideClose = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleButtonClose = () => {
    onClose();
  };

  return (
    <ModalWrapper open={open} onClick={handleOutsideClose}>
      <ModalBox>
        <StyledFaTimes onClick={handleButtonClose} />
        {children}
      </ModalBox>
    </ModalWrapper>
  );
};

Modal.defaultProps = {
  open: false,
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
