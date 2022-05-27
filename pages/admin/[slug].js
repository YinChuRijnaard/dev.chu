import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
// @ts-ignore
import styles from "../../styles/Admin.module.css";
import { auth, firestore, serverTimestamp } from "../../lib/firebase";
import AuthCheck from "../../components/AuthCheck";

export default function AdminPostEdit(props) {
  return (
    <AuthCheck>
      <PostManager />
      <h1>Is this working?</h1>
    </AuthCheck>
  );
}

function PostManager() {
  const [preview, setPreview] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  // @ts-ignore
  const postRef = firestore.collection("users").doc(auth.currentUser.uid).collection("posts").doc(slug);
  // @ts-ignore
  const [post] = useDocumentData(postRef);

  return (
    <>
      <main className="bg-red-500">
        {post && (
          <>
            <section>
              <h1>{post.title}</h1>
              <p>ID: {post.slug}</p>

              <PostForm postRef={postRef} defaultValues={post} preview={preview} />
            </section>

            <aside>
              <h3>Tools</h3>
              <button className="" onClick={() => setPreview(!preview)}>
                {preview ? "Edit" : "Preview"}
              </button>
              <Link href={`/${post.username}/${post.slug}`}>
                <button className="">Live view</button>
              </Link>
            </aside>
          </>
        )}
      </main>
    </>
  );
}

function PostForm({ defaultValues, postRef, preview }) {
  const { register, handleSubmit, reset, watch } = useForm({ defaultValues, mode: "onChange" });

  const updatePost = async ({ content, published }) => {
    await postRef.update({
      content,
      published,
      updatedAt: serverTimestamp(),
    });

    reset({ content, published });

    toast.success("Post updated successfully");
  };

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <div>
          <ReactMarkdown>{watch("content")}</ReactMarkdown>
        </div>
      )}

      {/* className={preview ? styles.hidden : styles.controls} */}
      <div className={preview ? styles.hidden : styles.controls}>
        <textarea
          name="content"
          // @ts-ignore
          ref={register}></textarea>

        <fieldset>
          <input
            name="published"
            type="checkbox"
            // @ts-ignore
            ref={register}
          />
          <label>Published</label>
        </fieldset>

        <button className="" type="submit">
          Save changes
        </button>
      </div>
    </form>
  );
}
