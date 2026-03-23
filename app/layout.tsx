import "./globals.css";
import { Poppins } from "next/font/google";
import NavigationWrapper from "./components/navigationWrapper";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300","400","500","600","700"],
});

export const metadata = {
  title: "KauX AI",
  description: "Ask whatever you want",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>

        <NavigationWrapper />

        {children}

      </body>
    </html>
  );
}