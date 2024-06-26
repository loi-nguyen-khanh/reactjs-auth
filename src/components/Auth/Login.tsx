import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import CommonButton from "../common/CommonButton";
import CommonInput from "../common/CommonInput";
import emailIcon from "../../assets/email.png";
import passIcon from "../../assets/pass.png";
import closeIcon from "../../assets/close.png";
import { useDispatch, useSelector } from "react-redux";
import { Rings } from "react-loader-spinner";

import { StoreState } from "../../slices/store";
import { login } from "../../slices/auth";
import { clearEmailError, clearPasswordError } from "../../slices/error";
import { useNavigate } from "react-router-dom";
import { ROLE_ADMIN, ROLE_CLIENT } from "../../constants/AuthConstant";

const Container = styled.div`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const submitLogin = () => {
  console.log("Primary button clicked");
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, role, isOnboarding } = useSelector(
    (state: StoreState) => state.auth
  );
  const { errorEmail, errorPassword } = useSelector((state: StoreState) => state.error);
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [checkValid, setCheckValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearEmailError());
    dispatch(clearPasswordError());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      if (role === ROLE_ADMIN) {
        navigate('/admin');
      } else if (role === ROLE_CLIENT) {
        if (isOnboarding) {
          navigate('/onboarding');
        } else {
          navigate('/dashboard');
        }
      }
    }
  }, [isLoggedIn, role, isOnboarding, navigate]);

  const handleLogin = async () => {
    setCheckValid(false);
    setLoading(true);
    try {
      await dispatch(login({ email: emailValue, password: passwordValue })).unwrap();
      setCheckValid(true);
      setLoading(false);
    } catch (error) {
      console.error('Login failed:', error);
      setCheckValid(true);
      setLoading(false);
    }
  };

  const validEmail = (value: string) => {
    dispatch(clearEmailError());
    dispatch(clearPasswordError());
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValid = emailRegex.test(value);
    return isValid;
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailValue(value);
    if (validEmail(value) && passwordValue != '') setCheckValid(true);
    else setCheckValid(false);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPasswordValue(value);
    if (value != '' && validEmail(emailValue)) setCheckValid(true);
    else setCheckValid(false);
  };

  return (
    <div className="flex justify-center items-center w-full h-full">

      <Container className="relative rounded-lg shadow-lg flex flex-col justify-center items-center p-8 sm:w-[550px] sm:h-[450px] max-w-[95vw]">
        <div className="absolute top-[-10px] flex justify-center items-center">
          <Rings
            visible={loading}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="rings-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
        <img
          src={closeIcon}
          alt={"close"}
          className="absolute top-4 right-4 w-[24px] h-[24px] rounded-full border border-gray-300 p-1 cursor-pointer hover:bg-slate-200 hover:shadow-md"
        />

        <h1 className="text-black font-bold text-[24px] text-center mb-4">
          Welcome back!
        </h1>
        <span className="text-center text-[#555] mb-8">
          Don't worry! Fill in the email address associated with your account
          and we'll send you a link to reset your password.
        </span>
        <CommonInput
          type="email"
          value={emailValue}
          onChange={handleEmailChange}
          placeholder="Email address"
          errorMessage={errorEmail}
          iconBefore={
            <img
              src={emailIcon}
              alt={"email"}
              style={{ width: "20px", height: "20px" }}
            />
          }
        />
        <CommonInput
          type="password"
          value={passwordValue}
          onChange={handlePasswordChange}
          placeholder="•••••••••"
          errorMessage={errorPassword}
          iconBefore={
            <img
              src={passIcon}
              alt={"password"}
              style={{ width: "20px", height: "20px" }}
            />
          }
        />
        <CommonButton
          variant="primary"
          onClick={handleLogin}
          className="w-full"
          disabled={!checkValid}
        >
          Log In
        </CommonButton>
        <CommonButton
          variant="outline"
          onClick={submitLogin}
          className="w-full mt-2"
        >
          Forgot Your Password?
        </CommonButton>

      </Container>
    </div>
  );
};

export default Login;
