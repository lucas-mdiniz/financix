import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import MaskedInput from 'react-text-mask';
import 'react-datepicker/dist/react-datepicker.css';
import { StyledInput, StyledLabel, ErrorMessage } from '../styles';

const MyMaskedInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const { id, placeholder, mask } = props;
  const { name, value, onChange, onBlur } = field;

  return (
    <>
      <StyledLabel htmlFor={id || name}>{label}</StyledLabel>
      <StyledInput
        as={MaskedInput}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        mask={mask}
        type="text"
      />
      {meta.touched && meta.error ? (
        <ErrorMessage>{meta.error}</ErrorMessage>
      ) : null}
    </>
  );
};

MyMaskedInput.defaultProps = {
  label: '',
  placeholder: '',
  id: null,
};

MyMaskedInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  mask: PropTypes.oneOfType([PropTypes.func, PropTypes.array]).isRequired,
};

export default MyMaskedInput;
