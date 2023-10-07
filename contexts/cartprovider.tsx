"use client";

import {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface CartState {
  cart: any;
  setCart: Dispatch<SetStateAction<any>>;
}
const CartContext = createContext<any>([]);

const CartProvider = ({ children }: { children: ReactElement }) => {
  const [cart, setCart] = useState<any>([]);
  useEffect(() => {
    if (!cart.length) {
      const cartInLS = localStorage.getItem("cart");
      if (cartInLS) {
        setCart(JSON.parse(cartInLS));
      }
    }
  }, []);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCartProvider = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCartProvider must be used within ContextWrapper");
  }

  return context;
};
