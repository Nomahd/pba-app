// import "../styles/globals.css";

import { Provider, useSession } from "next-auth/client";
import { useEffect } from "react";
import { theme } from "../src/theme";
import {
  Box,
  CircularProgress,
  CssBaseline,
  MuiThemeProvider,
} from "@material-ui/core";
import { Header } from "../src/components/Header";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  // useEffect(() => {
  //   // Remove the server-side injected CSS.
  //   const jssStyles = document.querySelector("#jss-server-side");
  //   if (jssStyles) {
  //     jssStyles.parentElement.removeChild(jssStyles);
  //   }
  // }, []);
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Provider session={pageProps.session}>
        {Component.auth ? (
          <Auth>
            <Header />
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </Provider>
    </MuiThemeProvider>
  );
}

const Auth = ({ children }) => {
  const [session, loading] = useSession();
  const router = useRouter();
  const isUser = !!session?.user;
  useEffect(() => {
    if (loading) return; // Do nothing while loading
    if (!isUser) router.replace("/login"); // If not authenticated, force log in
  }, [isUser, loading]);

  if (isUser) {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress />
    </Box>
  );
};
