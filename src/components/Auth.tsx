import { useState, FormEvent } from "react";
import { useAuthSession } from "../context/AuthSessionProvider";
import { Navigate } from "react-router-dom";
import { supabase } from "../utils/supabase-client";

// To do refactor to use email pass sign up
export const Auth = () => {
  const { session } = useAuthSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (session) {
    return <Navigate to="/" />;
  }

  // We've create a dummy user in DB directly to test sign in 
  // TO do - create sign up form


  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log(data, "what is data");
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error, "eror in catch");
    } finally {
      setIsLoading(false);
      setEmail("");
      setPassword("");
    }
  }

  return (
    <section>
      <div>
        <h1 className="text-4xl font-bold my-6"> My Notion App</h1>
        <p>Sign in with your email & password</p>

        {isLoading && <p> Checking authentication ...</p>}
        <form
          onSubmit={handleSubmit}
          className="bg-neutral-50 flex flex-col border-2 border-black rounded-xl p-4 my-4 w-1/2"
        >
          <label htmlFor="email" className="mb-2">
            Enter your email:{" "}
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="rounded-md pl-3 py-1 border outline-none border-slate-600"
          />
          <label htmlFor="password" className="mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            className="rounded-md pl-3 py-1 border outline-none border-slate-600"
          />

          <button className="bg-blue-500 hover:bg-blue-400 rounded-full w-fit px-4 py-2 text-white mt-4">
            Sign In
          </button>
        </form>

      </div>
    </section>
  );
};
