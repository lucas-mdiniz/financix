import React, { useState, useContext } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
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

const Login = () => {
  const [loginFail, setLoginFail] = useState(false);
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
    try {
      const user = await api.post('users/login', values);
      resetForm();
      setLoginFail(false);
      setUser(user.data);
    } catch (e) {
      if (e.response.status === 401) {
        setLoginFail(true);
      } else {
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
            <StyledInput as={MyTextInput} label="Email" name="email" />
          </FormControl>
          <FormControl>
            <StyledInput
              as={MyTextInput}
              type="password"
              label="Password"
              name="password"
              required
            />
          </FormControl>
          <StyledButton as={Button} type="submit">
            Login
          </StyledButton>
          {loginFail && <LoginFailMessage>Unable to login</LoginFailMessage>}
        </StyledForm>
      </Formik>
      <AccountText>
        Doesn&apos;t have an account yet?{' '}
        <StyledLink as={Link} to="/signup">
          Signup
        </StyledLink>
      </AccountText>
      <StyledBackgroundDecorationTop />
    </LoginWrapper>
  );
};

export default Login;
