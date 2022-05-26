import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import "tailwindcss/tailwind.css"; // This import was needed too
import { UserContext } from "../lib/context";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <UserContext.Provider value={{ user: {}, username: "Yin Chu" }}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp;

/*
  NOTES
  * This is the main entry point for any page in the application. It wraps all other 
  * Use it to: add UI components that are available on every page (e.g., a navbar or footer)
  * Use it to: manage the authentication state on the frontend
*/
