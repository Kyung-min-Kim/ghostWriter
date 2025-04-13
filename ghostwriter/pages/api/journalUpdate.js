import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const db = (await connectDB).db("ghostwriter").collection("journal");
  const body = req.body;
  const token = await getToken({ req: req });
  body.name = token.name;
  body.email = token.email;
  console.log(body);
  if ((req.method = "POST")) {
    res.redirect(302, "/myJournal");
    //await db.updateOne(body);
    let update = {
      title: req.body.title,
      coverId: req.body.coverId,
      colorPicker: req.body.colorPicker,
      title: req.body.title,
      context: req.body.context,
      bookTitle: req.body.bookTitle,
    };
    await db.updateOne(
      { email: body.email, date: req.body.date },
      { $set: update }
    );
  } else {
    res.writeHead(405);
  }
}
