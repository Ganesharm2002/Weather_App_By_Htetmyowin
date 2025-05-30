// app/layout.js
import { CityProvider } from "./context/CityContext";
import "./globals.css";


export const metadata = {
  title: "Weather App",
  description: "Weather forecast with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CityProvider>{children}</CityProvider>
      </body>
    </html>
  );
}

