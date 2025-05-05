import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    breakpoints: {
      sm: "320px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem", 
      md: "1rem", 
      lg: "1.125rem",
      xl: "1.25rem", 
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
      "5xl": "3rem", // 48px
      "6xl": "3.75rem", // 60px
    },
    tokens: {
      colors: {
        colorPaletteFg: "#5D7285",
        red: "#F76659",
        grey: "#5D7285",
        green: "#47D16C",
        lightGray: "#EFF2F4",
      },
    },
    semanticTokens: {
      colors: {
        danger: { value: "{colors.red}" },
        main: { value: "{colors.grey}" },
        success: { value: "{colors.green}" },
      },
    },
    keyframes: {
      spin: {
        from: { transform: "rotate(0deg)" },
        to: { transform: "rotate(360deg)" },
      },
    },
  },
});

export default createSystem(defaultConfig, config);
