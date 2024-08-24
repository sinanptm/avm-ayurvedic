'use client'
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Footer = () => {
   const path = usePathname();

   if (
      path.includes("signup") ||
      path.includes("signin") ||
      path.includes("staff")
   ) {
      return null;
   }
   return (
      <footer className="from-green-900 to-gray-900  ">
         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center" prefetch={false}>
               <Image
                  src="/assets/icons/logo-full.svg"
                  height={40}
                  width={40}
                  className="h-8 w-auto"
                  alt="AVM Ayurvedic"
               />
            </Link>
            <div className="text-sm text-muted-foreground">
               © {new Date().getFullYear()} AVM Ayurvedic. All rights reserved.
            </div>
         </div>
      </footer>
   );
};

export default Footer;
