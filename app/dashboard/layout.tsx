"use client";
import DashboardNav from "@/components/dashboard/dashboardnav";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, []);
  return (
    <section className="flex flex-col items-start justify-start gap-4 py-4 md:py-6 w-full">
      <DashboardNav />
      {children}
    </section>
  );
}
