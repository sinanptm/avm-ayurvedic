import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../styles/globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import { StoreProvider } from "./StoreProvider";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const inter = Plus_Jakarta_Sans({
   subsets: ["latin"],
   weight: ["300", "400", "700", "700"],
   variable: "--font-sans",
});

export const metadata: Metadata = {
   title: {
      absolute: "",
      template: "AVM | %s",
      default: "AVM Ayurveda's",
   },
   description:
      "Appointment booking and video call consultation, an ayurveda hospital",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en" suppressHydrationWarning>
         <body
            className={cn(
               "min-h-[600px] bg-dark-300 font-sans antialiased",
               inter.variable,
            )}
         >
            <StoreProvider>
               <ThemeProvider attribute="class" defaultTheme="dark">
                  <NavBar />
                  {children}
                  <Footer />
               </ThemeProvider>
            </StoreProvider>
         </body>
      </html>
   );
}
