import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import api from '../../services/api';
import {
  MyCheckbox,
  MyDateField,
  MyTextInput,
  MyRadioButton,
} from '../FormComponents';
import { InputItem, InputGroup } from '../FormComponents/styles';
import Button from '../Button';

const AddTransaction = () => {
  return (
    <Formik
      initialValues={{
        amount: '',
        title: '',
        description: '',
        date: new Date(),
        paid: false,
        type: 'expense',
      }}
      validationSchema={Yup.object({
        title: Yup.string()
          .max(15, 'Must be 60 characters or less')
          .required('Required'),
        amount: Yup.number().required('Required'),
        date: Yup.date().required('Required'),
        description: Yup.string()
          .max(15, 'Must be 150 characters or less')
          .required('Required'),
        paid: Yup.boolean().required('Required'),
        type: Yup.string()
          .oneOf(['income', 'expense'])
          .required('Required'),
      })}
      onSubmit={values => {
        api.post('/transactions', { ...values });
      }}
    >
      <Form>
        <InputItem>
          <MyTextInput label="Title" name="title" type="text" />
        </InputItem>
        <InputGroup>
          <InputItem>
            <MyTextInput
              label="Amount"
              name="amount"
              type="text"
              placeholder="0,00"
            />
          </InputItem>
          <InputItem>
            <MyDateField label="Date" name="date" />
          </InputItem>
        </InputGroup>

        <InputItem>
          <MyTextInput label="Description" name="description" type="text" />
        </InputItem>
        <MyCheckbox name="paid">Paid</MyCheckbox>
        <InputItem>
          <MyRadioButton name="type" value="expense">
            Expense
          </MyRadioButton>
          <MyRadioButton name="type" value="income">
            Income
          </MyRadioButton>
        </InputItem>
        <Button type="submit">Submit</Button>
      </Form>
    </Formik>
  );
};

export default AddTransaction;
