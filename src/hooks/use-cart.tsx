import { useEffect, useState, useCallback } from "react";
import type { Product } from "@/lib/data";

const STORAGE_KEY = "vogue-vault-cart";
let cartStore: CartItem[] = [];
let initialized = false;
const subscribers = new Set<(items: CartItem[]) => void>();

export type CartItem = Product & {
  key: string;
  qty: number;
  size: string;
  color: string;
};

function parseCart(value: string | null): CartItem[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed
        .filter((item) => item && typeof item === "object" && typeof item.key === "string")
        .map(
          (item) =>
            ({
              ...item,
              qty: typeof item.qty === "number" ? item.qty : 1,
              size: typeof item.size === "string" ? item.size : "M",
              color: typeof item.color === "string" ? item.color : "Onyx",
            }) as CartItem,
        );
    }
  } catch {
    return [];
  }
  return [];
}

function notifySubscribers(items: CartItem[]) {
  subscribers.forEach((subscriber) => subscriber(items));
}

function loadCart() {
  if (initialized || typeof window === "undefined") return cartStore;
  initialized = true;
  cartStore = parseCart(window.localStorage.getItem(STORAGE_KEY));
  return cartStore;
}

function persistCart(nextItems: CartItem[]) {
  cartStore = nextItems;
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems));
    }
  } catch {
    // ignore localStorage failures
  }
  notifySubscribers(nextItems);
}

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    return loadCart();
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const loaded = loadCart();
    setCartItems(loaded);

    const subscriber = (items: CartItem[]) => setCartItems(items);
    subscribers.add(subscriber);
    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        setCartItems(parseCart(event.newValue));
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => {
      subscribers.delete(subscriber);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const addToCart = useCallback((product: Product, qty: number, size: string, color: string) => {
    const key = `${product.id}|${size}|${color}`;
    const existing = cartStore.find((item) => item.key === key);
    const next = existing
      ? cartStore.map((item) => (item.key === key ? { ...item, qty: item.qty + qty } : item))
      : [...cartStore, { ...product, key, qty, size, color }];
    persistCart(next);
  }, []);

  const updateQuantity = useCallback((key: string, qty: number) => {
    const next = cartStore.map((item) =>
      item.key === key ? { ...item, qty: Math.max(1, qty) } : item,
    );
    persistCart(next);
  }, []);

  const removeItem = useCallback((key: string) => {
    const next = cartStore.filter((item) => item.key !== key);
    persistCart(next);
  }, []);

  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);

  return { cartItems, cartCount, addToCart, updateQuantity, removeItem };
}
