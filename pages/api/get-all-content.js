import nextConnect from "next-connect";
import { connectToDatabase } from "../../src/util/db";
import { authApi } from "../../src/util/authApi";

const handler = nextConnect();

handler.use(authApi).get(async (req, res) => {
  let db = await connectToDatabase();
  let doc = db.collection("content");
  try {
    let response = await doc.find().toArray();
    res.status(200).json({ response: response });
  } catch {
    res.status(500);
  }
});

export default handler;
