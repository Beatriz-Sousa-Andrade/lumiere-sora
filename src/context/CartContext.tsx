"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: number;
  nome: string;
  preco: string;
  imagem: string;
  quantidade: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantidade">) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Load from localStorage only on client side
  useEffect(() => {
    setIsMounted(true);
    const storedCart = localStorage.getItem("lumiere_cart");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (e) {
        console.error("Erro ao carregar o carrinho do localStorage", e);
      }
    }
  }, []);

  // Save to localStorage when cart items change
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("lumiere_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isMounted]);

  const addToCart = (newItem: Omit<CartItem, "quantidade">) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...prevItems, { ...newItem, quantidade: 1 }];
    });
    // Open the cart automatically when a product is added
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantidade: quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const parsePrice = (priceStr: string) => {
    const clean = priceStr
      .replace("R$", "")
      .replace(/\s/g, "")
      .replace(/\./g, "")
      .replace(",", ".");
    return parseFloat(clean) || 0;
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantidade, 0);
  const cartTotal = cartItems.reduce(
    (acc, item) => acc + parsePrice(item.preco) * item.quantidade,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
}
