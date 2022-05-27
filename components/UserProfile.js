export default function UserProfile({ user }) {
  return (
    <div className="mx-32 mt-8 flex flex-col items-center space-y-4">
      <img className="h-36 w-36 rounded-full" src={user.photoURL} />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1 className="text-4xl font-bold">{user.displayName}</h1>
    </div>
  );
}
