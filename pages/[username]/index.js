import { getUserWithUsername, postToJSON } from "../../lib/firebase";
import UserProfile from "../../components/UserProfile";
import PostFeed from "../../components/PostFeed";

export async function getServerSideProps({ query }) {
  const { username } = query;

  const userDoc = await await getUserWithUsername(username);

  // If no user, short circuit to 404 page
  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  // JSON serializable data
  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = userDoc.ref
      .collection("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .limit(5);

    posts = await (await postsQuery.get()).docs.map(postToJSON);
  }

  return {
    props: { user, posts }, // Will be passed to the page component as props
  };
}

export default function UserProfilePage({ user, posts }) {
  return (
    <main>
      <UserProfile user={user} />
      <PostFeed posts={posts} admin={undefined} /> {/* ??? */}
    </main>
  );
}
