import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/context";

// Component's chidren only shown to logged-in users
export default function AuthCheck(props) {
  const { username } = useContext(UserContext);

  return username
    ? props.children
    : props.fallback || (
        <div className="mx-32 mt-8 space-y-4">
          <Link href="/enter">
            <button className="flex items-center justify-around rounded-md bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-400">
              Oh oh... login to continue
            </button>
          </Link>
        </div>
      );
}
