export const SignupForm = () => {
  return (
    <form className="flex flex-col gap-2 items-center w-[500px]">
      <input
        id="email"
        type="email"
        placeholder="email"
        className="border rounded-md p-2 w-full"
      />
      <input
        id="name"
        type="text"
        placeholder="name"
        className="border rounded-md p-2 w-full"
      />
      <input
        id="password"
        type="password"
        placeholder="password"
        className="border rounded-md p-2 w-full"
      />
      <input
        id="confirm"
        type="password"
        placeholder="password confirm"
        className="border rounded-md p-2 w-full"
      />
    </form>
  );
};
