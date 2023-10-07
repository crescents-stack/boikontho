import { ReactElement } from "react";
import ToastProvider from "./toastprovider";
import UserProvider from "./userprovider";
import CartProvider from "./cartprovider";

const ContextWrapper = ({ children }: { children: ReactElement }) => {
  return (
    <ToastProvider>
      <UserProvider>
        <CartProvider>{children}</CartProvider>
      </UserProvider>
    </ToastProvider>
  );
};

export default ContextWrapper;
