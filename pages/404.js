import Link from "next/link";

export default function Custom404() {
  return (
    <main className="mx-32 mt-8 flex flex-col items-center space-y-4">
      <h1 className="text-4xl font-bold">404 - That page does not seem to exist...</h1>
      <iframe
        src="https://giphy.com/embed/l2JehQ2GitHGdVG9y"
        width="480"
        height="362"
        frameBorder="0"
        allowFullScreen></iframe>
      <Link href="/">
        <button className="flex items-center justify-around rounded-md bg-neutral-900 py-2 px-4 font-bold text-white hover:bg-neutral-800">
          Go home
        </button>
      </Link>
    </main>
  );
}
