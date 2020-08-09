import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ModalWrapper, ModalBox, StyledFaTimes } from './styles';

const Modal = ({ open, children, onClose, overflowY }) => {
  useEffect(() => {
    async function handleClose(e) {
      if (e.keyCode === 27) {
        onClose();
      }
    }

    document.body.addEventListener('keydown', handleClose);

    return () => document.body.removeEventListener('keydown', handleClose);
  });

  const handleOutsideClose = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleButtonClose = () => {
    onClose();
  };

  return open ? (
    <ModalWrapper onClick={handleOutsideClose}>
      <ModalBox overflowY={overflowY}>
        <StyledFaTimes onClick={handleButtonClose} />
        {children}
      </ModalBox>
    </ModalWrapper>
  ) : null;
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
