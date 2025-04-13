import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const db = (await connectDB).db("ghostwriter").collection("journal");
  //const token = await getToken({ req: req });
  //const email = token.email;
  const journalList = await db.find({ shareBtn: "on" }).toArray();
  console.log(journalList);
  if (journalList != null) {
    res.status(200).json(journalList);
  } else {
    res.status(405).end(); // GET 이외의 메소드는 허용하지 않음
  }
}
