
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import "leaflet/dist/leaflet.css";
import Providers from "./auth-providers/AuthProviders";

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ],
});

export const metadata = {
  title: "SDN 1 Sabahbalau",
  description: "School Website",
};

export default function RootLayout({ children }) {
  return (

    <Providers>
      <html lang="en">
        <head>
          <title>SDN 1 SabahBalau</title>
        </head>
        <body className={poppins.variable}>
          <header>
            <Navbar />
          </header>
          <main>{children}</main>
        </body>
      </html>
    </Providers>
  );
}
