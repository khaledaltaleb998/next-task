import { signal, computed, effect } from "@preact/signals-react";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

export const cartItems = signal<CartItem[]>([]);

export const totalItems = computed(() =>
  cartItems.value.reduce((s, i) => s + i.quantity, 0)
);

export const totalPrice = computed(() =>
  cartItems.value.reduce((s, i) => s + i.price * i.quantity, 0)
);

export const addToCart = (item: Omit<CartItem, 'quantity'>, qty: number = 1) => {
  const existing = cartItems.value.find((i) => i.id === item.id);
  if (existing) {
    cartItems.value = cartItems.value.map((i) =>
      i.id === item.id ? { ...i, quantity: i.quantity + qty } : i
    );
  } else {
    cartItems.value = [...cartItems.value, { ...item, quantity: qty }];
  }
};

export const removeFromCart = (id: number) => {
  cartItems.value = cartItems.value.filter((i) => i.id !== id);
};

export const updateQuantity = (id: number, qty: number) => {
  cartItems.value = cartItems.value.map((i) =>
    i.id === id ? { ...i, quantity: Math.max(1, qty) } : i
  );
};

export const clearCart = () => {
  cartItems.value = [];
};

const CART_STORAGE_KEY = 'next-cart-signals';

export const initCart = () => {
  if (typeof window === 'undefined') return;

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      cartItems.value = JSON.parse(stored);
    } 
  } catch (e) {
    console.error("Failed to load cart from local storage", e);
  }

  effect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems.value));
  });
};
