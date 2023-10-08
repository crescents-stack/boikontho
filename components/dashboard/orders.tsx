// "use client"

import { useUserProvider } from "@/contexts/userprovider";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/react";
import axios from "axios";
import {
  Calendar,
  Clock,
  Edit,
  LucideBadgeDollarSign,
  MapPin,
  Trash,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

// import { useState } from "react"

const Orders = () => {
  const { user } = useUserProvider();
  const [orders, setOrders] = useState([]);
  const [spinner, setSpinner] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    token && !orders.length && GetAllOrders(token);
  }, []);
  const GetAllOrders = async (token: String) => {
    setSpinner(true);
    try {
      const response = await axios.post(
        `${process.env.BACKEND_URL}/orders/get-all`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        response.data.orders.map((item: any) => {
          console.log(item.userId === user._id);
        });
        const allOrders =
          user.role === "user"
            ? response.data.orders.filter(
                (item: any) => item.userId == user._id
              )
            : response.data.orders;
        setOrders(allOrders);
        setSpinner(false);
      }
    } catch (error) {
      console.log(error);
      setSpinner(false);
    }
  };
  console.log(orders);
  return (
    <div className="w-full">
      {spinner ? (
        <Spinner />
      ) : (
        <div>
          {orders.length ? (
            <div className="">
              <div className="grid grid-cols-6 gap-4 mb-3 bg-primary text-white font-semibold w-full p-4 rounded-xl shadow hover:shadow-xl sticky top-[70px] text-center z-20">
                <div>Books</div>
                <div>Address</div>
                <div>Amount</div>
                <div>Date and Time</div>
                <div>Status</div>
                <div>Action</div>
              </div>
              {[...orders].reverse().map((order: any) => {
                console.log(order);
                const DateAndTime = new Date(order.orderDate);
                return (
                  <div
                    key={order._id}
                    className="grid grid-cols-6 gap-4 mb-3 dark:border-gray-800 w-full p-4 rounded-xl shadow hover:shadow-xl"
                  >
                    <div className="overflow-auto">
                      <div className="flex items-center justify-start gap-2 w-full">
                        {order.orderItems.map((book: any, index: number) => {
                          console.log(book);
                          return (
                            <div
                              key={index}
                              className="p-2 border border-gray-50 dark:border-gray-800 rounded-lg"
                            >
                              <Image
                                src={`/books${book.image}`}
                                alt=""
                                height={500}
                                width={500}
                                className="w-[50px] h-auto rounded-md shadow-md"
                              />
                              <p>
                                ${book.price}x{book.quantity}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <MapPin className="w-5 h-5" /> {order.shippingAddress}
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <LucideBadgeDollarSign className="w-5 h-5" />
                      {order.totalPrice}
                    </div>
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />{" "}
                        {DateAndTime.toLocaleDateString()}
                      </div>{" "}
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5" />{" "}
                        {DateAndTime.toLocaleTimeString()}
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div
                        className={`inline-block text-center px-2 rounded-full pb-[3px] font-bold border-2 ${
                          order.status === "Pending"
                            ? "bg-warning-50 text-warning border-warning"
                            : "bg-success-50 text-success border-success"
                        }`}
                      >
                        {order.status}
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-3">
                      <Button isIconOnly>
                        <Edit />
                      </Button>
                      <Button isIconOnly color="danger">
                        <Trash />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            "No order found!"
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
