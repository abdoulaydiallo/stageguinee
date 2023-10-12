"use client";

import { format } from "date-fns";
import fr from "date-fns/locale/fr";
import { Experience, User } from "@prisma/client";

import { BiCalendar, BiSolidPencil } from "react-icons/bi";
import { BsFillMortarboardFill } from "react-icons/bs";
import { FaPlusCircle } from "react-icons/fa";
import { PiCaretDownLight } from "react-icons/pi";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateWorkModal from "@/components/modals/createWork";
import UpdateWorkModal from "@/components/modals/updateWork";

interface WorkCardProps {
  userId: string;
  experience: Experience[];
}

export const WorkCard: React.FC<WorkCardProps> = ({ experience, userId }) => {
  const work = experience[experience.length - 1];
  return (
    <Collapsible>
      <div className="bg-white shadow-lg">
        <div className="w-full flex items-center border-b py-4 px-8">
          <BsFillMortarboardFill size={25} className="text-[#0d1871]" />
          <span className="text-xs ml-4 mr-auto uppercase font-bold text-[#0d1871]">
            experience
          </span>
          <Dialog>
            <DialogTrigger>
              <FaPlusCircle
                size={20}
                className="ml-auto text-[#0d1871] cursor-pointer"
              />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>experience</DialogTitle>
              </DialogHeader>
              <CreateWorkModal userId={userId} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="relative py-4 px-8">
          <div className="text-sm font-semibold text-neutral-800">
            {work?.organization}
          </div>
          <div className="text-xs flex items-center">
            <BiCalendar className="mr-2" />
            <span>
              {`${format(work?.startDate, "MMMM yyyy", {
                locale: fr,
              })} - 
        ${
          work?.endDate &&
          format(work?.endDate, "MMMM yyyy", {
            locale: fr,
          })
        }`}
            </span>
          </div>
          <div className="absolute right-8 top-4 flex gap-2 text-neutral-500/70">
            <Dialog>
              <DialogTrigger>
                <BiSolidPencil size={18} className="hover:text-blue-700" />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>EDIT experience</DialogHeader>
                <UpdateWorkModal experience={experience[0]} userId={userId} />
              </DialogContent>
            </Dialog>
            <CollapsibleTrigger>
              <PiCaretDownLight size={18} className="hover:text-blue-700" />
            </CollapsibleTrigger>
          </div>
        </div>
      </div>
      <CollapsibleContent className="py-4 px-8 bg-gray-50 text-[12px] shadow-md">
        <div>
          <div className=" text-[12px] tracking-whide uppercase font-semibold">
            Poste
          </div>
          <div>{work?.title}</div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
