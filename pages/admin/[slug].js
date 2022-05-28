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
      <main className="items center mx-32 mt-8 flex justify-between">
        {post && (
          <>
            <section className="w-3/4 space-y-4">
              <h1 className="text-4xl font-bold">{post.title}</h1>
              <p>ID: {post.slug}</p>

              <PostForm postRef={postRef} defaultValues={post} preview={preview} />
            </section>

            <aside className="flex flex-col items-center space-y-4">
              <h3 className="font-bold">Tools</h3>
              <button
                className="flex items-center rounded-md border-2 border-neutral-500 py-2 px-4 font-bold hover:border-neutral-900"
                onClick={() => setPreview(!preview)}>
                {preview ? "Edit" : "Preview"}
              </button>
              <Link href={`/${post.username}/${post.slug}`}>
                <button className="flex items-center rounded-md border-2 border-neutral-500 py-2 px-4 font-bold hover:border-neutral-900">
                  Live view
                </button>
              </Link>
            </aside>
          </>
        )}
      </main>
    </>
  );
}

function PostForm({ defaultValues, postRef, preview }) {
  const { register, handleSubmit, reset, watch, formState } = useForm({ defaultValues, mode: "onChange" });

  const { isValid, isDirty, errors } = formState; // Error fixed with: https://github.com/react-hook-form/react-hook-form/discussions/4708

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
    <form className="" onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <div>
          <ReactMarkdown>{watch("content")}</ReactMarkdown>
        </div>
      )}

      {/* className={preview ? styles.hidden : styles.controls} */}
      <div className={preview ? styles.hidden : styles.controls}>
        <textarea
          className="mt-4"
          name="content"
          {...register("content", {
            maxLength: { value: 20000, message: "content is too long" },
            minLength: { value: 10, message: "content is too short" },
            required: { value: true, message: "Content is required" },
          })}></textarea>

        {errors.content && <p className="font-bold text-red-500">{errors.content.message}</p>}

        <fieldset className="mt-4">
          <input className="mr-2" name="published" type="checkbox" {...register("published")} />{" "}
          {/* Error fixed with: https://stackoverflow.com/questions/66927051/getting-uncaught-typeerror-path-split-is-not-a-function-in-react */}
          <label>Published</label>
        </fieldset>

        <button
          className="md mt-4 mb-16 rounded bg-green-500 px-4 py-2 font-bold text-white disabled:bg-green-600"
          type="submit">
          disabled={!isDirty || !isValid}
          Save changes
        </button>
      </div>
    </form>
  );
}
