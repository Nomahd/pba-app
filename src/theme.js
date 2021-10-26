import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    button: {
      fontWeight: "bold",
    },
  },
  props: {},
  palette: {},
  overrides: {
    MuiButton: {
      label: {
        "& > .MuiSvgIcon-root": {
          marginRight: ".5rem",
        },
      },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: "#fff",
        color: "#000",
      },
    },
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
