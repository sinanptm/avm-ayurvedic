import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../styles/globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/lib/query-provider";

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
   description: "Appointment booking and video call consultation, an ayurveda hospital",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en" suppressHydrationWarning>
         <body className={cn("min-h-[600px] bg-dark-300 font-sans antialiased", inter.variable)}>
               <QueryProvider>
                  <ThemeProvider attribute="class" defaultTheme="dark">
                     <NavBar />
                     <Toaster />
                     {children}
                     <Footer />
                  </ThemeProvider>
               </QueryProvider>
         </body>
      </html>
   );
};
