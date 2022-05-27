import { useContext, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import kebabCase from "lodash.kebabcase";
import { useCollection } from "react-firebase-hooks/firestore";
import { UserContext } from "../../lib/context";
import { auth, firestore } from "../../lib/firebase";
import AuthCheck from "../../components/AuthCheck";
import { serverTimestamp } from "firebase/firestore";

export default function AdminPostsPage(props) {
  return (
    <main>
      <AuthCheck>
        <PostList />
        <CreateNewPost />
      </AuthCheck>
    </main>
  );
}

function PostList() {
  const ref = firestore.collection("users").doc(auth.currentUser.uid).collection("posts");
  const query = ref.orderBy("createdAt");
  // @ts-ignore
  const [querySnapshot] = useCollection(query);

  const posts = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <div className="mx-32 mt-8 space-y-4">
      <h1 className="text-4xl font-bold">Manage your posts</h1>
    </div>
  );
}

function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState("");

  // Ensure slug is URL safe
  const slug = encodeURI(kebabCase(title));

  // Validate length
  const isValid = title.length > 3 && title.length < 100;

  // Create new post in Firestore
  const createPost = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const ref = firestore.collection("users").doc(uid).collection("posts").doc(slug);

    // Tip: give all fields a default value here
    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: `# Hello world!`,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    };

    await ref.set(data);

    toast.success("Post created!");

    // Imperative navigation after doc is set
    router.push(`/admin/${slug}`);
  };

  return (
    <form className="mx-32 mt-8 space-y-4" onSubmit={createPost}>
      <input
        className="rounded-md p-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New article"
      />
      <p>
        <strong>Slug:</strong> {slug}
      </p>
      <button
        className="md rounded bg-green-500 px-4 py-2 font-bold text-white disabled:bg-green-600"
        type="submit"
        disabled={!isValid}>
        Create new post
      </button>
    </form>
  );
}
