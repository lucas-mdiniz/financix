import styled from 'styled-components';

const BudgetWrapper = styled.div`
  padding: 15px;
  border-bottom: 1px solid #dedede;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:last-child {
    border-bottom: none;
  }
`;

const BudgetData = styled.div`
  display: inline-flex;
  align-items: center;
`;

const BudgetDetailsWrapper = styled.div`
  margin-left: 15px;
`;

const BudgetDetailsTitle = styled.h3`
  font-weight: bold;
  margin-bottom: 5px;
`;

const BudgetDetailsContent = styled.span`
  display: block;
  font-size: 14px;
  line-height: 14px;
  color: #888888;
`;

const BudgetPercentage = styled.span`
  font-size: 20px;
  line-height: 20px;
  font-weight: bold;
  color: #888;
`;

export {
  BudgetWrapper,
  BudgetDetailsWrapper,
  BudgetDetailsTitle,
  BudgetDetailsContent,
  BudgetData,
  BudgetPercentage,
};
