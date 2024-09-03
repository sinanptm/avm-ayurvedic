"use client";
import { usePathname } from "next/navigation";

const Footer = () => {
   const path = usePathname();

   if (path.includes("signup") || path.includes("signin") || path.includes("admin") || path.includes("doctor")) {
      return null;
   }
   return (
      <footer>
         <div className="text-xs text-center text-slate-400 mt-14">© {new Date().getFullYear()} AVM Ayurvedic.</div>
      </footer>
   );
};

export default Footer;
