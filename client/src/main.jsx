import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { ToastContainer } from 'react-toastify';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import TodoProvider from './context/TodoContext.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TodoProvider>
          <App />
        </TodoProvider>
      </AuthProvider>
      <ToastContainer />
    </BrowserRouter>
  </StrictMode>,
);
