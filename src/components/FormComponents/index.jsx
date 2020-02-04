import React from 'react';
import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  StyledInput,
  StyledLabel,
  StyledDatePickerWrapper,
  ErrorMessage,
} from './styles';

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledInput className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <ErrorMessage>{meta.error}</ErrorMessage>
      ) : null}
    </>
  );
};

const MyDateField = ({ label, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'date' });

  const { setFieldValue } = useFormikContext();
  const { onChange, ...newField } = field;

  return (
    <>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledDatePickerWrapper>
        <DatePicker
          selected={meta.value}
          onChange={date => setFieldValue('date', date)}
          {...newField}
          {...props}
        />
      </StyledDatePickerWrapper>
      {meta.touched && meta.error ? (
        <ErrorMessage className="error">{meta.error}</ErrorMessage>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <>
      <label>
        <input {...field} {...props} type="checkbox" />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <ErrorMessage className="error">{meta.error}</ErrorMessage>
      ) : null}
    </>
  );
};

const MyRadioButton = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'radio' });
  return (
    <>
      <label>
        <input {...field} {...props} type="radio" />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <ErrorMessage className="error">{meta.error}</ErrorMessage>
      ) : null}
    </>
  );
};

export { MyCheckbox, MyDateField, MyTextInput, MyRadioButton };
