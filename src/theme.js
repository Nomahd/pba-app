import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  props: {},
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          height: "100%",
          width: "100%",
        },
        body: {
          height: "100%",
          width: "100%",
        },
        "#__next": {
          height: "100%",
          width: "100%",
        },
      },
    },
  },
});
