import { BookList } from "@/utils/data";
import Image from "next/image";

const Books = () => {
  return (
    <div className="flex flex-wrap items-center justify-start gap-10">
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
              className="w-full h-full"
            />
            <p className="font-bold">{item.title}</p>
            <p>${item.price}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Books;
