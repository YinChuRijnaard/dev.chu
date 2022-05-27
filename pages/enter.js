import { useCallback, useContext, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { auth, firestore, googleAuthProvider } from "../lib/firebase";
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
    <div className="mx-32 mt-8 space-y-4">
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
        className="flex items-center justify-around rounded-md bg-neutral-900 py-2 px-4 font-bold text-white hover:bg-neutral-800"
        onClick={() => auth.signOut()}>
        Sign out
      </button>
    </div>
  );
}

// Username form
function UsernameForm() {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Create refs for both documents
    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${formValue}`);

    const batch = firestore.batch();
    batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };

  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        console.log("Firestore read executed!");
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    [],
  );

  return (
    !username && (
      <section className="mx-32 mt-8 space-y-4 ">
        <h3 className="font-bold">Choose username</h3>
        <form className="space-y-4" onSubmit={onSubmit}>
          <input
            className="rounded-md p-2"
            name="username"
            placeholder="username"
            value={formValue}
            onChange={onChange}
          />
          <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
          <button
            className="md rounded bg-green-500 px-4 py-2 font-bold text-white disabled:bg-green-600"
            type="submit"
            disabled={!isValid}>
            Choose
          </button>

          <h3 className="font-bold">Debug State</h3>
          <div>
            <span className="font-bold">Username:</span> <span className="font-mono">{formValue}</span>
            <br />
            <span className="font-bold">Loading:</span> <span className="font-mono">{loading.toString()}</span>
            <br />
            <span className="font-bold">Username Valid:</span> <span className="font-mono">{isValid.toString()}</span>
          </div>
        </form>
      </section>
    )
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p className="italic">Checking...</p>;
  } else if (isValid) {
    return <p className="font-bold text-green-500">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="font-bold text-red-500">That username is taken!</p>;
  } else {
    return <p></p>;
  }
}
