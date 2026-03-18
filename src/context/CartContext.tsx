import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { message } from 'antd';
import type { Product } from '../data/products';

export interface CartItem extends Product {
  quantity: number;
  selected: boolean;
  selectedSpec: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity: number, spec: string) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  updateSpec: (id: number, spec: string) => void;
  toggleSelect: (id: number) => void;
  toggleSelectAll: (selected: boolean) => void;
  clearCart: () => void;
  getSelectedItems: () => CartItem[];
  getTotalPrice: () => number;
  getTotalSaving: () => number;
  getTotalCount: () => number;
}

const CART_STORAGE_KEY = 'shopping_cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

function loadCartFromStorage(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCartToStorage(items: CartItem[]) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save cart to storage:', e);
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => loadCartFromStorage());

  useEffect(() => {
    saveCartToStorage(items);
  }, [items]);

  const addItem = (product: Product, quantity: number, spec: string) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.id === product.id && item.selectedSpec === spec
      );

      if (existingIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: Math.min(updatedItems[existingIndex].quantity + quantity, 10),
        };
        message.success(`已更新 ${product.name} 的数量`);
        return updatedItems;
      }

      message.success(`已添加 ${product.name} x${quantity} 到购物车`);
      return [
        ...prevItems,
        {
          ...product,
          quantity,
          selected: true,
          selectedSpec: spec,
        },
      ];
    });
  };

  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    message.success('已从购物车移除');
  };

  const updateQuantity = (id: number, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const updateSpec = (id: number, spec: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, selectedSpec: spec } : item
      )
    );
  };

  const toggleSelect = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const toggleSelectAll = (selected: boolean) => {
    setItems((prevItems) =>
      prevItems.map((item) => ({ ...item, selected }))
    );
  };

  const clearCart = () => {
    setItems([]);
    message.success('购物车已清空');
  };

  const getSelectedItems = () => items.filter((item) => item.selected);

  const getTotalPrice = () =>
    getSelectedItems().reduce((sum, item) => sum + item.price * item.quantity, 0);

  const getTotalSaving = () =>
    getSelectedItems().reduce(
      (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
      0
    );

  const getTotalCount = () =>
    items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        updateSpec,
        toggleSelect,
        toggleSelectAll,
        clearCart,
        getSelectedItems,
        getTotalPrice,
        getTotalSaving,
        getTotalCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
