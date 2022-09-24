import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  components: {
    Button: {
      sizes: {
        sm: {
          fontSize: "md",
        },
      },
      variants: {
        base: {
          bg: "#295D09",
          fontSize: "sm",
          color:"white",
        },
        sm: {
          bg: "#69AB3D",
          fontSize: "sm",
          color:"white",
        },
        md: {
          bg: "#56a323",
          fontSize: "sm",
          color:"white",
        },
      },
    },
  },
});
