import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../components/FormComponents/MyTextInput';
import {
  InputGroup,
  InputItem,
  ErrorMessage,
} from '../../../components/FormComponents/styles';
import { CenteredButton } from '../../../components/Button';
import api from '../../../services/api';
import FullPageLoading from '../../../components/FullPageLoading';
import NotificationMessage from '../../../components/NotificationMessage';

const ChangePasswordForm = ({ modalClose }) => {
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    currentPassword: '',
    newPassword: '',
    newPasswordConfirmation: '',
  };

  const changePasswordSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Required'),
    newPassword: Yup.string()
      .required('Required')
      .min(8, 'You password must have at least 8 characters'),
    newPasswordConfirmation: Yup.string().oneOf(
      [Yup.ref('newPassword'), null],
      'Passwords must match'
    ),
  });

  const handleSubmit = async values => {
    setLoading(true);
    setError(false);
    const password = values.newPassword;
    const { currentPassword } = values;
    try {
      await api.patch('/users/password-update', { password, currentPassword });
      setCurrentPasswordError(false);
      setLoading(false);
      modalClose();
    } catch (e) {
      if (e.response.status === 409) {
        setCurrentPasswordError(true);
      } else {
        setError(true);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={changePasswordSchema}
      >
        <Form>
          <InputGroup>
            <InputItem>
              <MyTextInput
                label="Current Password"
                name="currentPassword"
                type="password"
                autoComplete="current-password"
              />
              {currentPasswordError && (
                <ErrorMessage>Your password is wrong</ErrorMessage>
              )}
            </InputItem>
          </InputGroup>
          <InputGroup>
            <InputItem>
              <MyTextInput
                label="New Password"
                name="newPassword"
                type="password"
                autoComplete="new-password"
              />
            </InputItem>
          </InputGroup>
          <InputGroup>
            <InputItem>
              <MyTextInput
                label="Confirm New Password"
                name="newPasswordConfirmation"
                type="password"
                autoComplete="new-password"
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

ChangePasswordForm.propTypes = {
  modalClose: PropTypes.func.isRequired,
};

export default ChangePasswordForm;
