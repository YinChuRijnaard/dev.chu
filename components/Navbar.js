import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/context";

export default function Navbar() {
  const { user, username } = useContext(UserContext);

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
          <div className="flex items-center justify-end space-x-8">
            <li>
              <Link href="/admin">
                <button className="rounded-md bg-blue-700 py-2 px-4 text-lg font-bold text-white hover:underline hover:decoration-amber-500">
                  Write Posts
                </button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img className="h-12 w-12 cursor-pointer" src={user?.photoURL || "/hacker.png"} />
              </Link>
            </li>
          </div>
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
