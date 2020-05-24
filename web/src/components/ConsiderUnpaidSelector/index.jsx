import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import MyCheckbox from '../FormComponents/MyCheckbox';

const ConsiderUnpaidSelector = ({ considerUnpaid, setConsiderUnpaid }) => {
  const initialFormValues = {
    considerUnpaid: false,
  };

  const handleSubmit = values => {
    setConsiderUnpaid(values.considerUnpaid);
  };
  return (
    <Formik initialValues={initialFormValues} onSubmit={handleSubmit}>
      <Form>
        <MyCheckbox name="considerUnpaid" submitOnChange value={considerUnpaid}>
          Consider unpaid transactions
        </MyCheckbox>
      </Form>
    </Formik>
  );
};

ConsiderUnpaidSelector.propTypes = {
  considerUnpaid: PropTypes.bool.isRequired,
  setConsiderUnpaid: PropTypes.func.isRequired,
};

export default ConsiderUnpaidSelector;
