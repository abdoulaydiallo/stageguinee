"use client";

import Avatar from "@/components/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUser } from "@clerk/nextjs";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ImLocation } from "react-icons/im";
import { MdModeEdit } from "react-icons/md";

const ClientPage = () => {
  const { user } = useUser();

  return (
    <div>
      <div
        className="w-full"
        style={{
          backgroundImage: `url("/images/header_background_2018.png")`,
          backgroundSize: "cover",
        }}
      >
        <div className="container mx-auto py-8 ">
          <div className="w-full flex flex-col items-center justify-center gap-4 sm:flex-row-reverse  sm:justify-between sm:px-36">
            <div className="flex flex-col items-center justify-center mt-8 mb-4">
              <Avatar height={150} width={150} />
              <Button className="bg-white hover:bg-white uppercase text-[#3c71f5] my-4">
                Demographique et plus
              </Button>
            </div>
            <div className="relative">
              <MdModeEdit
                size={20}
                className="text-gray-200 cursor-pointer absolute top-0 right-0"
              />
              <div className="text-2xl  font-bold py-4">
                <div className=" flex gap-2">
                  <div className="text-white">{user?.firstName}</div>
                  <div className="text-[#5cb7e5]">{user?.lastName}</div>
                </div>
                <div className="w-full sm:w-8 mt-2 border-b-2 border-white"></div>
              </div>
              <div className="uppercase text-white font-bold py-2">
                A propos de moi
              </div>
              <div className="sm:text-center text-gray-200 font-light">
                Modifiez cette section pour parler un peu de vous aux employeurs
                !
              </div>
              <div className="uppercase text-white font-bold py-2">
                Localisation
              </div>
              <div className="flex items-center text-white gap-2">
                <ImLocation size={15} className="" />
                <div>Ajouter votre ville</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[40vh]"></div>
    </div>
  );
};
export default ClientPage;
