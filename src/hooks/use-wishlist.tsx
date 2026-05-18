import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "vogue-vault-wishlist";

function parseWishlist(value: string | null) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed.filter((item) => typeof item === "string");
    }
  } catch {
    return [];
  }
  return [];
}

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    setWishlist(parseWishlist(storedValue));
  }, []);

  const saveWishlist = useCallback((nextWishlist: string[]) => {
    setWishlist(nextWishlist);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextWishlist));
    } catch {
      // ignore localStorage failures
    }
  }, []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore localStorage failures
      }
      return next;
    });
  }, []);

  const isWishlisted = useCallback((id: string) => wishlist.includes(id), [wishlist]);

  return { wishlist, toggleWishlist, isWishlisted, saveWishlist };
}
