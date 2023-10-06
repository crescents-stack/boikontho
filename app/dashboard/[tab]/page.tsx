"use client";

import Books from "@/components/dashboard/books";
import Orders from "@/components/dashboard/orders";
import Profile from "@/components/dashboard/profile";
import Settings from "@/components/dashboard/settings";
import Users from "@/components/dashboard/users";
import { usePathname } from "next/navigation";

const DashboardTab = () => {
  const pathname = usePathname();
  return (
    <>
      {pathname.includes("profile") ? (
        <Profile />
      ) : pathname.includes("users") ? (
        <Users />
      ) : pathname.includes("books") ? (
        <Books />
      ) : pathname.includes("orders") ? (
        <Orders />
      ) : pathname.includes("settings") ? (
        <Settings />
      ) : null}
    </>
  );
};

export default DashboardTab;
