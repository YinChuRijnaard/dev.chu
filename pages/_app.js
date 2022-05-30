import { Toaster } from "react-hot-toast";
import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp;

/*
  TODO
  * Style the app

  NOTES
  * This is the main entry point for any page in the application. It wraps all other 
  * Use it to: add UI components that are available on every page (e.g., a navbar or footer)
  * Use it to: manage the authentication state on the frontend
*/
