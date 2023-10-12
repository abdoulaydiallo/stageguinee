"use client";

import { User } from "@prisma/client";
import { StudyBox } from "./study";
import { SocialBox } from "./social";
import { BannerBox } from "./banner";
import WorkBox from "./work";
import SkillBox from "./skill";
import { WorkCard } from "./cards/workCard";

interface ClientPageProps {
  user?: User | any;
}

const ClientPage: React.FC<ClientPageProps> = ({ user }) => {
  return (
    <div>
      <BannerBox user={user} />
      <div className="md:min-h-[70vh]  bg-gray-50">
        <div className="md:relative container m-auto ">
          <div className=" flex flex-col md:flex-row justify-center md:justify-between w-full gap-4">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <StudyBox education={user?.education} userId={user?.id} />
              {user.experiences ? (
                <WorkCard experience={user?.experiences} userId={user?.id} />
              ) : (
                <WorkBox experience={user?.experiences} userId={user?.id} />
              )}
              <SkillBox competence={user?.skills} userId={user?.id} />
            </div>
            <div className="w-full md:w-64 flex flex-col ">
              <SocialBox title="Ajouter Github" />
              <SocialBox title="Ajouter Instagram" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClientPage;
