import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// this is the equivalent to the createStore method of Redux
// https://redux.js.org/api/createstore

// Cart item interface
interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  thumb_src: string;
  thumb_alt: string;
  color?: string;
  size?: string;
  description?: string;
  stock?: boolean;
  category?: string;
  rating?: number;
}

// Cart context interface
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

// Dashboard context interface (existing functionality + cart)
interface DashboardContextType extends CartContextType {
  // Add other dashboard state here if needed
}

const DashboardContext = createContext<DashboardContextType>({} as DashboardContextType);

// Provider component
export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    console.log('🛒 addToCart called with:', product);
    setCartItems(prev => {
      console.log('🛒 Current cart items:', prev);
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        // If item already exists, increase quantity
        console.log('🛒 Item exists, updating quantity');
        const newCart = prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        console.log('🛒 New cart after quantity update:', newCart);
        return newCart;
      } else {
        // If new item, add with quantity 1
        console.log('🛒 New item, adding to cart');
        const newCart = [...prev, { ...product, quantity: 1 }];
        console.log('🛒 New cart after adding item:', newCart);
        return newCart;
      }
    });
    
    // Show notification or feedback
    console.log(`✅ Added ${product.title} to cart`);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const value: DashboardContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

// Custom hook to use the context
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

// Custom hook specifically for cart functionality
export const useCart = () => {
  const { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getTotalItems, getTotalPrice } = useDashboard();
  return { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getTotalItems, getTotalPrice };
};

export default DashboardContext;
