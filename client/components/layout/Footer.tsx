"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/hooks/useAuth";

const Footer = () => {
   const path = usePathname();
   const { setChatBotOpen } = useAuth();

   if (
      path.includes("signup") ||
      path.includes("signin") ||
      path.includes("admin") ||
      path.includes("doctor") ||
      path.includes("chats") ||
      path.includes("video-section") ||
      path.includes("/new-appointment")
   ) {
      return null;
   }

   return (
      <footer className="bg-dark-400 text-gray-300 py-8 mt-14">
         <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
               <div className="mb-4">
                  <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
                     <Image
                        width={23}
                        height={23}
                        src={'/assets/icons/logo-icon.svg'}
                        alt="AVM"
                        className="h-6 w-6"
                     />
                     <span>AVM Ayurvedic</span>
                  </Link>
                  <p className="text-sm">Holistic Ayurveda Health Care for your well-being.</p>
               </div>
               <div>
                  <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                     <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                     <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                     <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                     <li><Link href="/chats" className="hover:text-white transition-colors">Contact</Link></li>
                  </ul>
               </div>
               <div>
                  <h3 className="text-lg font-semibold mb-4">Services</h3>
                  <ul className="space-y-2">
                     <li>
                        <Link href="/new-appointment" className="hover:text-white transition-colors">
                           Book Appointment
                        </Link>
                     </li>
                     <li>
                        <Link href="/new-appointment" className="hover:text-white transition-colors" >
                           Video Consultation
                        </Link>
                     </li>
                     <li onClick={() => setChatBotOpen(true)}>
                        <Link href="#" className="hover:text-white transition-colors">
                           Ayurvedic Assistant
                        </Link>
                     </li>
                     <li>
                        <Link href="/chat" className="hover:text-white transition-colors">
                           Custom Service
                        </Link>
                     </li>
                  </ul>
               </div>
               <div>
                  <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
                  <div className="flex space-x-4">
                     <a href="https://www.linkedin.com/in/muhammed-sinan-1950b3290/" className="hover:text-white transition-colors">
                        <Image
                           src={'/assets/icons/social/linkedin.svg'}
                           alt="linkedin"
                           height={23}
                           width={23}
                           className=""
                        />
                     </a>
                     <a href="https://github.com/sinanptm/" className="hover:text-white transition-colors">
                        <Image
                           src={'/assets/icons/social/github.svg'}
                           alt="Github"
                           height={23}
                           width={23}
                           className=""
                        />
                     </a>
                     <a href="https://wa.me/8089507749" className="hover:text-white transition-colors">
                        <Image
                           src={'/assets/icons/social/whatsapp.svg'}
                           alt="WhatsApp"
                           height={23}
                           width={23}
                           className=""
                        />
                     </a>
                     <a href="https://www.instagram.com/si_an_z/" className="hover:text-white transition-colors">
                        <Image
                           src={'/assets/icons/social/instagram.svg'}
                           alt="instagram"
                           height={23}
                           width={23}
                           className=""
                        />
                     </a>
                  </div>
               </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-6 text-center">
               <p className="text-sm">© {new Date().getFullYear()} AVM Ayurvedic. All rights reserved.</p>
            </div>
         </div>
      </footer>
   );
};

export default Footer;