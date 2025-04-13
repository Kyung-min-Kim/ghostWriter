"use client";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthBtn() {
  return (
    <div>
      <button className="btn_auth" onClick={() => signIn("google")}>
        Sign in with Google
      </button>
      <button className="btn_auth" onClick={() => signIn("github")}>
        Sign in with Github
      </button>
    </div>
  );
}
