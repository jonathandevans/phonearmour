import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import "./globals.css";

// Font Awesome Config
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

// Fonts
const font = Mulish({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PhoneArmour",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={font.className}>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
};
export default RootLayout;
