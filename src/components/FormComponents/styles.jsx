import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #c1c1c1;
  width: 100%;
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

const InputItem = styled.div`
  margin-bottom: 10px;
`;

const InputGroup = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: auto auto;
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
};
