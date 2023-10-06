import { ReactElement } from "react";
import ToastProvider from "./toastprovider";
import UserProvider from "./userprovider";

const ContextWrapper = ({ children }: { children: ReactElement }) => {
  return (
    <ToastProvider>
      <UserProvider>{children}</UserProvider>
    </ToastProvider>
  );
};

export default ContextWrapper;
