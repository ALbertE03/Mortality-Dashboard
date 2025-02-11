import { DarkModeProvider } from "./components/DarkModeProvider"; // ✅ Corrected Import Path
import "../styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <title>Salud Joven Cuba</title>
      </head>
      <body>
        <DarkModeProvider>
          {children}
        </DarkModeProvider>
      </body>
    </html>
  );
}

