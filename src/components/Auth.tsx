import { useState, FormEvent } from "react";
import { useAuthSession } from "../context/AuthSessionProvider";
import { Navigate } from "react-router-dom";
import { supabase } from "../utils/supabase-client";

export const Auth = () => {
  const { session } = useAuthSession();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      alert("Check your email for magic link");
    } catch (error) {
      alert("something is wrong!");
    } finally {
      setIsLoading(false);
      setEmail("")
    }
  }

  if (session) {
    return <Navigate to="/" />;
  }
  return (
    <section >
      <div>
        <h1 className="text-4xl font-bold my-6"> My Notion App</h1>
        <p>Sign in via Magic Link in your email</p>

        {isLoading ? (
          "Sending Magic Link ..."
        ) : (
          <form onSubmit={handleSubmit} className="bg-neutral-50 flex flex-col border-2 border-black rounded-xl p-4 my-4 w-1/2">
            <label htmlFor="email" className="mb-2">Enter your email: </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="rounded-md pl-3 py-1 border outline-none border-slate-600"
            />

            <button className="bg-blue-500 hover:bg-blue-400 rounded-full w-fit px-4 py-2 text-white mt-4 ">Send magic link</button>
          </form>
        )}
      </div>
    </section>
  );
};
