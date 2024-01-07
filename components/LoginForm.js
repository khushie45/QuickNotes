"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNotes } from "@/context/NotesContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { fetchNotes } = useNotes();
  const handleCredentialSignIn = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("dashboard");
      await fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignIn = async(e) => {
    e.preventDefault();
    signIn("google");
    router.replace("dashboard");
    await fetchNotes();
  };

  return (
    <div className="grid place-items-center h-[90vh]">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="font-bold my-4">Enter the details</h1>
        <form className="flex flex-col gap-3">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            autoComplete="email"
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />

          <button
            className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2"
            onClick={handleCredentialSignIn}
          >
            Login
          </button>

          <small className="text-center">Or</small>
          <button
            className=" flex items-center justify-center gap-2 px-6 py-2 cursor-pointer bg-gray-100"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle size={22} />
            Sign In with Google
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/register"}>
            Don't have an account? <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
