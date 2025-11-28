import { extendTheme } from "@chakra-ui/react";

export const customTheme = extendTheme({
  direction: "rtl",
  colors: {
    amir: {
      mainBg: "#d5dadf",
      secondaryBg: "#e7eaefff",
      primary: "#A6B0C3",
      secondary: "#6E7685",
      secondaryVariant: "#777b82",
      common: "#1A1A1A",
      accent: "#3FBD6E",
    },
  },
  components: {
    HStack: { defaultProps: { spacing: 0, margin: 0 } },
    VStack: { defaultProps: { spacing: 0, margin: 0 } },
    Stack: { defaultProps: { spacing: 0, margin: 0 } },
    Button: {
      baseStyle: {
        borderRadius: "8px",
      },
    },
  },
});
