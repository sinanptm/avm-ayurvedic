import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import StoreProvider from "./StoreProvider";
import NavBar from "@/components/NavBar";

const inter = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "700", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "AVM Ayurveda's",
  description:
    "Appointment booking and video call consultation, an ayurveda hospital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={cn(
          "min-h-[1000px] bg-dark-300 font-sans antialiased",
          inter.variable
        )}
      >
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            // enableSystem
            // disableTransitionOnChange
          >
            <NavBar />
            {children}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
