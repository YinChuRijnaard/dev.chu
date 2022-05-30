import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore, getUserWithUsername, postToJSON } from "../../lib/firebase";
import PostContent from "../../components/PostContent";

import HeartButton from "../../components/HeartButton";
import AuthCheck from "../../components/AuthCheck";
import Link from "next/link";

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post = null;
  let path;

  if (userDoc) {
    const postRef = userDoc.ref.collection("posts").doc(slug);
    post = postToJSON(await postRef.get());

    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
}

export async function getStaticPaths() {
  // Improve my using Admin SDK to select empty docs
  const snapshot = await firestore.collectionGroup("posts").get();

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return { params: { username, slug } };
  });

  return {
    paths,
    fallback: "blocking",
    // Must be in this format:
    // paths: [
    //  { params: { username, slug }}
    // ],
  };
}

export default function Post(props) {
  const postRef = firestore.doc(props.path);
  // @ts-ignore
  const [realtimePost] = useDocumentData(postRef);

  const post = realtimePost || props.post;

  return (
    <main className="mx-32 mt-8 flex justify-between space-x-8">
      <section className="w-3/4 rounded-md border-2 border-black p-4">
        <PostContent post={post} />
      </section>

      <aside className="flex w-1/4 items-center justify-center rounded-md border-2 border-black p-4">
        <p>{post.heartCount || 0} ❤️</p>

        <AuthCheck
          fallback={
            <Link href="/enter">
              <button>💗 Sign Up</button>
            </Link>
          }>
          <HeartButton postRef={postRef} />
        </AuthCheck>
      </aside>
    </main>
  );
}
