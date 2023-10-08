"use client";
import { title } from "@/components/primitives";
import { useCartProvider } from "@/contexts/cartprovider";
import { BookList } from "@/utils/data";
import { Button } from "@nextui-org/button";
import Image from "next/image";

export default function BooksPage() {
  const { cart, setCart } = useCartProvider();

  const AddToCart = (book: any) => {
    if (cart.length > 0) {
      if (cart.length > 0) {
        if (!cart.filter((item: any) => item.id === book.id).length) {
          setCart([...cart, { ...book, quantity: 1 }]);
          localStorage.setItem(
            "cart",
            JSON.stringify([...cart, { ...book, quantity: 1 }])
          );
        }
      }
    } else {
      setCart([{ ...book, quantity: 1 }]);
      localStorage.setItem("cart", JSON.stringify([{ ...book, quantity: 1 }]));
    }
  };
  const RemoveFromCart = (id: any) => {
    if (cart.filter((item: any) => item.id === id).length) {
      const toSet = [...cart.filter((item: any) => item.id !== id)];
      setCart(toSet);
      localStorage.setItem("cart", JSON.stringify(toSet));
    }
  };
  return (
    <div>
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>All&nbsp;</h1>
        <h1 className={title({ color: "yellow" })}>Wonderful &nbsp;</h1>
        <br />
        <h1 className={title()}>Books that you need!</h1>
      </div>
      <div className="flex flex-wrap items-center justify-start gap-10 pt-10">
        {BookList.map((item: any) => {
          const inCart = cart.length
            ? cart.find((book: any) => book.id === item.id)
              ? true
              : false
            : false;
          console.log(inCart);
          return (
            <div
              key={item.id}
              className="max-w-[250px] flex flex-col items-start justify-start gap-3"
            >
              <Image
                src={`/books${item.image}`}
                alt=""
                height={500}
                width={500}
                className="w-full h-full rounded-2xl"
              />
              <p className="font-bold">{item.title}</p>
              <div className="flex justify-between items-end gap-5 w-full">
                <p>${item.price}</p>{" "}
                <Button
                  color={inCart ? "danger" : "warning"}
                  className="text-white"
                  onPress={() => {
                    !inCart ? AddToCart(item) : RemoveFromCart(item.id);
                  }}
                >
                  {inCart ? "Remove from cart" : "Add to Cart"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
