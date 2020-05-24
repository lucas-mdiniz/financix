import React from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import Select, { components } from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import { StyledLabel, ErrorMessage } from '../styles';
import StyledOption from './styles';

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

  option: (styles, { isSelected, isFocused }) => {
    let backgroundColor;

    if (isSelected) {
      backgroundColor = null;
    } else if (isFocused) {
      backgroundColor = '#B2D4FF';
    }

    return {
      ...styles,
      backgroundColor,
      color: isSelected ? '#b3b3b3' : '#000',
    };
  },
};

const Option = props => {
  const { data } = props;

  return (
    <StyledOption style={{ display: 'flex', alignItems: 'center' }}>
      {data.icon && <i className="input-select__icon">{data.icon}</i>}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <components.Option {...props} />
    </StyledOption>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const { setFieldValue, handleSubmit } = useFormikContext();
  const { id, placeholder, options, submitOnChange } = props;
  const { name, value, onBlur } = field;

  return (
    <>
      <StyledLabel htmlFor={id || name}>{label}</StyledLabel>
      <Select
        id={id || name}
        styles={customStyles}
        onChange={currentValue => {
          setFieldValue(name, {
            value: currentValue.value,
            label: currentValue.label,
          });
          if (submitOnChange) handleSubmit();
        }}
        name={name}
        value={value}
        onBlur={onBlur}
        options={options}
        components={{ Option }}
        placeholder={placeholder}
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
  submitOnChange: false,
};

MySelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  label: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  submitOnChange: PropTypes.bool,
};

Option.propTypes = {
  data: PropTypes.objectOf(PropTypes.node).isRequired,
};
export default MySelect;
