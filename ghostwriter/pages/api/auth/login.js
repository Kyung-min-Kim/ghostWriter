import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";
import { signIn } from "next-auth/react";

export default async function handler(req, res) {
  const db = (await connectDB).db("ghostwriter");

  if (req.method === "POST") {
    const { email, password } = req.body;

    if (email === "" || password === "") {
      res.write(
        "<script>alert('Please enter your email address and password')</script>"
      );
      res.write("<script>window.location='../../../signin'</script>");
      return res.end();
    }

    // 사용자 이메일로 검색
    const user = await db.collection("member").findOne({ email });
    if (!user) {
      res.write("<script>alert('Invalid email address')</script>");
      res.write("<script>window.location='../../../signin'</script>");
      return res.end();
    }

    // 비밀번호 확인
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.write("<script>alert('Invalid password')</script>");
      res.write("<script>window.location='../../../signin'</script>");
      return res.end();
    }

    // 인증이 성공하면 메인 페이지로 이동
    //console.log(user);
    res.redirect(302, "/");
    return res.end();
  } else {
    // POST 요청이 아닌 경우 405 Method Not Allowed 응답
    res.writeHead(405);
    return res.end();
  }
}
