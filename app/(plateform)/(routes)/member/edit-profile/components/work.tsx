import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Collapsible } from "@/components/ui/collapsible";
import { Experience } from "@prisma/client";
import { BiSolidBusiness, BiSolidPencil } from "react-icons/bi";
import CreateWorkModal from "@/components/modals/createWork";

interface WorkBoxProps {
  userId: string;
  experience: Experience;
}

const WorkBox: React.FC<WorkBoxProps> = ({ userId, experience }) => {
  return (
    <Collapsible>
      <div className="bg-white shadow-lg">
        <div className="w-full flex items-center py-4 px-8">
          <BiSolidBusiness size={25} className="text-[#0d1871]" />
          <div className="ml-4 text-xs mr-auto uppercase font-bold text-[#0d1871]">
            Antécedents de travail
          </div>

          <Dialog>
            <DialogTrigger>
              <BiSolidPencil
                size={18}
                className="cursor-pointer ml-auto hover:text-blue-700"
              />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Exprience de travail</DialogTitle>
              </DialogHeader>
              <CreateWorkModal userId={userId} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="text-sm font-light py-4 px-8">
          Ajoutez une expérience professionnelle à votre profil !
        </div>
        <Dialog>
          <DialogTrigger className="w-full border-t cursor-pointer py-3 text-center">
            Commencer
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Exprience de travail</DialogTitle>
            </DialogHeader>
            <CreateWorkModal userId={userId} />
          </DialogContent>
        </Dialog>
      </div>
    </Collapsible>
  );
};

export default WorkBox;
