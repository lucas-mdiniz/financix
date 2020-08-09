import React, { useState, useContext } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useHistory, Link } from 'react-router-dom';
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
} from '../styles';
import { UserContext } from '../../../contexts/UserContext';
import api from '../../../services/api';
import NotificationMessage from '../../../components/NotificationMessage';
import FullPageLoading from '../../../components/FullPageLoading';

const Signup = () => {
  const [emailConflict, setEmailConflict] = useState(false);
  const [loading, setLoading] = useState(false);
  const [genericError, setGenericError] = useState(false);
  const [, setUser] = useContext(UserContext);

  const history = useHistory();

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const LoginSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    password: Yup.string()
      .required('Required')
      .min(8, 'You password must have at least 8 characters'),
    confirmPassword: Yup.string()
      .required('Required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setEmailConflict(false);
    setGenericError(false);
    setLoading(true);

    try {
      const { confirmPassword, ...userData } = values;
      const user = await api.post('users', userData);
      resetForm();
      setLoading(false);

      history.push('/');
      setUser(user.data.user);
    } catch (e) {
      if (e.response.status === 409) {
        setEmailConflict(true);
      } else {
        setGenericError(true);
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
            <StyledInput as={MyTextInput} label="Name" name="name" />
          </FormControl>
          <FormControl>
            <StyledInput as={MyTextInput} label="Email" name="email" />
          </FormControl>
          <FormControl>
            <StyledInput
              as={MyTextInput}
              type="password"
              label="Password"
              name="password"
              autoComplete="new-password"
            />
          </FormControl>
          <FormControl>
            <StyledInput
              as={MyTextInput}
              type="password"
              label="Confirm password"
              name="confirmPassword"
              autoComplete="new-password"
            />
          </FormControl>
          <StyledButton as={Button} type="submit">
            Signup
          </StyledButton>
          {emailConflict && (
            <NotificationMessage type="error">
              This email is already registred.
            </NotificationMessage>
          )}
          {genericError && (
            <NotificationMessage type="error">
              Something went wrong, try again.
            </NotificationMessage>
          )}
        </StyledForm>
      </Formik>
      <AccountText>
        Already have an account?{' '}
        <StyledLink as={Link} to="/">
          Login
        </StyledLink>
      </AccountText>
      <StyledBackgroundDecorationTop />
      {loading && <FullPageLoading overlay />}
    </LoginWrapper>
  );
};

export default Signup;
