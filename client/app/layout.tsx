import type { Metadata } from "next";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";
import { AuthProvider } from "@/lib/providers/auth-provider";
import QueryProvider from "@/lib/providers/query-provider";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from "@/components/ui/toaster";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import "../styles/globals.css";
import "../styles/chart.css";

const inter = Plus_Jakarta_Sans({
   subsets: ["latin"],
   weight: ["300", "400", "700", "700"],
   variable: "--font-sans",
});

export default function RootLayout({
   children,
   chatbot
}: Readonly<{
   children: React.ReactNode;
   chatbot: React.ReactNode;
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
                     {chatbot}
                     <Analytics debug={false} />
                     <Footer />
                  </AuthProvider>
               </ThemeProvider>
            </QueryProvider>
         </body>
      </html>
   );
}

export const metadata: Metadata = {
   title: {
      template: "%s | AVM Ayurvedic",
      default: "AVM Ayurvedic - Holistic Ayurveda Health Care",
   },
   description: "Experience natural healing with AVM Ayurvedic Hospital. Book appointments, video call consultations, and explore the benefits of authentic Ayurvedic treatments.",
   keywords: [
      "AVM Ayurvedic",
      "Ayurveda hospital",
      "Ayurvedic treatments",
      "natural healing",
      "Ayurveda appointments",
      "Ayurveda video consultations",
      "herbal medicine",
      "holistic healthcare",
      "Ayurvedic ai assistant",
      "Ayurveda", 
      "Holistic Health", 
      "Natural Healing", 
      "Ayurvedic Center", 
      "Ayurvedic Doctors", 
      "Herbal Medicine", 
      "Online Consultation", 
      "Video Consultation", 
      "Wellness", 
      "Natural Remedies", 
      "Ayurvedic Treatments", 
      "Health Tips",
      "Ayurvedic assistant",
      "Real time chat"
   ],
   openGraph: {
      title: "AVM Ayurvedic - Holistic Ayurveda Health Care",
      description: "Join us for holistic Ayurveda treatments and consultations, bringing you closer to natural wellness and healing.",
      type: "website",
      // url: "https://www.avmayurvedic.com",
   },
   robots: {
      index: true,
      follow: true,
   },
};
