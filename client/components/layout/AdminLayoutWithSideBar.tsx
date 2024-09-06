"use client";

import { ReactNode, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Package2, PanelLeft, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuTrigger,
   DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { NavLinkType } from "@/types";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useLogoutAdmin } from "@/lib/hooks/admin/useAdminAuth";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { toast } from "../ui/use-toast";
import { useAuth } from "@/lib/hooks/useAuth";

const AdminLayoutWithSideBar = ({
   children,
   sideBarLinks,
}: {
   children: ReactNode[] | ReactNode;
   sideBarLinks: NavLinkType[];
}) => {
   const pathname = usePathname();
   const [open,setOpen] = useState<boolean>(false)
   const { mutate: logout } = useLogoutAdmin();
   const { setCredentials } = useAuth();
   const handleLogout = () => {
      logout(null, {
         onSuccess: () => {
            toast({
               title: "Logout Successfully👋",
               variant: "success",
            });
            setCredentials("adminToken", "");
         },
         onError: (error) => {
            toast({
               title: "Logout Failed ❌",
               description: error.response?.data.message || "An Unknown Error Occurred",
               variant: "destructive",
            });
         },
      });
   };

   return (
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
         <TooltipProvider delayDuration={0}>
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
               <nav className="flex flex-1 flex-col items-center gap-4 px-2 py-5">
                  <Link
                     href="/admin"
                     className="group flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
                     <Package2 className="h-6 w-6 transition-all group-hover:scale-110" />
                     <span className="sr-only">AVM</span>
                  </Link>
                  {sideBarLinks.map((item) => (
                     <Tooltip key={item.href}>
                        <TooltipTrigger asChild>
                           <Link
                              href={item.href}
                              className={cn(
                                 "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                                 pathname === item.href && "bg-accent text-accent-foreground"
                              )}>
                              <Image
                                 src={item.icon!}
                                 width={21}
                                 height={21}
                                 alt={item.label}
                                 className="h-6 w-6 transition-all group-hover:scale-125"
                              />
                              <span className="sr-only">{item.label}</span>
                           </Link>
                        </TooltipTrigger>
                        <TooltipContent
                           side="right"
                           className=" bg-green-700 bg-opacity-55 border-white cursor-pointer hover:border-green-600 transition-colors duration-200">
                           {item.label}
                        </TooltipContent>
                     </Tooltip>
                  ))}
               </nav>
               <div className="mt-auto flex flex-col items-center gap-4 px-2 py-5">
                  <DropdownMenu>
                     <Tooltip>
                        <TooltipTrigger asChild>
                           <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                                 <Image
                                    src="/assets/images/admin.png"
                                    alt="settings"
                                    width={21}
                                    height={21}
                                    className="h-5 w-5"
                                 />
                              </Button>
                           </DropdownMenuTrigger>
                        </TooltipTrigger>
                        <TooltipContent side="right" className=" bg-green-700 bg-opacity-55 border-white cursor-pointer">Settings</TooltipContent>
                     </Tooltip>
                     <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                           <button className="flex items-center w-full text-left" onClick={handleLogout}>
                              <Image
                                 src={"/assets/icons/logout.svg"}
                                 className="mr-2 h-4 w-4"
                                 alt="Logout"
                                 width={23}
                                 height={23}
                              />
                              <span>Logout</span>
                           </button>
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               </div>
            </aside>
         </TooltipProvider>
         <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
               <Sheet open={open} onOpenChange={setOpen}>
                  <SheetTrigger asChild>
                     <Button size="icon" variant="outline" className="sm:hidden">
                        <PanelLeft className="h-5 w-5" onClick={()=>setOpen(!open)} />
                        <span className="sr-only">Toggle Menu</span>
                     </Button>
                  </SheetTrigger>
                  <SheetTitle>
                     <VisuallyHidden>Navigation Menu</VisuallyHidden>
                  </SheetTitle>
                  <SheetContent side="left" className="w-64 p-0" aria-label="Navigation menu">
                     <nav className="grid gap-6 p-6 text-lg font-medium">
                        <Link
                           href="/"
                           className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
                           <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                           <span className="sr-only">AVM Ayurvedic</span>
                        </Link>
                        {sideBarLinks.map((item) => (
                           <Link
                              key={item.href}
                              href={item.href}
                              onClick={()=>setOpen(false)}
                              className={cn(
                                 "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
                                 pathname === item.href && "text-foreground"
                              )}>
                              <Image
                                 src={item.icon!}
                                 width={21}
                                 height={21}
                                 alt={item.label}
                                 className="h-5 w-5 transition-all group-hover:scale-125"
                              />
                              {item.label}
                           </Link>
                        ))}
                     </nav>
                  </SheetContent>
               </Sheet>
               <div className="flex flex-1 items-center gap-4 admin-nav:hidden">
                  <form className="ml-auto flex-1 sm:flex-initial">
                     <div className="relative">
                        <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search..." className="pl-8 h-8 text-sm sm:w-[300px]" />
                     </div>
                  </form>
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                           <Image
                              src="/assets/images/admin.png"
                              width={30}
                              height={30}
                              className="rounded-full"
                              alt="Avatar"
                           />
                           <span className="sr-only">Toggle user menu</span>
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent align="end" className="cursor-pointer">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               </div>
            </header>
            {children}
         </div>
      </div>
   );
};

export default AdminLayoutWithSideBar;
