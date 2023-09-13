import Link from "next/link";
import { Button } from "./ui/button";
import { PiCaretDownLight, PiCaretRightLight } from "react-icons/pi";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useClerk, useUser } from "@clerk/nextjs";
import Avatar from "./avatar";
import { usePathname } from "next/navigation";

interface MainNavProps {
  userId?: string;
}

const MainNav: React.FC<MainNavProps> = ({ userId }) => {
  const pathname = usePathname();
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const routes = [
    {
      label: "Emplois et Stages",
      href: "/member/jobs-listing",
      active: pathname == "/member/jobs-listing",
    },
    {
      label: "Events",
      href: "/member/events",
      active: pathname == "/member/events",
    },
    {
      label: "Messages",
      href: "/member/messages",
      active: pathname == "/member/messages",
    },
  ];

  return (
    <div className="w-full flex items-center justify-between">
      {userId && isSignedIn ? (
        <div className="mx-16 flex items-center gap-12">
          {routes.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-light ${
                item.active ? "text-[#3c70f5]" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : (
        <div className="hidden sm:flex items-center">
          <Popover>
            <PopoverTrigger>
              <div className="ml-10 cursor-pointer text-md font-light flex items-center">
                <span>Etudiants</span>
                <PiCaretDownLight />
              </div>
            </PopoverTrigger>
            <PopoverContent className="mt-4 w-screen">
              <div className="mx-12 grid grid-cols-4 gap-8">
                <div>
                  <div className="text-lg font-bold text-[#0d1871]">
                    Inscrivez-toi maintenant pour trouver ton métier de rêve.
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span>Trouver un travail</span>
                    <PiCaretRightLight />
                  </div>
                </div>
                <div>
                  <div className="uppercase text-sm font-bold text-[#0d1871]">
                    Pour les canditats
                  </div>
                  <div className="text-sm pt-4 font-light">
                    Orientation professionnels
                  </div>
                  <div className="text-sm pt-4 font-light">Goulo Community</div>
                  <div className="text-sm pt-4 font-light">
                    Explorez les entreprises
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger>
              <div className="ml-10 cursor-pointer text-md font-light flex items-center">
                <span>Employeurs</span>
                <PiCaretDownLight />
              </div>
            </PopoverTrigger>
            <PopoverContent className="mt-4 w-screen">
              <div className="mx-12 grid grid-cols-4 gap-8">
                <div>
                  <div className="text-lg font-bold text-[#0d1871]">
                    Recrutement virtuel. Candidats qualifiés et diversifiés
                    garantis.
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span>Commencez maintenant</span>
                    <PiCaretRightLight />
                  </div>
                </div>
                <div>
                  <div className="uppercase text-sm font-bold text-[#0d1871]">
                    Pour les employeurs
                  </div>
                  <div className="text-sm pt-4 font-light">
                    Plans tarifaires
                  </div>
                  <div className="text-sm pt-4 font-light">
                    Temoignages de employeurs
                  </div>
                </div>
                <div>
                  <div className="uppercase text-sm font-bold text-[#0d1871]">
                    Ressources
                  </div>
                  <div className="text-sm pt-4 font-light">Content library</div>
                  <div className="text-sm pt-4 font-light">Press</div>
                  <div className="text-sm pt-4 font-light">Blog</div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}

      <div className="hidden sm:flex ml-auto">
        {userId && isSignedIn ? (
          <Popover>
            <PopoverTrigger>
              <div className="flex items-center gap-4">
                <div className="text-md font-light">
                  Salut, {user?.firstName}
                </div>
                <Avatar />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-58">
              <ul className="flex flex-col gap-2">
                <li className="text-sm">Votre profile est 100% complète</li>
                <li className="text-sm border-t border-black">Profile</li>
                <li className="text-sm">Inviations</li>
                <li className="text-sm  ">Messages</li>
                <li className="text-sm border-b border-black">Paramètres</li>
                <li className="text-sm">FAQ</li>
                <li className="text-sm">Contactez Nous</li>
                <li
                  className="text-sm cursor-pointer"
                  onClick={() => signOut()}
                >
                  Déconnexion
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        ) : (
          <ul className="hidden sm:flex sm:items-center">
            <Link href="/sign-in">
              <li className="ml-10 text-md font-light">Se connecter</li>
            </Link>
            <Link href="/sign-up">
              <li className="ml-10 text-md font-light">
                <Button className="text-md bg-[#0d1871]">
                  S&apos;inscrire
                </Button>
              </li>
            </Link>
          </ul>
        )}
      </div>
    </div>
  );
};

export default MainNav;
