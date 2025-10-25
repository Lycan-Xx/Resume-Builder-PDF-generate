import { Font } from "@react-pdf/renderer";

// Register Roboto Mono font using local files (more reliable than CDN)
Font.register({
  family: "Roboto Mono",
  fonts: [
    {
      src: "/fonts/roboto-mono-400.woff",
      fontWeight: 400,
    },
    {
      src: "/fonts/roboto-mono-500.woff",
      fontWeight: 500,
    },
    {
      src: "/fonts/roboto-mono-700.woff",
      fontWeight: 700,
    },
  ],
});

// Register fallback fonts locally
Font.register({
  family: "Arial",
  src: "/fonts/arimo-400.woff",
});

Font.register({
  family: "Helvetica",
  src: "/fonts/arimo-400.woff",
});

Font.register({
  family: "Helvetica-Bold",
  src: "/fonts/arimo-700.woff",
  fontWeight: "bold",
});
