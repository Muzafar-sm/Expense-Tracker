import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useMemo } from 'react';

import Layout from './components/layout/Layout';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import ForgotPassword from './components/auth/ForgotPassword';
import Dashboard from './components/dashboard/Dashboard';
import ExpenseForm from './components/expenses/ExpenseForm';
import ExpenseList from './components/expenses/ExpenseList';
import Reports from './components/reports/Reports';
import Settings from './components/settings/Settings';

import { ExpenseProvider } from './context/ExpenseContext';

const App = () => {
  const [mode, setMode] = useState('light'); // Initialize with 'light' mode

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#9c27b0', // Purple
          },
          secondary: {
            main: '#3f51b5', // Indigo
          },
          background: {
            default: mode === 'light' ? '#f5f5f5' : '#121212',
            paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
          },
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          h1: {
            fontFamily: '"Space Grotesk", sans-serif',
          },
          h2: {
            fontFamily: '"Space Grotesk", sans-serif',
          },
          h3: {
            fontFamily: '"Space Grotesk", sans-serif',
          },
          h4: {
            fontFamily: '"Space Grotesk", sans-serif',
          },
          h5: {
            fontFamily: '"Space Grotesk", sans-serif',
          },
          h6: {
            fontFamily: '"Space Grotesk", sans-serif',
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ExpenseProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/"
              element={
                <Layout setMode={setMode}>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/expenses"
              element={
                <Layout setMode={setMode}>
                  <ExpenseList />
                </Layout>
              }
            />
            <Route
              path="/add-expense"
              element={
                <Layout setMode={setMode}>
                  <ExpenseForm />
                </Layout>
              }
            />
            <Route
              path="/reports"
              element={
                <Layout setMode={setMode}>
                  <Reports />
                </Layout>
              }
            />
            <Route
              path="/settings"
              element={
                <Layout setMode={setMode}>
                  <Settings />
                </Layout>
              }
            />
          </Routes>
        </Router>
      </ExpenseProvider>
    </ThemeProvider>
  );
};

export default App;
