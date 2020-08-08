import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../../components/FormComponents/MyTextInput';
import {
  InputGroup,
  StyledInput,
  InputItem,
} from '../../../../components/FormComponents/styles';
import { StyledCenteredButton, FormDescription, FormTitle } from './styles';
import NotificationMessage from '../../../../components/NotificationMessage';
import api from '../../../../services/api';
import FullPageLoading from '../../../../components/FullPageLoading';

const ForgotPasswordForm = () => {
  const [mailSuccess, setMailSuccess] = useState(false);
  const [mailError, setMailError] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: '',
  };

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
  });

  const handleSubmit = async values => {
    setMailSuccess(false);
    setMailError(false);
    setLoading(true);

    try {
      await api.post('/users/forgot-password', { ...values });
      setMailSuccess(true);
    } catch (e) {
      setMailError(true);
      throw new Error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={ForgotPasswordSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormTitle>Forgot your password?</FormTitle>
          <FormDescription>
            Don&apos;t worry! ?Just fill in your email and we&apos;ll send you a
            link to reset yout password.
          </FormDescription>
          <InputGroup>
            <InputItem>
              <StyledInput
                as={MyTextInput}
                label="Email Address"
                name="email"
              />
            </InputItem>
          </InputGroup>
          <StyledCenteredButton type="submit">
            Reset Password
          </StyledCenteredButton>
        </Form>
      </Formik>
      {mailSuccess && (
        <NotificationMessage type="success">
          If your email is registered in our app you will receive a link to
          reset your password.
        </NotificationMessage>
      )}
      {mailError && (
        <NotificationMessage type="error">
          Something went wrong, try again later.
        </NotificationMessage>
      )}
      {loading && <FullPageLoading overlay />}
    </>
  );
};

export default ForgotPasswordForm;
