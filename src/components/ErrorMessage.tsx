import React from "react";

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <p className="text-red-500">{message}</p>
);

export default ErrorMessage;
