import React from 'react';
import CommonLogoutButton from '../common/CommonLogoutButton';
import styled, { useTheme } from "styled-components";

const Container = styled.div`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const App: React.FC = () => {

  return (
    <div className="flex justify-center items-center w-full h-full">
      <Container className="w-[50%] h-[50%] rounded-lg shadow-lg flex flex-col justify-center items-center p-8 sm:w-[550px] sm:h-[450px] max-w-[95vw]">
        <h1 className="text-black font-bold text-[24px] text-center mb-4">
          Onboarding page
        </h1>
        <CommonLogoutButton />
      </Container>
    </div>
  );
};

export default App;