import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './components/context/CartContext.jsx';
import { AuthProvider } from './components/context/AuthContext.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID, 'google client id')

console.log('React App is being initialized...');
const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
      </AuthProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
console.log('React App has been initialized!');

