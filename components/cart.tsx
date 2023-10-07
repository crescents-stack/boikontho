"use client";

import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Badge,
} from "@nextui-org/react";
import { useCartProvider } from "@/contexts/cartprovider";
import { CartIcon } from "./icons/carticon";
import Image from "next/image";
import { Minus, Plus, Trash } from "lucide-react";
import CheckoutForm from "./checkoutform";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const stripePromise = loadStripe("pk_test_qblFNYngBkEdjEZ16jxxoWSM");
// const options = {
//   // passing the client secret obtained from the server
//   clientSecret: "sk_test_26PHem9AhJZvU623DfE1x4sd",
// };

export default function Cart() {
  const { cart, setCart } = useCartProvider();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [stripeClientSecret, setStripeClientSecret] = useState(null);

  const QuantityManager = (id: Number, IncOrDec: Boolean) => {
    const newCart = [
      ...cart.map((item: any) => {
        if (item.id === id) {
          IncOrDec ? item.quantity++ : item.quantity--;
        }
        return item;
      }),
    ];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };
  const RemoveBook = (id: Number) => {
    const newCart = [...cart.filter((item: any) => item.id !== id)];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const CalculatePrice = () => {
    let price = 0;
    cart.map((book: any) => (price += book.price * book.quantity));
    return price;
  };

  const GetClientSecret = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    const amount = CalculatePrice();
    try {
      const response = await axios.post(
        `${process.env.BACKEND_URL}/stripe/secret`,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        setStripeClientSecret(response.data.client_secret);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage && cart.length) {
      GetClientSecret();
    }
  }, [cart]);

  return (
    <>
      <Badge
        color="danger"
        content={cart ? cart.length : "0"}
        shape="circle"
        onClick={() => {
          onOpen();
        }}
        className="cursor-pointer"
      >
        <div
          onClick={() => {
            onOpen();
          }}
          className="cursor-pointer"
        >
          <CartIcon size={24} />
        </div>
      </Badge>
      <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Your items in cart and Checkout
              </ModalHeader>
              <ModalBody>
                <section className="mb-5">
                  {cart.length
                    ? cart.map((item: any) => {
                        return (
                          <div
                            key={item.id}
                            className="flex flex-wrap items-center justify-between gap-5 pb-3 border-b dark:border-gray-800 mb-3"
                          >
                            <div className="flex gap-3">
                              <div>
                                <Image
                                  src={`/books${item.image}`}
                                  alt=""
                                  height={500}
                                  width={500}
                                  className="w-[50px] h-auto rounded-2xl"
                                />
                              </div>
                              <div>
                                <p className="font-semibold">{item.title}</p>
                                <p>
                                  ${item.price} x {item.quantity}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                isIconOnly
                                disabled={item.quantity === 1}
                                onPress={() => QuantityManager(item.id, false)}
                              >
                                <Minus className="w-5 h-5" />
                              </Button>
                              <div className="px-4 text-2xl">
                                {item.quantity}
                              </div>
                              <Button
                                isIconOnly
                                color="primary"
                                onPress={() => QuantityManager(item.id, true)}
                              >
                                <Plus className="w-5 h-5" />
                              </Button>
                              <Button
                                isIconOnly
                                color="danger"
                                onPress={() => RemoveBook(item.id)}
                              >
                                <Trash className="w-5 h-5" />
                              </Button>
                            </div>
                          </div>
                        );
                      })
                    : "No book added!"}
                </section>
                {cart.length ? (
                  <section className="mb-5">
                    <div className="flex items-center justify-center gap-10 font-semibold text-primary">
                      <p>Total Amount</p>
                      <p>${CalculatePrice()}</p>
                    </div>
                    <div className="py-10 max-w-[300px] mx-auto">
                    {stripeClientSecret ? (
                      <Elements
                        stripe={stripePromise}
                        options={{ clientSecret: stripeClientSecret }}
                      >
                        <CheckoutForm />
                      </Elements>
                    ) : null}
                    </div>
                  </section>
                ) : null}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
