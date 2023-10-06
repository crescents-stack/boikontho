"use client";
import { useUserProvider } from "@/contexts/userprovider";
import { ReactElement } from "react";

const PrivateRoute = ({ children }: { children: ReactElement }) => {
  const { user } = useUserProvider();
  (async () => {
    if (!user) {
      window.location.replace("/login");
      return <div></div>;
    }
  })();
  return <div>{children}</div>;
};

export default PrivateRoute;
