import { extendTheme } from "@chakra-ui/react";

export const customTheme = extendTheme({
  direction: "rtl",
  colors: {
    amir: {
      mainBg: "#252422",
      secondaryBg: "#403D39",
      primary: "#FFB703",
      secondary: "#D9D9D9",
      secondaryVariant: "#A3A3A3",
      common: "#FFFFFF",
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "8px",
      },
    },
  },
});
