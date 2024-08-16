import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/utils/theme-provider";
import StoreProvider from "./StoreProvider";

const inter = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "700", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "AVM Care",
  description: "Appointment booking and video call consultation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
     <html lang="en">
      <body suppressHydrationWarning={true} className={cn('min-h-screen bg-dark-300 font-sans antialiased', inter.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
    </StoreProvider>
  );
}
