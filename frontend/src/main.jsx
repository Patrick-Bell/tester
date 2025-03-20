import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { CartProvider } from './components/context/CartContext.jsx';

console.log('React App is being initialized...');
const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
console.log('React App has been initialized!');

