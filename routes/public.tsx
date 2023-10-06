"use client";
import { useUserProvider } from "@/contexts/userprovider";
import { ReactElement } from "react";

const PublicRoute = ({ children }: { children: ReactElement }) => {
  const { user } = useUserProvider();
  (async () => {
    if (user) {
      window.location.replace("/dashboard");
      return <div></div>;
    }
  })();
  return <div>{children}</div>;
};

export default PublicRoute;
