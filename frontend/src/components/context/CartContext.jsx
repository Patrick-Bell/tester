import React, { useState, useEffect, createContext, useContext } from "react";

// Create a context
const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Initialize cart state from localStorage
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [cartNumber, setCartNumber] = useState(0)

  // Save cart state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Function to add item to cart
  const addItemToCart = (item) => {
    const existingProduct = cart.find(c => c.id === item.id);
  
    if (existingProduct) {
      // Update quantity of existing product
      setCart(cart.map(c => 
        c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
      ));
    } else {
      // Add new product with quantity 1
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };
  

  // Function to remove item from cart
  const removeItemFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const handleCartNumber = () => {
    const n = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartNumber(n);
  };
  
  useEffect(() => {
    handleCartNumber()
  }, [cart])

  // Function to clear the cart
  const clearCart = () => {
    setCart([]);
  };

  // Context value
  const value = {
    cart,
    addItemToCart,
    removeItemFromCart,
    clearCart,
    handleCartNumber,
    cartNumber
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => {
  return useContext(CartContext);
};