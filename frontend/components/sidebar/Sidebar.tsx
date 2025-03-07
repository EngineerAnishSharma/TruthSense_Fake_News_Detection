"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink, Links as LinksType } from "../ui/sidebar";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowLeft, Badge, Settings, User2 } from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import { User } from "./_components/User";
import { ThemeToggle } from "./_components/ThemeToggle";
import { ModeToggle } from "./_components/ModeToggle";
import { Links } from "./data";

export function MySidebar({ children }: { children: React.ReactNode }) {
  const { user } = useClerk();
  const [open, setOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen bg-themeforeground">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody  className="justify-between gap-10 bg-themebackground">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {(Links as LinksType[]).map((link, idx) => (
                <SidebarLink 
                  key={idx} 
                  link={link} 
                  onClick={() => link.id && scrollToSection(link.id)}
                />
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-2">
            <ThemeToggle />
            <ModeToggle />
            <User />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="http://localhost:3000/home"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        SimPPL Dashboard
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="http://localhost:3000/home"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};
