import { auth, googleAuthProvider } from "../lib/firebase";

export default function Enter(props) {
  const user = null;
  const username = null;

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
    <div className="mx-32 mt-8 p-4">
      <button
        className="flex items-center justify-around rounded-md bg-white py-2 px-4 font-bold hover:underline hover:decoration-amber-500"
        onClick={signInWithGoogle}>
        <img className="mr-4 h-8 w-8" src={"./google.png"} />
        Sign in with Google
      </button>
    </div>
  );
}

// Sign out button
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign out</button>;
}

function UsernameForm() {
  return null;
}
