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
        if (credentials.username === process.env.ADMIN_USERNAME) {
          const match = await bcrypt.compare(
            credentials.password,
            process.env.ADMIN_PASSWORD_HASH
          );
          if (match) {
            console.log("admin log in");
            return { name: process.env.ADMIN_USERNAME };
          }
        } else {
          let db = await connectToDatabase();
          let doc = db.collection("users");
          let user = await doc.findOne({ username: credentials.username });
          if (user) {
            console.log("user log in")
            return {name: user}
          }
        }
        console.log("login fail");
        return false;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
