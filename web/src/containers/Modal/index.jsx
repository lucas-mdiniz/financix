import React from 'react';
import PropTypes from 'prop-types';
import { ModalWrapper, ModalBox, StyledFaTimes } from './styles';

const Modal = ({ children, open, onClose, overflowY }) => {
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
    <ModalWrapper
      open={open}
      onClick={handleOutsideClose}
      overflowY={overflowY}
    >
      <ModalBox>
        <StyledFaTimes onClick={handleButtonClose} />
        {children}
      </ModalBox>
    </ModalWrapper>
  );
};

Modal.defaultProps = {
  open: false,
  overflowY: false,
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  overflowY: PropTypes.bool,
};

export default Modal;
