// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import bcrypt from "bcrypt";
import { hashPassword } from "../../src/util/encrypt";

export default async (req, res) => {
  const result = await hashPassword("password");
  console.log(result);
  res.status(200).json({ hash: result });
};
