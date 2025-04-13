"use client";
import { signOut } from "next-auth/react";
import "./layout.css";
import "./globals.css";

export default function LoginBtn() {
  return (
    <button
      className="button"
      onClick={() => {
        signOut({ callbackUrl: "/" });
      }}
    >
      LogOut
    </button>
  );
}
