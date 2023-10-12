import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Collapsible } from "@/components/ui/collapsible";
import { Skill } from "@prisma/client";
import { BiSolidBusiness, BiSolidPencil } from "react-icons/bi";
import CreateSkillModal from "@/components/modals/createSkill";

interface SkillBoxProps {
  userId: string;
  competence: Skill[];
}

const SkillBox: React.FC<SkillBoxProps> = ({ userId, competence }) => {
  return (
    <Collapsible>
      <div className="bg-white shadow-lg">
        <div className="w-full flex items-center py-4 px-8">
          <BiSolidBusiness size={25} className="text-[#0d1871]" />
          <div className="text-xs ml-4 mr-auto uppercase font-bold text-[#0d1871]">
            Compétences
          </div>

          <Dialog>
            <DialogTrigger>
              <BiSolidPencil
                size={18}
                className="cursor-pointer ml-auto text-neutral-500/70 hover:text-blue-700"
              />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Domaine de compétences</DialogTitle>
              </DialogHeader>
              <CreateSkillModal userId={userId} />
            </DialogContent>
          </Dialog>
        </div>
        {competence ? (
          <div className="flex gap-4 px-8 py-4">
            {competence.map((item) => (
              <div
                key={item.id}
                className="text-xs py-2 px-4 bg-gray-100 rounded-full"
              >
                {item.skillName}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm font-light py-4 px-8">
            Ajoutez vos compétences ici !
          </div>
        )}
      </div>
    </Collapsible>
  );
};

export default SkillBox;
