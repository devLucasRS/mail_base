import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import ChatInterface from './components/ChatInterface';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  // Usar o email do usuário do .env
  const currentUser = process.env.REACT_APP_EMAIL_USER || 'slucasmvlog3@gmail.com';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ChatInterface currentUser={currentUser} />
    </ThemeProvider>
  );
}

export default App; 