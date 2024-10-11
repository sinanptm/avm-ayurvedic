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

export const metadata: Metadata = {
  metadataBase: new URL('https://avm-ayurvedic.online'),
  title: {
    template: '%s | AVM Ayurvedic',
    default: 'AVM Ayurvedic - Holistic Ayurveda Health Care & Wellness',
  },
  description: 'Experience authentic Ayurvedic treatments at AVM Ayurvedic Hospital. Book online appointments, access video consultations, and embrace holistic healing for a balanced life.',
  openGraph: {
    title: 'AVM Ayurvedic - Holistic Ayurveda Health & Wellness',
    description: 'Discover personalized Ayurvedic care with AVM Ayurvedic. Book consultations and experience the benefits of natural healing.',
    type: 'website',
    url: '/',
    siteName: 'AVM Ayurvedic',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'AVM Ayurvedic - Holistic Ayurveda Health Care',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AVM Ayurvedic - Holistic Health & Wellness',
    description: 'Book Ayurvedic treatments & consultations online. Embrace natural healing and wellness through authentic Ayurveda.',
    images: ['/og-image.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  keywords: [
    'AVM Ayurvedic',
    'Ayurvedic hospital',
    'Ayurvedic treatments',
    'holistic healing',
    'online Ayurveda consultation',
    'natural medicine',
    'herbal remedies',
    'wellness center',
    'Ayurvedic doctors online',
    'Ayurvedic health care',
    'mental wellness',
    'immune support',
    'Ayurvedic lifestyle',
    'natural therapies',
    'online appointments',
    'virtual consultations',
    'herbal medicine',
    'AI Ayurvedic assistant',
    'wellness tips',
    'video consultations',
  ],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
  category: 'health',
}

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
