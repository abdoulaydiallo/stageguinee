"use client";
import { AiOutlineGithub } from "react-icons/ai";

interface SocialBoxProps {
  title: String;
}

export const SocialBox: React.FC<SocialBoxProps> = ({ title }) => {
  return (
    <div className="w-[165px] bg-white flex flex-col items-center justify-center py-8 px-6 shadow-lg border-b text-[#0d1871] hover:text-white hover:bg-[#0d1871] transition ease-in-out delay-150">
      <AiOutlineGithub size={45} />
      <span className="text-xs font-light mt-2">{title}</span>
    </div>
  );
};
