import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { StyledInput, StyledLabel, ErrorMessage } from '../styles';

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const { id, placeholder } = props;
  const { name, value, onBlur, onChange } = field;

  return (
    <>
      <StyledLabel htmlFor={id || name}>{label}</StyledLabel>
      <StyledInput
        onChange={onChange}
        name={name}
        value={value}
        onBlur={onBlur}
        placeholder={placeholder}
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
};

MyTextInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
};

export default MyTextInput;
