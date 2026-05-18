import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#efdfd3",
        contrastText: "#09090a",
      },
      secondary: {
        main: "#d2b68f",
        contrastText: "#0f0e10",
      },
      background: {
        default: "#09090a",
        paper: "#101012",
      },
      text: {
        primary: "#f5efe8",
        secondary: "#c6bdb5",
      },
    },
    typography: {
      fontFamily: "Inter, system-ui, sans-serif",
      button: {
        textTransform: "uppercase",
        letterSpacing: "0.24em",
        fontWeight: 600,
      },
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 650,
      },
      h3: {
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 20,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: "#09090a",
            color: "#f5efe8",
            minHeight: "100vh",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(18, 18, 20, 0.92)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 32px 120px rgba(0, 0, 0, 0.18)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            padding: "14px 26px",
          },
          containedPrimary: {
            backgroundColor: "#efdfd3",
            color: "#09090a",
            boxShadow: "0 18px 35px rgba(239, 223, 211, 0.16)",
            "&:hover": {
              backgroundColor: "#f8eae0",
            },
          },
          outlined: {
            borderColor: "rgba(255, 255, 255, 0.18)",
            color: "#f5efe8",
            "&:hover": {
              borderColor: "rgba(210, 182, 143, 0.3)",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
            },
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: "standard",
          InputLabelProps: {
            shrink: true,
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: "rgba(245, 239, 232, 0.7)",
            fontSize: "0.72rem",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          underline: {
            "&:before": {
              borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
            },
            "&:hover:not(.Mui-disabled):before": {
              borderBottom: "1px solid rgba(210, 182, 143, 0.45)",
            },
            "&:after": {
              borderBottom: "1px solid #d2b68f",
            },
          },
          input: {
            color: "#f5efe8",
            paddingTop: "14px",
            paddingBottom: "10px",
          },
        },
      },
    },
  }),
);

export default theme;
