import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import router from './routes/router.jsx';
import { RouterProvider } from 'react-router';
import AuthProvider from './contexts/AuthContext/AuthProvider.jsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
