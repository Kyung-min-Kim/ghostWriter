import "./register.css";
import "../globals.css";
import Image from "next/image";
import Link from "next/link";
import Video from "next-video";

export default function Register() {
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
      <div className="register_box">
        <h4 className="title">CREATE ACCOUNT</h4>
        <form method="POST" action="/api/auth/signup" className="form_box">
          <label className="label_name" htmlFor="name">
            Ghostname
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="input_name"
            required
          />
          <label className="label_email" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="text"
            className="input_email"
            required
          />
          <label className="label_password" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="input_password"
            required
          />
          <label className="label_confirm_password" htmlFor="confirm_password">
            Confirm password
          </label>
          <input
            id="confirm_password"
            name="confirm_password"
            type="password"
            className="input_confirm_password"
            required
          />
          <button className="btn_submit" type="submit">
            JOIN
          </button>
        </form>
      </div>
    </div>
  );
}
