"use client";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { AdminSideBarLinks } from "@/constants";
import { TooltipProvider } from "@/components/ui/tooltip";

const SideBar = () => {
  return (
    <Sidebar>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <TooltipProvider>
            <Link href="#" className="flex items-center justify-center py-2">
              <Image
                src={"/assets/icons/logo-icon.svg"}
                alt="Logo"
                width={40}
                height={40}
              />
            </Link>
          </TooltipProvider>
          <div className="mt-8 flex flex-col gap-2">
            {AdminSideBarLinks.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
        <div>
          <SidebarLink
            link={{
              label: "Admin",
              href: "#",
              icon: (
                <Image
                  src="/assets/images/admin.png"
                  className="h-7 w-7 rounded-full"
                  width={28}
                  height={28}
                  alt="Avatar"
                />
              ),
            }}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  );
};

export default SideBar;