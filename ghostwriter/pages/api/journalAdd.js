import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const db = (await connectDB).db("ghostwriter").collection("journal");
  const body = req.body;
  const token = await getToken({ req: req });
  body.name = token.name;
  body.email = token.email;
  if ((req.method = "POST")) {
    res.redirect(302, "/myJournal");
    body.candy = parseInt(body.candy) || 0;
    await db.insertOne(body);
  } else {
    res.writeHead(405);
  }
}
