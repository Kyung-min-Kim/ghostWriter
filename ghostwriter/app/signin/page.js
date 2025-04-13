"use client";
import "./signin.css";
import "../globals.css";
import Image from "next/image";
import Link from "next/link";
import AuthBtn from "./AuthBtn";
import Video from "next-video";
import React, { useRef } from "react";
import { signIn } from "next-auth/react";

export default function Signin() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // 수정된 부분
  const handleSubmit = async () => {
    console.log(emailRef.current);
    console.log(passwordRef.current);

    const result = await signIn("credentials", {
      email: emailRef.current,
      password: passwordRef.current,
      redirect: true,
      callbackUrl: "/",
    });
  };
  return (
    <div>
      <Link href="/">
        <Image
          src="/images/Ghostwriter.svg"
          alt="logo_image"
          width={250}
          height={250}
          className="logo"
        />
      </Link>
      {/* <div className="video_box">
        <Video
          className="video1"
          src={"/images/ghostWriterVideo.mp4"} // 비디오 파일 경로
          autoPlay
          muted
          loop
          playsInline
          width={700}
          height={700}
          controls={false}
        ></Video>
      </div> */}
      <div className="login_box">
        <h4 className="title">SIGN IN</h4>
        <AuthBtn />
        <form method="POST" action="/api/auth/login" className="form_box_s">
          <input
            id="email"
            name="email"
            type="text"
            required
            placeholder="Email address"
            className="input_email_s"
            ref={emailRef}
            onChange={(e) => {
              emailRef.current = e.target.value;
            }}
          />
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Password"
            className="input_password_s"
            ref={passwordRef}
            onChange={(e) => {
              passwordRef.current = e.target.value;
            }}
          />
          <button className="btn_submit" onClick={handleSubmit}>
            JOIN
          </button>
        </form>
        <div className="signin_box">
          <span>Don't have an account?&nbsp;&nbsp;&nbsp;</span>
          <Link href="/register" className="signin_link">
            SIGN UP
          </Link>
        </div>
      </div>
    </div>
  );
}
