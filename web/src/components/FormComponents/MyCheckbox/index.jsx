import React from 'react';
import { useField, useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import { ErrorMessage, StyledCheckBox } from '../styles';

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  const { name, value, onBlur, onChange } = field;
  const { handleSubmit } = useFormikContext();
  const { id, submitOnChange } = props;

  return (
    <>
      <StyledCheckBox>
        <input
          id={id || name}
          onChange={e => {
            onChange(e);
            submitOnChange && handleSubmit();
          }}
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

MyCheckbox.defaultProps = {
  id: '',
};

MyCheckbox.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
};

export default MyCheckbox;
