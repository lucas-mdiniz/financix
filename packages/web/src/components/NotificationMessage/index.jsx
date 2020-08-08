import React from 'react';
import { ErrorMessage, SuccessMessage, DefaultMessage } from './styles';

const NotificationMessage = ({ type, children }) => {
  let message;

  switch (type) {
    case 'error':
      message = <ErrorMessage>{children}</ErrorMessage>;
      break;

    case 'success':
      message = <SuccessMessage>{children}</SuccessMessage>;
      break;

    default:
      message = <DefaultMessage>{children}</DefaultMessage>;
      break;
  }

  return message;
};

export default NotificationMessage;
