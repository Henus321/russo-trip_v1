import React from 'react';
import './button.scss';

interface ButtonProps {
  children?: string;
  handler?: () => void;
  buttonType: string;
  buttonText: string;
  disabled?: boolean;
  type?: string;
}

const Button: React.FC<ButtonProps> = ({
  handler,
  buttonType = 'btn__primary',
  buttonText,
  disabled = false,
}) => {
  return (
    <button onClick={handler} className={buttonType} disabled={disabled}>
      {buttonText}
    </button>
  );
};

export default Button;
