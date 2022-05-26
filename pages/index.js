import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link prefetch={false} href={{ pathname: "/[username]", query: { username: "yin" } }}>
        <a>Yin Chu's profile</a>
      </Link>
    </div>
  );
}
