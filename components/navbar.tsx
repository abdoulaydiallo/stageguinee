"use client";

import Image from "next/image";
import Link from "next/link";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import MainNav from "./main-nav";
import { useState } from "react";
import MobileNav from "./mobile-nav";
import Logo from "./logo";
import { User } from "@clerk/nextjs/server";

interface NavBarProps {
  user?: User;
  userId: string;
}

const Navbar: React.FC<NavBarProps> = ({ user, userId }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="sticky top-0 w-full h-16 shadow-md bg-white z-30">
      <div className="flex items-center h-full w-full container mx-auto">
        {/** LOGO */}
        <Logo />

        {/** Desktop Menu */}
        <MainNav userId={userId} />

        {/** Mobile Menu */}

        <div onClick={handleNav} className="md:hidden cursor-pointer pl-24">
          <AiOutlineMenu size={25} />
        </div>

        <div
          className={
            menuOpen
              ? "fixed left-0 top-0 right-0 w-screen bg-white transition-all ease-in duration-500 shadow-md"
              : "fixed top-[-100%] w-screen ease-out duration-500"
          }
        >
          <div className="flex items-center p-4">
            <Logo />

            <div
              onClick={() => setMenuOpen(!menuOpen)}
              className="cursor-pointer ml-auto"
            >
              <AiOutlineClose size={25} />
            </div>
          </div>

          <MobileNav userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
