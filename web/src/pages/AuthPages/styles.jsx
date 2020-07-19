import styled from 'styled-components';
import BackgroundLoginSVG from './BackgroundLoginSVG';

const Title = styled.p`
  color: #aeaeae;
  font-size: 45px;
  line-height: 50px;
  text-align: center;
  flex-grow: 1;

  span {
    color: #ff8300;
  }
`;

const AccountText = styled.p`
  color: #aeaeae;
  font-size: 15px;
`;

const StyledLink = styled.a`
  color: #ff8300;
  font-size: 15px;
  line-height: 15px;
`;

const StyledBackgroundDecorationTop = styled(BackgroundLoginSVG)`
  width: 50%;
  height: auto;
  max-height: 100vh;
  position: absolute;
  right: 0;
  top: 0;
  z-index: -1;

  @media only screen and (max-width: 1024px) {
    width: 85%;
  }
`;

const Header = styled.div`
  margin-bottom: 50px;
`;

const StyledForm = styled.form`
  max-width: 500px;
  margin: 0 auto 35px auto;
  width: 100%;

  label {
    color: #aeaeae;
  }
`;

const StyledButton = styled.button`
  width: 100%;
  height: 50px;
  font-weight: 400;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  padding: 30px;
`;

const StyledInput = styled.input`
  border: none;
  background: #ffffff;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.14);
  border-radius: 10px;
  height: 50px;
`;

const FormControl = styled.div`
  margin-bottom: 30px;
`;

const LoginFailMessage = styled.p`
  color: #b20000;
  background: #ff00005e;
  height: 50px;
  border-radius: 15px;
  line-height: 50px;
  padding: 0 20px;
  margin-top: 30px;
`;

export {
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
};
