import { ReactElement } from "react";
import ToastProvider from "./toastprovider";

const ContextWrapper = ({ children }: { children: ReactElement }) => {
  return <ToastProvider>{children}</ToastProvider>;
};

export default ContextWrapper;
