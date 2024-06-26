import React, { useState } from 'react';
import styled from 'styled-components';
import closeEyeIcon from '../../assets/close-eye.png';
import openEyeIcon from '../../assets/open-eye.png';

interface CommonInputProps {
  type: 'text' | 'number' | 'tel' | 'password' | 'email';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  errorMessage: string | null;
  iconBefore?: React.ReactNode;
  className?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid ${({ theme }) => theme.inputBorder};
  background-color: ${({ theme }) => theme.inputBackground};
  padding: 0.5rem;
  border-radius: 5px;
  transition: all 0.3s ease;
  height: 45px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
`;

const Input = styled.input`
  flex: 1;
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.inputText};
  outline: none;
  font-family: ${({ type }) => (type === 'password' ? 'monospace' : 'Darker Grotesque')};

  &::placeholder {
    color: ${({ theme }) => theme.inputBorder};
  }
`;

const ErrorText = styled.span`
  color: ${({ theme }) => theme.errorText};
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.inputText};
  cursor: pointer;
  padding: 0 0.5rem;
`;

const CommonInput: React.FC<CommonInputProps> = ({
  type,
  value,
  onChange,
  placeholder,
  errorMessage,
  iconBefore,
  className
}) => {
  const [inputType, setInputType] = useState(type);

  const togglePasswordVisibility = () => {
    setInputType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  return (
    <Container className={className}>
      <InputWrapper>
        {iconBefore && <IconWrapper>{iconBefore}</IconWrapper>}
        <Input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        {type === 'password' && (
          <ToggleButton onClick={togglePasswordVisibility}>
            <img
              src={inputType === 'password' ? closeEyeIcon : openEyeIcon}
              alt={inputType === 'password' ? 'Show password' : 'Hide password'}
              style={{ width: '20px', height: '20px' }}
            />
          </ToggleButton>
        )}
      </InputWrapper>
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
    </Container>
  );
};

export default CommonInput;
