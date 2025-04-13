import { connectDB } from "@/util/database";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const db = (await connectDB).db("ghostwriter").collection("journal");
  const token = await getToken({ req });
  const email = token?.email;

  const { date, id, type } = req.query;

  let journalDetail = null;

  try {
    if (type !== undefined && id && ObjectId.isValid(id)) {
      journalDetail = await db.findOne({
        date: date,
        _id: new ObjectId(id),
      });
    } else {
      journalDetail = await db.findOne({
        date: date,
        email: email,
      });
    }

    if (journalDetail) {
      res.status(200).json(journalDetail);
    } else {
      res.status(404).json({ message: "Journal not found" });
    }
  } catch (error) {
    console.error("DB error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
