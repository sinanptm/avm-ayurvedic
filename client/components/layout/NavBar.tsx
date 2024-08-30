"use client";
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package2 } from "lucide-react";
import {
   DropdownMenu,
   DropdownMenuTrigger,
   DropdownMenuContent,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { NavLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
export const NavBar = () => {
   const path = usePathname();
   const { patientToken } = useAuth();

   if (path.includes("signup") || path.includes("staff") || path.includes("signin")) {
      return null;
   }
   const handleLogout = () => {
      console.log("patient logout successfull");
   };

   return (
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-dark-300 bg-opacity-55 px-4 md:px-6 z-50">
         <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base" prefetch={false}>
               <Package2 className="h-6 w-6" />
               <span className="sr-only">Acme Inc</span>
            </Link>
            {NavLinks.map((link) => (
               <Link
                  href={link.href}
                  key={link.label + link.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  prefetch={false}>
                  {link.label}
               </Link>
            ))}
         </nav>
         <Sheet>
            <SheetTrigger asChild>
               <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                  <Image src={"/assets/icons/menu.svg"} alt="Menu" width={30} height={30} className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
               </Button>
            </SheetTrigger>
            <SheetContent side="left">
               <SheetTitle>
                  <span className="sr-only">Navigation Menu</span>
               </SheetTitle>
               <nav className="grid gap-6 text-lg font-medium">
                  <Link href="/client" className="flex items-center gap-2 text-lg font-semibold" prefetch={false}>
                     <Image
                        src={"/assets/icons/logo-icon.svg"}
                        width={33}
                        height={33}
                        alt="Logo"
                        className="h-11 w-11"
                     />
                     <span className="sr-only">Acme Inc</span>
                  </Link>
                  {NavLinks.map((link) => (
                     <Link
                        href={link.href}
                        key={link.label + link.href}
                        className="text-muted-foreground hover:text-foreground"
                        prefetch={false}>
                        {link.label}
                     </Link>
                  ))}
               </nav>
            </SheetContent>
         </Sheet>
         <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form className="ml-auto flex-1 sm:flex-initial">
               <div className="relative">
                  <Image
                     src={"/assets/icons/search.svg"}
                     alt="svg"
                     width={27}
                     height={27}
                     className="absolute left-2.5 top-2.5 mt-0.5 h-4 w-4 text-muted-foreground"
                  />
                  <Input
                     type="search"
                     placeholder="Search products..."
                     className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                  />
               </div>
            </form>
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                     <Image
                        src="/assets/icons/circle-user.svg"
                        width={30}
                        height={30}
                        className="rounded-full"
                        alt="Avatar"
                     />
                     <span className="sr-only">Toggle user menu</span>
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end" className="mt-3">
                  {patientToken ? (
                     <>
                        <DropdownMenuLabel>
                           <Link href={"/profile"}>My Account</Link>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                           <Link href={"#"}>Logout</Link>
                        </DropdownMenuItem>
                     </>
                  ) : (
                     <>
                        <DropdownMenuItem>
                           <Link href={"/signin"}>SingIn</Link>
                        </DropdownMenuItem>
                     </>
                  )}
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
      </header>
   );
};

export default NavBar;
