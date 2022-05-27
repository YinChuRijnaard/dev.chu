import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore, getUserWithUsername, postToJSON } from "../../lib/firebase";
import PostContent from "../../components/PostContent";

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
    <main>
      <section>
        <PostContent post={post} />
      </section>

      <aside>
        <p>{post.heartCount || 0} heart emoji</p>
      </aside>
    </main>
  );
}
