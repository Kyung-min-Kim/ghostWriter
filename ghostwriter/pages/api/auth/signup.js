import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const db = (await connectDB).db("ghostwriter");
  let email = await db.collection("member").findOne({ email: req.body.email });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (req.method === "POST") {
    if (
      req.body.name === "" ||
      req.body.email === "" ||
      req.body.password === ""
    ) {
      res.write(
        "<script>alert('Hostname, Email address, and password are required')</script>"
      );
      res.write("<script>window.location='../../../register'</script>");
      return res.end(); // 응답 종료
    } else {
      if (!emailRegex.test(req.body.email)) {
        res.write("<script>alert('Invalid email address format')</script>");
        res.write("<script>window.location='../../../register'</script>");
        return res.end(); // 응답 종료
      } else if (email != null) {
        res.write(
          "<script>alert('Your email address is already taken')</script>"
        );
        res.write("<script>window.location='../../../register'</script>");
        return res.end(); // 응답 종료
      } else if (req.body.password !== req.body.confirm_password) {
        res.write(
          "<script>alert('Please check your confirm password')</script>"
        );
        res.write("<script>window.location='../../../register'</script>");
        return res.end(); // 응답 종료
      } else {
        delete req.body.confirm_password;
        let hash = await bcrypt.hash(req.body.password, 10);
        req.body.password = hash;
        let db = (await connectDB).db("ghostwriter");
        await db.collection("member").insertOne(req.body);
        return res.redirect(302, "/"); // 바로 리다이렉트
      }
    }
  }
}
