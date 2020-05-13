import React from 'react';
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
        <MyCheckbox
          name="considerUnpaid"
          submitOnChange={true}
          value={considerUnpaid}
        >
          Consider unpaid transactions
        </MyCheckbox>
      </Form>
    </Formik>
  );
};

export default ConsiderUnpaidSelector;
