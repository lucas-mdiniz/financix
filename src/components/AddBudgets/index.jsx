import React from 'react';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { Formik, Form } from 'formik';
import api from '../../services/api';
import MySelect from '../FormComponents/MySelect';
import MyMaskedInput from '../FormComponents/MyMaskedInput';
import { InputItem, InputGroup } from '../FormComponents/styles';
import { CenteredButton } from '../Button';
import useCategories from '../../hooks/useCategories';

const AddBudgets = ({ modalClose }) => {
  const [expensesCategories] = useCategories();

  const initialValues = {
    category: null,
    amount: '',
  };

  const numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    thousandsSeparatorSymbol: '.',
    decimalSymbol: ',',
  });

  const handleSubmit = values => {
    api
      .patch(`/categories/${values.category.id}`, {
        amount: values.amount,
      })
      .then(() => {
        modalClose();
      });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <InputGroup>
          <InputItem>
            <MySelect
              options={expensesCategories}
              name="category"
              label="Category"
              placeholder="Select..."
            />
          </InputItem>
          <InputItem>
            <MyMaskedInput
              mask={numberMask}
              label="Amount"
              name="amount"
              placeholder="0.00"
            />
          </InputItem>
        </InputGroup>
        <CenteredButton type="submit">Submit</CenteredButton>
      </Form>
    </Formik>
  );
};

export default AddBudgets;
