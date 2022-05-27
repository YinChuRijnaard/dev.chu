import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { firestore, fromMillis, postToJSON } from "../lib/firebase";
import toast from "react-hot-toast";
import PostFeed from "../components/PostFeed";
import Loader from "../components/Loader";

// Max post to query per page
const LIMIT = 1;

export async function getServerSideProps(context) {
  const postsQuery = firestore
    .collectionGroup("posts")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(LIMIT);
  // collectionGroup: Grab any subcollection, no matter where it's nested in the tree of documents in Firestore and has a name of 'Posts'

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return { props: { posts } }; // Will be passed to the page component as props
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor = typeof last.createdAt === "number" ? fromMillis(last.createdAt) : last.createdAt;

    const query = firestore
      .collectionGroup("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .startAfter(cursor)
      .limit(LIMIT);

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <main>
      <PostFeed posts={posts} admin={undefined} />

      {!loading && !postsEnd && <button onClick={getMorePosts}>Load more</button>}

      <Loader show={loading} />

      {postsEnd && "You have reached the end"}
    </main>
  );
}
