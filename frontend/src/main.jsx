import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './components/context/CartContext.jsx';
import { AuthProvider } from './components/context/AuthContext.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

