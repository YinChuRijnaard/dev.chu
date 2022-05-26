import Link from "next/link";

export default function Navbar() {
  const user = null;
  const username = null;

  return (
    <nav className="rounded-b-lg bg-white p-4 shadow-sm shadow-neutral-400">
      <ul className="mx-32 flex items-center justify-between">
        <li>
          <Link href="/">
            <button className="rounded-md bg-neutral-900 py-2 px-4 text-lg font-bold text-white hover:underline hover:decoration-amber-500">
              FEED
            </button>
          </Link>
        </li>

        {/* User is signed-in and has username */}
        {username && (
          <>
            <li>
              <Link href="/admin">
                <button>Write Posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img src={user?.photoURL} />
              </Link>
            </li>
          </>
        )}

        {/* User is not signed-in OR has not created a username */}
        {!username && (
          <li>
            <Link href="/enter">
              <button className="rounded-md bg-blue-700 py-2 px-4 text-lg font-bold text-white hover:underline hover:decoration-amber-500">
                Log in
              </button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
