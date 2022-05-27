import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import { auth } from "../lib/firebase";

export default function Navbar() {
  const { user, username } = useContext(UserContext);

  const router = useRouter();

  const signOut = () => {
    auth.signOut();
    router.reload();
  };

  return (
    <nav className="rounded-b-lg bg-white p-2 shadow-sm shadow-neutral-400">
      <ul className="mx-32 flex items-center justify-between">
        <li>
          <Link href="/">
            <button className="rounded-md bg-neutral-900 py-2 px-4 font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="hover h-6 w-6 stroke-white hover:stroke-neutral-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </button>
          </Link>
        </li>

        {/* User is signed-in and has username */}
        {/* Not conditionally rendering the buttons below because username has not yet been coded */}
        {username && (
          <div className="ml-auto flex items-center justify-end space-x-8 ">
            <li>
              <button
                className="flex rounded-md border-2 border-neutral-500 py-2 px-4 font-bold duration-300 hover:border-neutral-900"
                onClick={signOut}>
                Sign out
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </li>
            <li>
              <Link href="/admin">
                <button className="flex items-center rounded-md border-2 border-neutral-500 py-2 px-4 font-bold hover:border-neutral-900">
                  Write Posts{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img className="h-12 w-12 cursor-pointer rounded-full" src={user?.photoURL || "/hacker.png"} />
              </Link>
            </li>
          </div>
        )}

        {/* User is not signed-in OR has not created a username */}
        {!username && (
          <li>
            <Link href="/enter">
              <button className="flex rounded-md border-2 border-neutral-500 py-2 px-4 font-bold hover:border-neutral-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Sign in
              </button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
