"use client";

import { Toast } from "@/types";
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export interface ToastContextState {
  toast: Toast;
  setToast: Dispatch<SetStateAction<Toast>>;
}


const ToastContext = createContext<ToastContextState | null>(null);

const ToastProvider = ({ children }: { children: ReactElement }) => {
  const [toast, setToast] = useState<any>(null);

  return (
    <ToastContext.Provider value={{ toast, setToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;

export const useToastProvider = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastProvider must be used within ContextWrapper");
  }

  return context;
};
