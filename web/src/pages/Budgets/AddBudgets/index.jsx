import React, { useState } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { Formik, Form } from 'formik';
import api from '../../../services/api';
import MySelect from '../../../components/FormComponents/MySelect';
import MyMaskedInput from '../../../components/FormComponents/MyMaskedInput';
import {
  InputItem,
  InputGroup,
} from '../../../components/FormComponents/styles';
import { CenteredButton } from '../../../components/Button';
import useCategories from '../../../hooks/useCategories';
import FullPageLoading from '../../../components/FullPageLoading';
import NotificationMessage from '../../../components/NotificationMessage';

const AddBudgets = ({ modalClose, handleSetBudgets }) => {
  const [expensesCategories] = useCategories();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const initialValues = {
    category: null,
    amount: '',
  };

  const addBudgetSchema = Yup.object({
    amount: Yup.string()
      .required()
      .label('Amount'),
    category: Yup.object()
      .nullable()
      .required()
      .label('Category'),
  });

  const numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    thousandsSeparatorSymbol: '.',
    decimalSymbol: ',',
  });

  const handleSubmit = values => {
    setLoading(true);
    setError(false);

    const value = parseFloat(values.amount.replace('.', '').replace(',', '.'));
    const [currentBudget] = expensesCategories.filter(
      expenseCategory => expenseCategory.value === values.category.value
    );

    const budget = {
      name: values.category.label,
      _id: currentBudget.id,
      value,
      slug: values.category.value,
      type: currentBudget.type,
    };

    async function patchCategory() {
      try {
        await api.patch(`/budgets/${budget._id}`, {
          amount: value,
        });
        await handleSetBudgets(budget);
        modalClose();
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    patchCategory();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={addBudgetSchema}
      >
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
      {loading && <FullPageLoading overlay />}
      {error && (
        <NotificationMessage type="error">
          Something went wront, try again later.
        </NotificationMessage>
      )}
    </>
  );
};

AddBudgets.propTypes = {
  modalClose: PropTypes.func.isRequired,
  handleSetBudgets: PropTypes.func.isRequired,
};

export default AddBudgets;
