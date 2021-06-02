// import "../styles/globals.css";

import { Provider } from "next-auth/client";
import { useEffect } from "react";
import { theme } from "../src/theme";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </MuiThemeProvider>
  );
}
