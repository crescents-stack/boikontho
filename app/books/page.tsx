import { title } from "@/components/primitives";

export default function DocsPage() {
  return (
    <div>
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>All&nbsp;</h1>
        <h1 className={title({ color: "blue" })}>Wonderful &nbsp;</h1>
        <br />
        <h1 className={title()}>Books that you need!</h1>
      </div>
    </div>
  );
}
