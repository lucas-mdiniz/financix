import React, { useState, useContext } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import Modal from '../../../containers/Modal';
import MyTextInput from '../../../components/FormComponents/MyTextInput';
import { Button } from '../../../components/Button';
import {
  Title,
  StyledBackgroundDecorationTop,
  Header,
  StyledForm,
  StyledButton,
  LoginWrapper,
  StyledInput,
  FormControl,
  StyledLink,
  AccountText,
  ForgotPasswordText,
} from '../styles';
import ForgotPasswordForm from './ForgotPassword';
import { UserContext } from '../../../contexts/UserContext';
import api from '../../../services/api';
import NotificationMessage from '../../../components/NotificationMessage';
import FullPageLoading from '../../../components/FullPageLoading';

const Login = () => {
  const [loginFail, setLoginFail] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, setUser] = useContext(UserContext);

  const initialValues = {
    email: '',
    password: '',
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setLoginFail(false);
    setLoading(true);
    try {
      const user = await api.post('users/login', values);
      resetForm();
      setLoginFail(false);
      setLoading(false);
      setUser(user.data.user);
    } catch (e) {
      if (e.response.status === 401) {
        setLoginFail(true);
      } else {
        throw new Error(e);
      }
      setLoading(false);
    }
  };

  return (
    <LoginWrapper>
      <Header>
        <Title>
          Welcome to <span>Financix</span>
        </Title>
      </Header>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        <StyledForm as={Form}>
          <FormControl>
            <StyledInput as={MyTextInput} label="Email" name="email" />
          </FormControl>
          <FormControl>
            <StyledInput
              as={MyTextInput}
              type="password"
              label="Password"
              name="password"
              autoComplete="current-password"
              required
            />
          </FormControl>
          <StyledButton as={Button} type="submit">
            Login
          </StyledButton>
          {loginFail && (
            <NotificationMessage type="error">
              Unable to login
            </NotificationMessage>
          )}
        </StyledForm>
      </Formik>
      <AccountText>
        Doesn&apos;t have an account yet?{' '}
        <StyledLink as={Link} to="/signup">
          Signup
        </StyledLink>
      </AccountText>
      <ForgotPasswordText onClick={() => setForgotPasswordOpen(true)}>
        Forgot your password?
      </ForgotPasswordText>
      {forgotPasswordOpen && (
        <Modal
          open={forgotPasswordOpen}
          onClose={() => setForgotPasswordOpen(false)}
        >
          <ForgotPasswordForm />
        </Modal>
      )}
      <StyledBackgroundDecorationTop />
      {loading && <FullPageLoading overlay />}
    </LoginWrapper>
  );
};

export default Login;
