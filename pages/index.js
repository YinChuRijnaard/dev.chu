import Head from "next/head";
import Link from "next/link";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

export default function Home() {
  return (
    <div>
      <button onClick={() => toast.success("Hello!")}>Toast me</button>
    </div>
  );
}
