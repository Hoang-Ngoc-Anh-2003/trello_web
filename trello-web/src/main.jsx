import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.js';
//MUI dialog
import { ConfirmProvider } from 'material-ui-confirm'
//cau hinh react-toastify hien thi thong bao flash message
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ConfirmProvider defaultOptions={{
        dialogProps: {
          maxWidth: 'xs'
        },
        confirmationButtonProps: {
          color: 'secondary',
          variant: 'outlined'
        },
        cancellationButtonProps: {
          color: 'inherit'
        },
        allowClose: false,
        // buttonOrder: ['confirm', 'cancel']
      }}>
        <CssBaseline />
        <App />
        <ToastContainer position='top-left' theme="colored" />
      </ConfirmProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
