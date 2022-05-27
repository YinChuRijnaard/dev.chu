import { auth, googleAuthProvider } from "../lib/firebase";
import { useContext } from "react";
import { UserContext } from "../lib/context";

export default function Enter(props) {
  const { user, username } = useContext(UserContext);

  // 1. User signed out, <SignInButton />
  // 2. User signed in but no username, <UsernameForm />
  // 3. User signed in and has username, <SignOutButton />

  return <main>{user ? !username ? <UsernameForm /> : <SignOutButton /> : <SignInButton />}</main>;
}

// Sign in with Google button
function SignInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  return (
    <div className="mx-32 mt-8 space-y-4 p-4">
      <button
        className="flex items-center justify-around rounded-md bg-neutral-900 py-2 px-4 font-bold text-white hover:bg-neutral-800"
        onClick={signInWithGoogle}>
        <img className="mr-4 h-8 w-8" src={"./google.png"} />
        Sign in with Google
      </button>
      <button
        className="flex items-center justify-around rounded-md bg-neutral-900 py-2 px-4 font-bold text-white hover:bg-neutral-800"
        onClick={() => auth.signInAnonymously()}>
        Sign in Anonymously
      </button>
    </div>
  );
}

// Sign out button
function SignOutButton() {
  return (
    <div className="mx-32 mt-8 p-4">
      <button
        className="flex items-center justify-around rounded-md bg-white py-2 px-4 font-bold text-red-500"
        onClick={() => auth.signOut()}>
        Sign out
      </button>
    </div>
  );
}

function UsernameForm() {
  return null;
}
