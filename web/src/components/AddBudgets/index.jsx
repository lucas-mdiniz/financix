import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { Formik, Form } from 'formik';
import api from '../../services/api';
import MySelect from '../FormComponents/MySelect';
import MyMaskedInput from '../FormComponents/MyMaskedInput';
import { InputItem, InputGroup } from '../FormComponents/styles';
import { CenteredButton } from '../Button';
import useCategories from '../../hooks/useCategories';

const AddBudgets = ({ modalClose, handleSetBudgets }) => {
  const [expensesCategories] = useCategories();

  const initialValues = {
    category: null,
    amount: '',
  };

  const addBudgetSchema = Yup.object({
    amount: Yup.string().required('Required'),
    category: Yup.object().required('Required'),
  });

  const numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    thousandsSeparatorSymbol: '.',
    decimalSymbol: ',',
  });

  const handleSubmit = values => {
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
        handleSetBudgets(budget);
        modalClose();
      } catch (error) {
        console.log(error);
      }
    }

    patchCategory();
  };

  return (
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
  );
};

AddBudgets.propTypes = {
  modalClose: PropTypes.func.isRequired,
  handleSetBudgets: PropTypes.func.isRequired,
};

export default AddBudgets;
