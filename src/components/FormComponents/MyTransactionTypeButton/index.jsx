import React from 'react';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import { ErrorMessage, StyledRadio } from '../styles';

const MyTransactionTypeButton = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'radio' });
  const { name, value, onBlur, onChange } = field;
  const { id, valueSelected } = props;

  return (
    <StyledRadio value={value} valueSelected={valueSelected}>
      <label>
        <input
          id={id || name}
          onChange={onChange}
          name={name}
          value={value}
          onBlur={onBlur}
          type="radio"
        />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <ErrorMessage className="error">{meta.error}</ErrorMessage>
      ) : null}
    </StyledRadio>
  );
};

MyTransactionTypeButton.defaultProps = {
  id: null,
};

MyTransactionTypeButton.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  valueSelected: PropTypes.string.isRequired,
};

export default MyTransactionTypeButton;
