"use client";

import { useToastProvider } from "@/contexts/toastprovider";
import { X } from "lucide-react";

const Toast = () => {
  const { toast, setToast } = useToastProvider();
  const { title, message, variant, action, type } = toast || {
    title: "Oh ho! This is title",
    message: "Hi there. This is message body",
    variant: "solid",
    action: undefined,
    type: "normal",
  };
  return (
    <div
      className={`fixed top-[100px] right-[50px] transition ease-in-out duration-500 ${
        toast ? "translate-x-0" : "translate-x-[100vw]"
      }`}
    >
      <div
        className={`z-50 min-w-[300px] px-5 py-4 rounded-lg grid grid-cols-1 gap-1 relative ${
          variant === "shadow"
            ? "shadow-lg"
            : variant === "border"
            ? "border"
            : ""
        } ${
          type === "success"
            ? "bg-green-50 text-green-600"
            : type === "error"
            ? "bg-red-50 text-red-600"
            : type === "warning"
            ? "bg-orange-50 text-orange-600"
            : "bg-slate-50 text-slate-600"
        }`}
      >
        <span className="absolute top-0 right-0 m-2 text-gray-600">
          <X
            className="w-6 h-6 p-1 rounded-full hover:bg-slate-100 stroke-slate-800 cursor-pointer"
            onClick={() => setToast(null!)}
          />
        </span>
        <h6 className="font-medium">{title}</h6>
        <p>{message}</p>
        {action ? action : null}
      </div>
    </div>
  );
};

export default Toast;
