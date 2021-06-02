import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username TEST", type: "text", placeholder: "TEST" },
        password: { label: "Password TEST", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(credentials);
        const user = (credentials, req) => {
          // You need to provide your own logic here that takes the credentials
          // submitted and returns either a object representing a user or value
          // that is false/null if the credentials are invalid.
          // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
          // You can also use the request object to obtain additional parameters
          // (i.e., the request IP address)
          return null;
        };
        return null;
        // if (user) {
        //   // Any user object returned here will be saved in the JSON Web Token
        //   return user;
        // } else {
        //   return null;
        // }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
