import React from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps {
  variant: 'primary' | 'outline';
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const primaryStyle = css`
  background-color: ${({ theme }) => theme.primaryButtonBackground};
  color: ${({ theme }) => theme.primaryButtonTextColor};
  border: none;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.primaryButtonBackground};
    opacity: 0.8;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.primaryButtonDisabledBackground};
    color: ${({ theme }) => theme.primaryButtonDisabledTextColor};
    opacity: 1;
    cursor: not-allowed;
  }
`;

const outlineStyle = css`
  background-color: ${({ theme }) => theme.outlineButtonBackground};
  color: ${({ theme }) => theme.outlineButtonTextColor};
  border: 2px solid ${({ theme }) => theme.outlineBorderColor};
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.outlineHoverBackgroundColor};
    color: ${({ theme }) => theme.outlineButtonTextColor};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.outlineButtonDisabledBackground};
    color: ${({ theme }) => theme.outlineButtonDisabledTextColor};
  }
`;

const StyledButton = styled.button<ButtonProps>`
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s ease;

  ${({ variant }) => (variant === 'primary' ? primaryStyle : outlineStyle)}
`;

const CommonButton: React.FC<ButtonProps> = ({ variant, onClick, children, className, disabled }) => {

  const handleClick = () => {
    onClick();
  };

  return (
    <StyledButton className={className} variant={variant} onClick={handleClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

export default CommonButton;
