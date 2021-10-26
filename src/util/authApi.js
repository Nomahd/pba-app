import { getSession } from "next-auth/client";

export const authApi = async (req, res, next) => {
  const session = await getSession({ req });
  if (session) {
    next();
  } else {
    res.status(401).end();
  }
};
