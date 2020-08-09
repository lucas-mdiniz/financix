import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { StyledInput, StyledLabel, ErrorMessage } from '../styles';

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const { id, placeholder, type, required, className, autoComplete } = props;
  const { name, value, onBlur, onChange } = field;

  return (
    <>
      <StyledLabel htmlFor={id || name}>{label}</StyledLabel>
      <StyledInput
        id={id || name}
        onChange={onChange}
        type={type || 'text'}
        name={name}
        value={value}
        onBlur={onBlur}
        placeholder={placeholder}
        className={className}
        required={required}
        autoComplete={autoComplete || 'true'}
      />
      {meta.touched && meta.error ? (
        <ErrorMessage>{meta.error}</ErrorMessage>
      ) : null}
    </>
  );
};

MyTextInput.defaultProps = {
  label: '',
  placeholder: '',
  id: null,
  type: 'text',
  required: false,
  className: undefined,
  autoComplete: 'true',
};

MyTextInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  autoComplete: PropTypes.string,
};

export default MyTextInput;
