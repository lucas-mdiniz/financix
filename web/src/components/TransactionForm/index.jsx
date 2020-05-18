import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { FaPlus, FaMinus } from 'react-icons/fa';
import MyMaskedInput from '../FormComponents/MyMaskedInput';
import MySelect from '../FormComponents/MySelect';
import MyTextInput from '../FormComponents/MyTextInput';
import MyTextArea from '../FormComponents/MyTextArea';
import MyDateField from '../FormComponents/MyDateField';
import MyCheckbox from '../FormComponents/MyCheckbox';
import MyTransactionTypeButton from '../FormComponents/MyTransactionTypeButton';
import {
  InputItem,
  InputGroup,
  InputItemCenter,
} from '../FormComponents/styles';
import { StyledFaMinus, StyledFaPlus, StyledCenteredButton } from './styles';
import useCategories from '../../hooks/useCategories';

const TransactionForm = ({ initialFormValues, handleSubmit }) => {
  const [expensesCategories, earningsCategories] = useCategories();

  const addTransactionSchema = Yup.object({
    title: Yup.string()
      .max(15, 'Must be 60 characters or less')
      .required('Required'),
    amount: Yup.string().required('Required'),
    date: Yup.date().required('Required'),
    description: Yup.string().max(140, 'Must be 280 characters or less'),
    paid: Yup.boolean().required('Required'),
    type: Yup.string()
      .oneOf(['income', 'expense'])
      .required('Required'),
    category: Yup.object().required(),
  });

  const numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    thousandsSeparatorSymbol: '.',
    decimalSymbol: ',',
  });

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={addTransactionSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form>
          <InputItemCenter>
            <MyTransactionTypeButton
              name="type"
              value="expense"
              valueSelected={values.type}
              id="type-expense"
            >
              <StyledFaMinus>
                <FaMinus />
              </StyledFaMinus>
              Expense
            </MyTransactionTypeButton>
            <MyTransactionTypeButton
              name="type"
              value="income"
              valueSelected={values.type}
              id="type-income"
            >
              <StyledFaPlus>
                <FaPlus />
              </StyledFaPlus>
              Income
            </MyTransactionTypeButton>
          </InputItemCenter>

          <InputGroup>
            <InputItem>
              <MyTextInput label="Title" name="title" type="text" />
            </InputItem>
            <InputItem>
              <MySelect
                label="Category"
                name="category"
                options={
                  values.type === 'expense'
                    ? expensesCategories
                    : earningsCategories
                }
                placeholder="Select..."
              />
            </InputItem>
          </InputGroup>

          <InputGroup>
            <InputItem>
              <MyMaskedInput
                mask={numberMask}
                label="Amount"
                name="amount"
                placeholder="0.00"
              />
            </InputItem>
            <InputItem>
              <MyDateField label="Date" name="date" />
            </InputItem>
          </InputGroup>

          <InputItem>
            <MyTextArea
              label="Description"
              name="description"
              type="textarea"
            />
          </InputItem>
          <MyCheckbox name="paid">Paid</MyCheckbox>
          <StyledCenteredButton type="submit">Submit</StyledCenteredButton>
        </Form>
      )}
    </Formik>
  );
};

export default TransactionForm;
