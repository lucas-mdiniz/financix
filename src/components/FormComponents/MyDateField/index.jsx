import React from 'react';
import { useField, useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { StyledLabel, StyledDatePickerWrapper, ErrorMessage } from '../styles';

const MyDateField = ({ label, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'date' });
  const { id, placeholder } = props;
  const { name, value, onBlur } = field;

  const { setFieldValue } = useFormikContext();

  return (
    <>
      <StyledLabel htmlFor={id || name}>{label}</StyledLabel>
      <StyledDatePickerWrapper>
        <DatePicker
          selected={meta.value}
          onChange={date => setFieldValue('date', date)}
          name={name}
          value={value}
          onBlur={onBlur}
          placeholder={placeholder}
        />
      </StyledDatePickerWrapper>
      {meta.touched && meta.error ? (
        <ErrorMessage className="error">{meta.error}</ErrorMessage>
      ) : null}
    </>
  );
};

MyDateField.defaultProps = {
  label: '',
  placeholder: '',
  id: null,
};

MyDateField.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
};

export default MyDateField;
