import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../theme/ThemeContext';

const Button = styled.button`
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  border-radius: 30px;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0.6rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  &:hover {
    opacity: 0.8;
  }
`;

const ThemeSwitcherButton = () => {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <div className="absolute bottom-4 right-4">
      <Button onClick={toggleTheme}>Switch Theme</Button>
    </div>
  )
};

export default ThemeSwitcherButton;
