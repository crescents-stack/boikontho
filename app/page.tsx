import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Make&nbsp;</h1>
        <h1 className={title({ color: "blue" })}>beautiful book&nbsp;</h1>
        <br />
        <h1 className={title()}>
          choice regardless of your buying experience.
        </h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern Book library.
        </h2>
      </div>

      <div className="flex gap-3">
        <Link
        //   isExternal
          as={NextLink}
          href={"/books"}
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
        >
          Most Popular Books
        </Link>
        <Link
        //   isExternal
          as={NextLink}
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={"/books"}
        >
          <GithubIcon size={20} />
          Source Code
        </Link>
      </div>
    </section>
  );
}
