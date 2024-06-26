// src/App.tsx
import React from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme/theme";
import {
  ThemeContext,
  ThemeProvider as CustomThemeProvider,
} from "./theme/ThemeContext";
import ThemeSwitcherButton from "./components/common/ThemeSwitcherButton";
import GlobalStyles from "./theme/GlobalStyles";
import Login from "./components/Auth/Login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreState } from "./slices/store";
import { useSelector } from "react-redux";
import Admin from "./components/Admin/Index";
import Dashboard from "./components/Client/Dashboard";
import Onboarding from "./components/Onboarding/Index";
import AdminRoutePrivate from "./routes/AdminRoutePrivate";
import ClientRoutePrivate from "./routes/ClientRoutePrivate";
import OnboardingRoutePrivate from "./routes/OnboardingRoutePrivate";

const App = () => {
  const { isLoggedIn, role, isOnboarding } = useSelector(
    (state: StoreState) => state.auth
  );

  return (
    <CustomThemeProvider>
      <ThemeContext.Consumer>
        {({ theme }) => (
          <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <GlobalStyles />
            <div className="w-[100vw] h-[100vh]">
              <ThemeSwitcherButton />
              <Router>
                <Routes>
                  <Route path="/*" element={<Login />} />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/admin"
                    element={
                      <AdminRoutePrivate
                        isLoggedIn={isLoggedIn}
                        role={role}
                        isOnboarding={isOnboarding}
                        element={Admin}
                        theme={theme}
                      />
                    }
                  />
                  <Route
                    path="/dashboard"
                    element={
                      <ClientRoutePrivate
                        isLoggedIn={isLoggedIn}
                        role={role}
                        isOnboarding={isOnboarding}
                        element={Dashboard}
                        theme={theme}
                      />
                    }
                  />
                  <Route
                    path="/onboarding"
                    element={
                      <OnboardingRoutePrivate
                        isLoggedIn={isLoggedIn}
                        role={role}
                        isOnboarding={isOnboarding}
                        element={Onboarding}
                        theme={theme}
                      />
                    }
                  />
                </Routes>
              </Router>
            </div>
          </ThemeProvider>
        )}
      </ThemeContext.Consumer>
    </CustomThemeProvider>
  );
};

export default App;
