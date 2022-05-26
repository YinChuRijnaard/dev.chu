import Head from "next/head";
import Link from "next/link";
import Loader from "../components/Loader";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Loader show={false} />
    </div>
  );
}
