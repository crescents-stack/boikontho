"use client";
import { title } from "@/components/primitives";
import { useCartProvider } from "@/contexts/cartprovider";
import { BookList } from "@/utils/data";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function BooksPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { cart, setCart } = useCartProvider();

  const AddToCart = (_id: any) => {
    if (cart) {
      if (cart.length === 0) {
        setCart([_id]);
        localStorage.setItem("cart", JSON.stringify([_id]));
      }
      if (cart?.length > 0) {
        if (!cart.includes(_id)) {
          setCart([...cart, _id]);
          localStorage.setItem("cart", JSON.stringify([...cart, _id]));
        }
      }
    } else {
      setCart([_id]);
      localStorage.setItem("cart", JSON.stringify([_id]));
    }
  };
  const RemoveFromCart = (_id: any) => {
    if (cart.includes(_id)) {
      const toSet = [...cart.filter((item: Number) => item !== _id)];
      setCart(toSet);
      localStorage.setItem("cart", JSON.stringify(toSet));
    }
  };
  console.log(cart);
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
                  color={cart?.includes(item.id) ? "default" : "warning"}
                  className="text-white"
                  onPress={() =>
                    !cart?.includes(item.id)
                      ? AddToCart(item.id)
                      : RemoveFromCart(item.id)
                  }
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
