import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TransactionProvider } from "./contexts/TransactionContext";
import { DarkModeProvider, useDarkMode } from "./contexts/DarkModeContext";
import "./App.css";

// Components and Pages:
import Dashboard from "./pages/Dashboard/Dashboard";
import Transactions from "./pages/Transactions/Transactions";
import Settings from "./pages/Settings/Settings";
import Login from "./pages/LoginForms/Login";
import SignUp from "./pages/LoginForms/Signup";
import ForgotPassword from "./pages/LoginForms/ForgotPassword";
import { useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`app-container ${isDarkMode ? "dark" : ""}`}>
      {children}
    </div>
  );
};

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`pages-container ${isDarkMode ? "dark" : ""}`}>
      <div className="main-content">{children}</div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <DarkModeProvider>
        <DarkModeBodyWrapper />
        <TransactionProvider>
          <Routes>
            <Route
              path="/"
              element={
                <AuthLayout>
                  <Login />
                </AuthLayout>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <AuthLayout>
                  <ForgotPassword />
                </AuthLayout>
              }
            />
            <Route
              path="/signup"
              element={
                <AuthLayout>
                  <SignUp />
                </AuthLayout>
              }
            />

            <Route
              path="/dashboard"
              element={
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              }
            />
            <Route
              path="/transactions"
              element={
                <DashboardLayout>
                  <Transactions />
                </DashboardLayout>
              }
            />
            <Route
              path="/settings"
              element={
                <DashboardLayout>
                  <Settings />
                </DashboardLayout>
              }
            />
          </Routes>
        </TransactionProvider>
      </DarkModeProvider>
    </Router>
  );
};

const DarkModeBodyWrapper = () => {
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return null;
};

export default App;
