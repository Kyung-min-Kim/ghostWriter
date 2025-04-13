// pages/api/addCandy.js
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { id } = req.body;
    console.log("id" + id);
    if (!id) return res.status(400).json({ message: "ID required" });

    const token = await getToken({ req });
    const db = (await connectDB).db("ghostwriter").collection("journal");
    const db2 = (await connectDB).db("ghostwriter").collection("candyStore");
    const objectId = new ObjectId(id);

    const alreadyGave = await db2.findOne({
      journal: id,
      giver: token.email,
    });

    if (alreadyGave) {
      return res
        .status(409)
        .json({ message: "You have already given candy to this Journal!" });
    }

    const result = await db.findOneAndUpdate(
      { _id: objectId },
      { $inc: { candy: 1 } }
    );

    if (result.value) {
      await db2.insertOne({
        journal: id,
        email: token.email,
        candy: result.value.candy + 1,
        givenAt: new Date(), // optional: 타임스탬프 저장
      });
      res.redirect(302, "/trickOrTreat");
      //res.status(200).json({ candy: result.value.candy });
    } else {
      res.status(404).json({ message: "Journal not found" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
