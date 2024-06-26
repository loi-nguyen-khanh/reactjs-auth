// src/components/CommonLogoutButton.tsx
import React from 'react';
import CommonButton from './CommonButton';
import { useDispatch } from 'react-redux';
import { logout } from '../../slices/auth';
import { useNavigate } from 'react-router-dom';

const CommonLogoutButton: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await dispatch(logout()).unwrap();
    navigate('/login');
  }
  return (
    <CommonButton
      variant="outline"
      onClick={handleLogout}
      className="w-[70px] !h-[30px] !text-[14px] m-2"
    >
      Logout
    </CommonButton>
  );
};

export default CommonLogoutButton;