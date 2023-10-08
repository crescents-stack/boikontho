/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useUserProvider } from "@/contexts/userprovider";
import { Button } from "@nextui-org/button";
import { Tabs, Tab, Chip } from "@nextui-org/react";
import { Book, Boxes, Settings, User, Users } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardNav() {
  const { user, setUser } = useUserProvider();
  const pathname = usePathname();
  const [selected, setSelected] = useState(
    pathname?.replace("/dashboard/", "") || "profile"
  );
  const router = useRouter();
  useEffect(() => {
    router.push(`/dashboard/${selected}`);
  }, [selected]);
  return (
    <div className="flex items-center justify-between gap-5 w-full border-b border-divider">
      <div className="flex w-full flex-col">
        <Tabs
          aria-label="Options"
          color="primary"
          variant="underlined"
          classNames={{
            tabList: "gap-6 w-full relative rounded-none p-0",
            cursor: "w-full bg-primary",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-primary",
          }}
          selectedKey={selected}
          onSelectionChange={(e) => {
            setSelected(e as string);
          }}
        >
          <Tab
            key="profile"
            title={
              <div className="flex items-center space-x-2">
                <User />
                <span>Profile</span>
              </div>
            }
          />

          {user?.role === "admin" ? (
            <Tab
              key="users"
              title={
                <div className="flex items-center space-x-2">
                  <Users />
                  <span>Users</span>
                </div>
              }
            />
          ) : null}

          {user?.role === "admin" ? (
            <Tab
              key="books"
              title={
                <div className="flex items-center space-x-2">
                  <Book />
                  <span>Books</span>
                </div>
              }
            />
          ) : null}

          <Tab
            key="orders"
            title={
              <div className="flex items-center space-x-2">
                <Boxes />
                <span>Orders</span>
              </div>
            }
          />
          <Tab
            key="settings"
            title={
              <div className="flex items-center space-x-2">
                <Settings />
                <span>Settings</span>
              </div>
            }
          />
        </Tabs>
      </div>
    </div>
  );
}
