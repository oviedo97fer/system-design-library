import { createTheme, Theme } from "@mui/material/styles";

declare module "@mui/material/styles/createPalette" {
  interface SimplePaletteColorOptions {
    white?: string;
    main: string;
    secondary?: string;
  }
  interface TypeBackground {
    dark?: string;
    light?: string;
    gray?: string;
  }
  interface PaletteOptions {
    disabled?: object;
    buttons?: object;
    orange?: object;
    purple?: object;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0d6efd",
      light: "rgba(3,79,199,0.27)",
      white: "#FFF",
    },
    secondary: {
      main: "#00D58D",
      light: "rgba(57,227,255,1)",
    },
    disabled: {
      main: "#B1B2B2",
      secondary: "#D1D2D2",
    },
    text: {
      primary: "#373737",
      disabled: "#a7a7a7",
      secondary: "#a7a7a7",
    },
    warning: {
      main: "#E0AC00",
      secondary: "#F5BC00",
    },
    error: {
      main: "#FF4C5A",
      light: "#FF4B4B",
    },
    background: {
      default: "#ffffff",
      dark: "#034FC7",
      light: "#F7F7F7",
      gray: "#DDDDDE",
    },
    buttons: {
      main: "#F0F2F5",
      darker: "#79899B",
    },
    orange: {
      main: "#F59A5E",
    },
    success: {
      main: "#00D58D",
    },
    purple: {
      main: "#CC6087",
    },
  },
});
