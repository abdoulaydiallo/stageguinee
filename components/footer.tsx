import Image from "next/image";
import { PiFacebookLogo, PiInstagramLogo, PiYoutubeLogo } from "react-icons/pi";

const Footer = () => {
  return (
    <div className="w-full min-h-[50vh] container  mx-auto py-8  bg-[#0d1871] ">
      <Image
        alt="Logo Icon"
        src="/images/logo-icon.svg"
        width={75}
        height={75}
        className="mb-8"
      />
      <div className="flex flex-col sm:flex-row gap-16">
        <div className="">
          <div className="font-semibold text-white">Société</div>
          <div className="text-gray-300">A propos</div>
          <div className="text-gray-300">Press</div>
          <div className="text-gray-300">Carrières</div>
        </div>
        <div className="">
          <div className="font-semibold text-white">Soutien</div>
          <div className="text-gray-300">FAQs</div>
          <div className="text-gray-300">Contactez-nous</div>
        </div>
        <div className="">
          <div className="font-semibold text-white">Travails</div>
          <div className="text-gray-300">Emplois de Niveau Débutant</div>
          <div className="text-gray-300">Stages</div>
        </div>
        <div className="ml-auto">
          <div className="font-semibold text-white mb-4">Suivez-nous</div>
          <div className="flex space-x-4">
            <div className="w-8 h-8 text-[#0d1871] rounded-full bg-white flex items-center justify-center ">
              <PiFacebookLogo size={20} />
            </div>
            <div className="w-8 h-8 text-[#0d1871] rounded-full bg-white flex items-center justify-center ">
              <PiInstagramLogo size={20} />
            </div>
            <div className="w-8 h-8 text-[#0d1871] rounded-full bg-white flex items-center justify-center ">
              <PiYoutubeLogo size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
