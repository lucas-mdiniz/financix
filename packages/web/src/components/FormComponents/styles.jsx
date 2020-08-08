import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #c1c1c1;
  width: 100%;
  height: 40px;
  background: #fff;
  font-size: 15px;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 3px;
`;

const StyledDatePickerWrapper = styled.div`
  & input {
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #c1c1c1;
    width: 100%;
    height: 40px;
    font-size: 15px;
  }

  & .react-datepicker-wrapper {
    width: 100%;
  }

  & .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range,
  .react-datepicker__month-text--selected,
  .react-datepicker__month-text--in-selecting-range,
  .react-datepicker__month-text--in-range,
  .react-datepicker__quarter-text--selected,
  .react-datepicker__quarter-text--in-selecting-range,
  .react-datepicker__quarter-text--in-range {
    background-color: #ff8300;
  }
`;

const StyledRadio = styled.div`
  display: inline-block;
  margin: 10px;
  cursor: pointer;

  & input {
    display: none;
  }

  & label {
    cursor: pointer;
    font-weight: bold;
    color: ${props => {
      if (props.valueSelected === 'expense') {
        return props.valueSelected === props.value ? '#e20000' : '#696969';
      }
      return props.valueSelected === props.value ? '#08b34f' : '#696969';
    }};

    &:hover {
      color: ${props => (props.value === 'expense' ? '#e20000' : '#08b34f')};
    }
  }
`;

const StyledCheckBox = styled.label`
  & input {
    margin-right: 5px;
  }
`;

const InputItem = styled.div`
  margin-bottom: 10px;
`;

const InputItemCenter = styled.div`
  margin-bottom: 10px;
  text-align: center;
`;

const InputGroup = styled.div`
  display: grid;
  grid-gap: 0 20px;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 13px;
  margin-top: 3px;
  display: block;
`;

export {
  StyledInput,
  StyledLabel,
  InputItem,
  InputGroup,
  StyledDatePickerWrapper,
  ErrorMessage,
  InputItemCenter,
  StyledRadio,
  StyledCheckBox,
};
