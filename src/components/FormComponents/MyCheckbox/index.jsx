import React from 'react';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import { ErrorMessage, StyledCheckBox } from '../styles';

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });

  const { name, value, onBlur, onChange } = field;

  return (
    <>
      <StyledCheckBox>
        <input
          onChange={onChange}
          name={name}
          value={value}
          onBlur={onBlur}
          type="checkbox"
        />
        {children}
      </StyledCheckBox>
      {meta.touched && meta.error ? (
        <ErrorMessage className="error">{meta.error}</ErrorMessage>
      ) : null}
    </>
  );
};

MyCheckbox.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyCheckbox;
