// Simple cart store using localStorage that works across different hydration strategies

export interface CartItem {
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

const CART_STORAGE_KEY = 'astro-ecommerce-cart';

// Get cart from localStorage
export function getCartItems(): CartItem[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return [];
  }
}

// Save cart to localStorage
export function saveCartItems(items: CartItem[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: items }));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
}

// Add item to cart
export function addToCart(product: Omit<CartItem, 'quantity'>): void {
  console.log('🛒 addToCart called with:', product);
  
  const currentItems = getCartItems();
  const existingItem = currentItems.find(item => item.id === product.id);
  
  let newItems: CartItem[];
  
  if (existingItem) {
    // Update quantity if item exists
    newItems = currentItems.map(item =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    console.log('🛒 Updated existing item quantity');
  } else {
    // Add new item
    newItems = [...currentItems, { ...product, quantity: 1 }];
    console.log('🛒 Added new item to cart');
  }
  
  saveCartItems(newItems);
  console.log('✅ Cart updated, new items:', newItems);
}

// Remove item from cart
export function removeFromCart(id: string): void {
  const currentItems = getCartItems();
  const newItems = currentItems.filter(item => item.id !== id);
  saveCartItems(newItems);
}

// Update item quantity
export function updateQuantity(id: string, quantity: number): void {
  if (quantity < 1) {
    removeFromCart(id);
    return;
  }
  
  const currentItems = getCartItems();
  const newItems = currentItems.map(item =>
    item.id === id ? { ...item, quantity } : item
  );
  saveCartItems(newItems);
}

// Clear entire cart
export function clearCart(): void {
  saveCartItems([]);
}

// Get total items count
export function getTotalItems(): number {
  const items = getCartItems();
  return items.reduce((total, item) => total + item.quantity, 0);
}

// Get total price
export function getTotalPrice(): number {
  const items = getCartItems();
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
} 