"use client";

import Link from "next/link";
import {
  PiCaretDownLight,
  PiCaretRightLight,
  PiCaretUpLight,
} from "react-icons/pi";

import { useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Avatar from "./avatar";
import { User } from "@prisma/client";

interface MobileNavProps {
  userId: string;
  user?: User | any;
}

const MobileNav: React.FC<MobileNavProps> = ({ userId, user }) => {
  const { signOut } = useClerk();

  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenuOpen1, setSubMenuOpen1] = useState(false);
  const [subMenuOpen2, setSubMenuOpen2] = useState(false);

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSubNav1 = () => {
    setSubMenuOpen1(!subMenuOpen1);
  };

  const handleSubNav2 = () => {
    setSubMenuOpen2(!subMenuOpen2);
  };

  return (
    <div>
      {userId ? (
        /** User is Signin */
        <ul className="mb-4">
          <li className="mx-4 py-2 flex items-center justify-between border-b border-black">
            <div className="text-md font-semibold">{user?.fullName}</div>
            <Avatar src={user?.profile?.profilePicture} />
          </li>
          <li className="px-4 py-2 text-sm">Emplois & Stages</li>
          <li className="px-4 py-2 text-sm cursor-pointer">
            <Link href="/member/edit-profile">Profile</Link>
          </li>
          <li className="px-4 py-2 text-sm">Conseils de carrière</li>
          <li className="mx-4 py-2 text-sm border-b border-black">Messages</li>
          <li className="px-4 py-2 text-sm">FAQ</li>
          <li className="px-4 py-2 text-sm">Contactez Nous</li>
          <li
            className="px-4 py-2 text-sm cursor-pointer"
            onClick={() => signOut()}
          >
            Déconnexion
          </li>
        </ul>
      ) : (
        <ul className="flex flex-col">
          <li
            className={`text-md border-b p-4 ${
              subMenuOpen1 ? "bg-[#E6ECF8]" : "bg-white"
            }`}
            onClick={handleSubNav1}
          >
            <div
              className={`flex items-center justify-between ${
                subMenuOpen1 ? "pb-4 border-b-2 border-b-white" : "border-none"
              }`}
            >
              <span>Candidats</span>
              {subMenuOpen1 ? (
                <PiCaretUpLight size={20} />
              ) : (
                <PiCaretDownLight size={20} />
              )}
            </div>

            <ul
              className={
                subMenuOpen1
                  ? "flex flex-col transition ease-in duration-500"
                  : "hidden ease-in duration-500"
              }
            >
              <Link href="/">
                <li
                  className="pb-2 text-sm mt-4"
                  onClick={() => setMenuOpen(false)}
                >
                  Career Advice
                </li>
              </Link>
            </ul>
          </li>

          <li
            className={`text-md border-b p-4 ${
              subMenuOpen2 ? "bg-[#E6ECF8]" : "bg-white"
            }`}
            onClick={handleSubNav2}
          >
            <div
              className={`flex items-center justify-between ${
                subMenuOpen2 ? "pb-4 border-b-2 border-b-white" : "border-none"
              }`}
            >
              <span>Employeurs</span>
              {subMenuOpen2 ? (
                <PiCaretUpLight size={20} />
              ) : (
                <PiCaretDownLight size={20} />
              )}
            </div>

            <ul
              className={
                subMenuOpen2
                  ? "flex flex-col transition ease-in duration-500"
                  : "hidden ease-in duration-500"
              }
            >
              <Link href="/">
                <li
                  className="pb-2 text-sm mt-4"
                  onClick={() => setMenuOpen(false)}
                >
                  Employeur Success Stories
                </li>
              </Link>
            </ul>
          </li>

          <Link href="/sign-in">
            <li className="text-md border-b p-4 flex items-center">
              <span>se connecter</span>
              <PiCaretRightLight />
            </li>
          </Link>
          <Link href="/sign-up">
            <li className="p-4">
              <Button
                className="w-full rounded-full text-md border-[#3c71f5] p-4 text-[#3c71f5]"
                variant="outline"
              >
                S&apos;inscrire
              </Button>
            </li>
          </Link>
        </ul>
      )}
    </div>
  );
};
export default MobileNav;
