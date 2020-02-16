import React from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import { StyledInput, StyledLabel, ErrorMessage } from '../styles';

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const { setFieldValue } = useFormikContext();
  const { id, placeholder, options } = props;
  const { name, value, onBlur } = field;

  return (
    <>
      <StyledLabel htmlFor={id || name}>{label}</StyledLabel>
      <StyledInput
        id={id || name}
        as={Select}
        onChange={category => setFieldValue('category', category)}
        name={name}
        value={value}
        onBlur={onBlur}
        placeholder={placeholder}
        options={options}
      />
      {meta.touched && meta.error ? (
        <ErrorMessage>{meta.error}</ErrorMessage>
      ) : null}
    </>
  );
};

MySelect.defaultProps = {
  label: '',
  placeholder: '',
  id: null,
};

MySelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  label: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
};

export default MySelect;
