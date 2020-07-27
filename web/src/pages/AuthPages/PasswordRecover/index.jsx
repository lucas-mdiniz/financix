import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import MyTextInput from '../../../components/FormComponents/MyTextInput';
import {
  InputGroup,
  StyledInput,
  InputItem,
} from '../../../components/FormComponents/styles';
import Card from '../../../containers/Card';
import PageTitle from '../../../components/Header/PageTitle';
import PageWrapper from './styles';
import { Button } from '../../../components/Button';
import { StyledButton } from '../styles';
import api from '../../../services/api';
import FullPageLoading from '../../../components/FullPageLoading';
import NotificationMessage from '../../../components/NotificationMessage';

const PasswordRecover = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);

  const initialValues = {
    newPassword: '',
    confirmNewPassword: '',
  };

  const PasswordRecoverSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required('Required')
      .min(8, 'You password must have at least 8 characters'),
    confirmNewPassword: Yup.string()
      .required('Required')
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });

  const handleSubmit = async values => {
    const { newPassword } = values;
    setLoading(true);
    setErrorMessage(null);
    try {
      await api.post(`/password-recovery/${token}`, { newPassword });
      setSuccessMessage(true);
    } catch (e) {
      if (e.response.status === 401) {
        setErrorMessage(
          'This link is expired, please ask for password recovery email again.'
        );
      } else {
        setErrorMessage('Something went wrong, try again latter.');
      }
      throw Error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <PageTitle>Password Recovery</PageTitle>
      <Card
        borderRadius="10px"
        horizontalMargin="15px"
        padding="30px"
        flexGrow="0"
        width="300px"
      >
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={PasswordRecoverSchema}
        >
          <Form>
            <InputGroup>
              <InputItem>
                <StyledInput
                  as={MyTextInput}
                  label="New Password"
                  name="newPassword"
                  type="password"
                />
              </InputItem>
            </InputGroup>
            <InputGroup>
              <InputItem>
                <StyledInput
                  as={MyTextInput}
                  label="Confirm Password"
                  name="confirmNewPassword"
                  type="password"
                />
              </InputItem>
            </InputGroup>
            <StyledButton as={Button} type="submit">
              Submit
            </StyledButton>
            {errorMessage && (
              <NotificationMessage type="error">
                {errorMessage}
              </NotificationMessage>
            )}
            {successMessage && (
              <NotificationMessage type="success">
                Success! Please <Link to="/">Login</Link>
              </NotificationMessage>
            )}
          </Form>
        </Formik>
      </Card>
      {loading && <FullPageLoading overlay />}
    </PageWrapper>
  );
};

export default PasswordRecover;
