import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { connectToDatabase } from "../../../src/util/db";
import bcrypt from "bcrypt";

export default NextAuth({
  // Configure one or more authentication providers
  secret: process.env.SECRET_COOKIE_PASSWORD,
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username TEST", type: "text" },
        password: { label: "Password TEST", type: "password" },
      },
      async authorize(credentials, req) {
        if (credentials.username === "admin") {
          console.log(credentials.password);
          console.log(process.env.ADMIN_PASSWORD_HASH);
          const match = await bcrypt.compare(
            credentials.password,
            process.env.ADMIN_PASSWORD_HASH
          );
          if (match) return { name: "admin" };
        } else {
          console.log(credentials);
          let db = await connectToDatabase();
          let doc = db.collection("users");
          let user = await doc.findOne({ username: credentials.username });
          console.log(user);
        }

        return false;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
