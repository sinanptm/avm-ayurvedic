import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../styles/globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/lib/providers/query-provider";
import { AuthProvider } from "@/lib/providers/auth-provider";

const inter = Plus_Jakarta_Sans({
   subsets: ["latin"],
   weight: ["300", "400", "700", "700"],
   variable: "--font-sans",
});

export const metadata: Metadata = {
   title: {
      absolute: "",
      template: "%s | AVM Ayurvedic",
      default: "AVM Ayurvedic",
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
                  <AuthProvider>
                     <NavBar />
                     <Toaster />
                     {children}
                     <Footer />
                  </AuthProvider>
               </ThemeProvider>
            </QueryProvider>
         </body>
      </html>
   );
}
