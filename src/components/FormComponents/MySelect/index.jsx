import React from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import { StyledLabel, ErrorMessage, StyledSelect } from '../styles';

const customStyles = {
  control: styles => ({
    ...styles,
    backgroundColor: 'white',
    borderRadius: '5px',
    border: '1px solid #c1c1c1',
    width: '100%',
    height: '40px',
    background: '#fff',
    fontSize: '15px',
  }),
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const { setFieldValue } = useFormikContext();
  const { id, placeholder, options } = props;
  const { name, value, onBlur } = field;

  return (
    <>
      <StyledLabel htmlFor={id || name}>{label}</StyledLabel>
      <Select
        id={id || name}
        styles={customStyles}
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
