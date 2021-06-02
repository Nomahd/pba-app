import nextConnect from "next-connect";
import { connectToDatabase } from "../../src/util/db";

const handler = nextConnect();

handler.get(async (req, res) => {
  let db = await connectToDatabase();
  let doc = db.collection("users");
  let name = await doc.findOne({ username: "kevin" });
  console.log(name);
  res.status(200).json({ message: name });
});

export default handler;
