import React, { useState, useContext } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { withRouter, Link } from 'react-router-dom';
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
  LoginFailMessage,
  StyledLink,
  AccountText,
} from '../styles';
import { UserContext } from '../../../contexts/UserContext';
import api from '../../../services/api';

const Signup = ({ history }) => {
  const [emailConflict, setEmailConflict] = useState(false);
  const [genericError, setGenericError] = useState(false);
  const [, setUser] = useContext(UserContext);

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
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match'
    ),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const { confirmPassword, ...userData } = values;
      const user = await api.post('users', userData);
      resetForm();
      history.push('/');
      setUser(user.data);
    } catch (e) {
      if (e.response.status === 409) {
        setEmailConflict(true);
      } else {
        setGenericError(true);
        throw new Error(e);
      }
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
            />
          </FormControl>
          <FormControl>
            <StyledInput
              as={MyTextInput}
              type="password"
              label="Confirm password"
              name="confirmPassword"
            />
          </FormControl>
          <StyledButton as={Button} type="submit">
            Signup
          </StyledButton>
          {emailConflict && (
            <LoginFailMessage>
              This email is already registred.
            </LoginFailMessage>
          )}
          {genericError && (
            <LoginFailMessage>
              Something went wrong, try again.
            </LoginFailMessage>
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
    </LoginWrapper>
  );
};

export default withRouter(Signup);
